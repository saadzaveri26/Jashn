import * as sw from "stream/web";
import { TextDecoder, TextEncoder } from "util";
import * as v8 from "v8";

const g = globalThis as unknown as Record<string, unknown>;

Object.assign(g, sw);
g.TextDecoder = TextDecoder;
g.TextEncoder = TextEncoder;
g.structuredClone = (val: unknown) => v8.deserialize(v8.serialize(val));

const primitives = require("next/dist/compiled/@edge-runtime/primitives");

g.Request = primitives.Request;
g.Response = primitives.Response;
g.Headers = primitives.Headers;
g.FormData = primitives.FormData;
