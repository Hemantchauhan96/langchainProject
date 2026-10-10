import { describe, expect, it } from "vitest";
import { parseEnvironment } from "../../src/config/env.js";

describe("parseEnvironment", () => {
  it("uses the default application name when it is not configured", () => {
    expect(parseEnvironment({})).toEqual({
      APP_NAME: "Agentic AI Learning Project",
    });
  });

  it("trims a configured application name", () => {
    expect(parseEnvironment({ APP_NAME: "  Notes App  " })).toEqual({
      APP_NAME: "Notes App",
    });
  });

  it("rejects an empty application name", () => {
    expect(() => parseEnvironment({ APP_NAME: "   " })).toThrow();
  });
});
