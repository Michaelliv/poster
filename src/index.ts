// Public library surface.
//
// import { Poster } from "poster-cli";
// const poster = new Poster();
// const png = await poster.render({ tsx: source }, { format: "png" });

export { DEFAULTS, inferFormat, Poster } from "./poster.js";
export type {
  BuildOptions,
  ExportFormat,
  PosterInput,
  PosterOptions,
  RenderOptions,
} from "./poster.js";
