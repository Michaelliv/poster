// Normalize the user's tree before and after Takumi's `fromJsx`.
//
// Two stricter-than-browser checks bite us:
//
//   • `<svg width="100%">` or `<svg height="100%">`. `fromJsx` serializes
//     the SVG element to an HTML string and ALSO writes a numeric
//     `width`/`height` onto the image node. The renderer side feeds the
//     SVG string into resvg, which can't compute a pixmap size from a
//     percentage attribute. Both width and height must be either pixel
//     numbers or absent.
//
//   • Inline `style={{ transform: undefined }}`. A common conditional
//     pattern (`flip ? "scaleX(-1)" : undefined`). React-in-browser
//     drops undefined values; Takumi's CSS parser sees the literal
//     `transform: undefined` and rejects the rule.
//
// We deal with both by walking the React tree once before fromJsx.
// To see every authored `<svg>` and `style` literal (including ones nested
// inside function components like helper components), we *invoke* function
// components when we encounter them — risky in general (hooks/state/side
// effects), but our posters are pure-render components.

import * as React from "react";

export function sanitizeReactTree(root: React.ReactNode): React.ReactNode {
  return visit(root);
}

function visit(node: React.ReactNode): React.ReactNode {
  if (node === null || node === undefined || typeof node === "boolean")
    return node;
  if (typeof node === "string" || typeof node === "number") return node;

  if (Array.isArray(node)) {
    let changed = false;
    const next: React.ReactNode[] = new Array(node.length);
    for (let i = 0; i < node.length; i++) {
      const out = visit(node[i]);
      if (out !== node[i]) changed = true;
      next[i] = out;
    }
    return changed ? next : node;
  }

  if (!React.isValidElement(node)) return node;

  const elem = node as React.ReactElement<Record<string, unknown>>;
  const oldProps = elem.props as Record<string, unknown>;
  let newProps: Record<string, unknown> | null = null;

  // Function component: invoke it so we can walk and rewrite the JSX it
  // returns. Wrap in a try/catch — components that use hooks would throw
  // here, and passing them through unchanged is better than crashing the
  // whole render.
  if (typeof elem.type === "function") {
    try {
      const Fn = elem.type as (
        props: Record<string, unknown>,
      ) => React.ReactNode;
      const produced = Fn(oldProps);
      const visited = visit(produced);
      // Replace this element with a Fragment carrying the visited output.
      // (Wrapping with a Fragment preserves key/ref semantics for arrays.)
      return visited;
    } catch {
      // Hooks or other render-time machinery; fall through and pass
      // the element unchanged to fromJsx.
    }
  }

  // Walk children first
  const oldChildren = childrenOf(oldProps);
  if (oldChildren !== undefined) {
    const newChildren = visit(oldChildren);
    if (newChildren !== oldChildren) {
      newProps = { ...oldProps, children: newChildren };
    }
  }

  // Replace percentage width/height on raw <svg> elements with the intrinsic
  // size from the `viewBox` attribute. The renderer needs concrete pixel
  // dimensions or omitted attributes, but omitting both leaves Takumi without
  // an intrinsic size when the SVG is `position: absolute` (resvg then panics
  // with "pixmap size invalid"). Reading `viewBox="0 0 W H"` gives us those
  // dimensions directly.
  //
  // Takumi serializes raw <svg> elements to an image and renders them through
  // resvg. In this path SVG <text> is unreliable, so lift simple text nodes
  // into absolutely-positioned HTML overlays while keeping the SVG shapes.
  //
  // `React.cloneElement` *merges* its second arg into existing props — you
  // can't remove a key by spreading-then-deleting, so we have to pass
  // explicit replacement values (or `undefined`, which React then drops).
  if (elem.type === "svg") {
    const vb = parseViewBox(oldProps.viewBox);
    const svgChildren = childrenOf(oldProps);

    // If the SVG has <text> nodes AND a parseable viewBox, lift those texts
    // into HTML overlays. resvg renders SVG <text> unreliably, so we keep
    // the SVG for shapes only and stack absolutely-positioned text spans
    // on top, mapped from SVG user-space into percentage offsets.
    if (vb) {
      const textOverlays = collectSvgTextOverlays(svgChildren, vb);
      if (textOverlays.length > 0) {
        const strippedSvg = React.cloneElement(elem, {
          ...(newProps ?? oldProps),
          className: undefined,
          width: vb.width,
          height: vb.height,
          children: stripSvgText(svgChildren),
        });
        return React.createElement(
          "div",
          {
            style: {
              position: "absolute",
              left: "50%",
              top: "50%",
              width: vb.width,
              height: vb.height,
              transform: "translate(-50%, -50%)",
              ...(oldProps.style as object | undefined),
            },
          },
          React.createElement(
            "div",
            { style: { position: "absolute", inset: 0 } },
            strippedSvg,
          ),
          ...textOverlays,
        );
      }
    }

    // No text-lift triggered; just replace percent width/height with the
    // viewBox pixel dims if we have them. resvg can't measure percentages.
    const w = oldProps.width;
    const h = oldProps.height;
    const wPct = typeof w === "string" && w.endsWith("%");
    const hPct = typeof h === "string" && h.endsWith("%");
    if (wPct || hPct) {
      newProps = {
        ...(newProps ?? oldProps),
        width: vb ? vb.width : undefined,
        height: vb ? vb.height : undefined,
      };
    }
  }

  // Strip undefined/null values from inline `style` objects.
  const style = oldProps.style;
  if (style && typeof style === "object" && !Array.isArray(style)) {
    const styleObj = style as Record<string, unknown>;
    let dirty = false;
    let cleaned: Record<string, unknown> | null = null;
    for (const k in styleObj) {
      if (styleObj[k] === undefined || styleObj[k] === null) {
        if (!cleaned) cleaned = { ...styleObj };
        delete cleaned[k];
        dirty = true;
      }
    }
    if (dirty && cleaned) {
      newProps = { ...(newProps ?? oldProps), style: cleaned };
    }
  }

  if (newProps === null) return node;
  return React.cloneElement(elem, newProps);
}

function collectSvgTextOverlays(
  children: React.ReactNode,
  viewBox: { width: number; height: number },
): React.ReactElement[] {
  const overlays: React.ReactElement[] = [];
  collectSvgText(children, viewBox, overlays);
  return overlays;
}

function collectSvgText(
  node: React.ReactNode,
  viewBox: { width: number; height: number },
  overlays: React.ReactElement[],
): void {
  if (node === null || node === undefined || typeof node === "boolean") return;
  if (typeof node === "string" || typeof node === "number") return;
  if (Array.isArray(node)) {
    for (const child of node) collectSvgText(child, viewBox, overlays);
    return;
  }
  if (!React.isValidElement(node)) return;

  const elem = node as React.ReactElement<Record<string, unknown>>;
  const props = elem.props as Record<string, unknown>;
  if (elem.type === "text") {
    const text = textContent(childrenOf(props));
    const x = Number(props.x);
    const y = Number(props.y);
    if (!text || !Number.isFinite(x) || !Number.isFinite(y)) return;

    const anchor = props.textAnchor;
    const transform =
      anchor === "middle"
        ? "translate(-50%, -50%)"
        : anchor === "end"
          ? "translate(-100%, -50%)"
          : "translate(0, -50%)";

    const style: Record<string, unknown> = {
      position: "absolute",
      left: `${(x / viewBox.width) * 100}%`,
      top: `${(y / viewBox.height) * 100}%`,
      transform,
      color: props.fill ?? "currentColor",
      textAlign:
        anchor === "middle" ? "center" : anchor === "end" ? "right" : "left",
      whiteSpace: "pre",
      lineHeight: 1,
      pointerEvents: "none",
    };
    if (props.fontSize !== undefined) style.fontSize = props.fontSize;
    if (props.fontWeight !== undefined) style.fontWeight = props.fontWeight;
    if (props.fontFamily !== undefined) style.fontFamily = props.fontFamily;
    if (props.fontStyle !== undefined) style.fontStyle = props.fontStyle;

    overlays.push(
      React.createElement(
        "div",
        {
          key: `svg-text-${overlays.length}`,
          style,
        },
        text,
      ),
    );
    return;
  }

  collectSvgText(childrenOf(props), viewBox, overlays);
}

function stripSvgText(node: React.ReactNode): React.ReactNode {
  if (node === null || node === undefined || typeof node === "boolean")
    return node;
  if (typeof node === "string" || typeof node === "number") return node;
  if (Array.isArray(node))
    return node.map(stripSvgText).filter((child) => child !== null);
  if (!React.isValidElement(node)) return node;

  const elem = node as React.ReactElement<Record<string, unknown>>;
  if (elem.type === "text") return null;
  const props = elem.props as Record<string, unknown>;
  const children = childrenOf(props);
  if (children === undefined) return node;
  return React.cloneElement(elem, {
    ...props,
    children: stripSvgText(children),
  });
}

/**
 * `props` is typed `Record<string, unknown>` because we don't know its shape;
 * narrow `children` back to `ReactNode | undefined` at the boundary so call
 * sites stay readable.
 */
function childrenOf(
  props: Record<string, unknown>,
): React.ReactNode | undefined {
  return props.children as React.ReactNode | undefined;
}

function textContent(node: React.ReactNode): string {
  if (node === null || node === undefined || typeof node === "boolean")
    return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textContent).join("");
  return "";
}

/** Parse an SVG `viewBox` string of form "x y w h" or "x, y, w, h". */
function parseViewBox(raw: unknown): { width: number; height: number } | null {
  if (typeof raw !== "string") return null;
  const parts = raw
    .trim()
    .split(/[\s,]+/)
    .map(Number);
  if (parts.length !== 4 || parts.some((n) => !Number.isFinite(n))) return null;
  const [, , w, h] = parts;
  if (w <= 0 || h <= 0) return null;
  return { width: w, height: h };
}
