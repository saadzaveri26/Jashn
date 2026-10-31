import "@testing-library/jest-dom";

const g = global as unknown as {
  Request?: typeof Request;
  Response?: typeof Response;
  Headers?: typeof Headers;
};

if (!g.Request && typeof globalThis.Request !== "undefined") {
  g.Request = globalThis.Request;
}
if (!g.Response && typeof globalThis.Response !== "undefined") {
  g.Response = globalThis.Response;
}
if (!g.Headers && typeof globalThis.Headers !== "undefined") {
  g.Headers = globalThis.Headers;
}
