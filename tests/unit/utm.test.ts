import { describe, expect, it } from "vitest";
import { inferSource, parseUtm } from "@/lib/analytics/utm";

describe("parseUtm", () => {
  it("reads utm parameters from a full URL", () => {
    const result = parseUtm(
      "https://keel.studio/contact?utm_source=linkedin&utm_medium=social&utm_campaign=q4",
    );
    expect(result).toMatchObject({
      utmSource: "linkedin",
      utmMedium: "social",
      utmCampaign: "q4",
    });
  });

  it("reads utm parameters from a bare query string", () => {
    expect(parseUtm("?utm_source=newsletter").utmSource).toBe("newsletter");
  });

  it("accepts URLSearchParams directly", () => {
    const params = new URLSearchParams({ utm_medium: "cpc" });
    expect(parseUtm(params).utmMedium).toBe("cpc");
  });

  it("falls back to utm_source when no explicit source is given", () => {
    expect(parseUtm("?utm_source=github").source).toBe("github");
  });

  it("prefers an explicit source over utm_source", () => {
    expect(parseUtm("?source=builder&utm_source=github").source).toBe("builder");
  });

  it("returns undefined rather than empty strings", () => {
    const result = parseUtm("?utm_source=&utm_medium=");
    expect(result.utmSource).toBeUndefined();
    expect(result.utmMedium).toBeUndefined();
  });

  it("does not throw on junk input", () => {
    expect(() => parseUtm("::::")).not.toThrow();
  });
});

describe("inferSource", () => {
  it("treats a missing referrer as direct traffic", () => {
    expect(inferSource(undefined)).toBe("direct");
  });

  it("strips the www prefix from a referring host", () => {
    expect(inferSource("https://www.google.com/search?q=studio")).toBe("google.com");
  });

  it("returns undefined for an unparseable referrer", () => {
    expect(inferSource("not a url")).toBeUndefined();
  });
});
