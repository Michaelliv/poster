// Public library surface.
//
// import { Poster } from "poster-ai";
// const poster = new Poster();
// const png = await poster.render({ tsx: source }, { format: "png" });

export type {
  BuildOptions,
  Engine,
  ExportFormat,
  PosterInput,
  PosterOptions,
  RenderOptions,
} from "./poster.js";
export { DEFAULTS, inferFormat, Poster } from "./poster.js";
