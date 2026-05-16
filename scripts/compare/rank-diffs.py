# Rank the v1/v2 PNG pairs in the comparison output directory by visual
# divergence, biggest first. Score combines pixel RMS difference with a
# dimension-mismatch penalty so clipped/overlong renders surface fast.
#
# Default directory matches scripts/compare/render-all.mjs:
#   /tmp/poster-takumi-compare
# Override on the command line:
#   python3 scripts/compare/rank-diffs.py /other/path
import math
import sys
from pathlib import Path

from PIL import Image, ImageChops, ImageStat

root = Path(sys.argv[1] if len(sys.argv) > 1 else "/tmp/poster-takumi-compare")

rows = []
for v1 in sorted(root.glob("*.v1.png")):
    name = v1.name[:-7]
    v2 = root / f"{name}.v2.png"
    if not v2.exists():
        continue

    im1 = Image.open(v1).convert("RGB")
    im2 = Image.open(v2).convert("RGB")
    w1, h1 = im1.size
    w2, h2 = im2.size

    # Resize v2 to v1 size so layout/content differences remain visible but
    # pure physical-size differences don't dominate the RMS term.
    im2r = im2.resize((w1, h1), Image.Resampling.LANCZOS)
    diff = ImageChops.difference(im1, im2r)
    stat = ImageStat.Stat(diff)
    rms = math.sqrt(sum(v * v for v in stat.rms) / 3)
    mae = sum(stat.mean) / 3

    # Dimension penalty surfaces clipped/overlong renders quickly.
    dim_penalty = 255 * (
        abs(w1 - w2) / max(w1, w2) + abs(h1 - h2) / max(h1, h2)
    )
    score = rms + dim_penalty
    rows.append((score, rms, mae, dim_penalty, name, (w1, h1), (w2, h2)))

rows.sort(reverse=True)

print(f"{len(rows)} pairs in {root}")
print(
    f"{'rank':>4}  {'score':>8}  {'rms':>7}  {'mae':>7}  {'dim':>7}  "
    f"{'name':<16}  {'v1':<12}  v2"
)
for i, row in enumerate(rows[:25], 1):
    score, rms, mae, dim, name, s1, s2 = row
    print(
        f"{i:>4}  {score:8.1f}  {rms:7.1f}  {mae:7.1f}  {dim:7.1f}  "
        f"{name:<16}  {s1[0]}x{s1[1]:<6}  {s2[0]}x{s2[1]}"
    )
