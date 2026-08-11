import { describe, expect, it } from "vitest";
import { buildBrief } from "@/features/estimator/estimator";
import { estimateWeeks } from "@/features/builder/product-builder";
import { parseCountable } from "@/components/motion/counter";
import { getContent } from "@/data";
import { getDictionary } from "@/lib/i18n/dictionaries";

const steps = getContent("en").estimatorSteps;
const labels = getDictionary("en").brief;

describe("buildBrief", () => {
  it("renders every answered step as a sentence", () => {
    const brief = buildBrief({
      product: "crm",
      stage: "existing",
      scope: "full-cycle",
      timing: "now",
    }, steps, labels);
    expect(brief).toContain("We are building: CRM / ERP.");
    expect(brief).toContain("Starting from: An existing product.");
    expect(brief).toContain("We need: Full cycle.");
    expect(brief).toContain("Timing: Now.");
  });

  it("skips unanswered steps instead of printing placeholders", () => {
    const brief = buildBrief({ product: "saas" }, steps, labels);
    expect(brief).toContain("SaaS platform");
    expect(brief).not.toContain("Starting from");
    expect(brief).not.toContain("undefined");
  });

  it("ignores values that are not valid options", () => {
    expect(buildBrief({ product: "spaceship" }, steps, labels)).not.toContain("spaceship");
  });

  it("always leaves the visitor a place to add context", () => {
    expect(buildBrief({}, steps, labels).trim()).toBe("Context:");
  });
});

describe("estimateWeeks", () => {
  it("returns null when nothing is selected", () => {
    expect(estimateWeeks([])).toBeNull();
  });

  it("uses the largest module as the floor for a single selection", () => {
    expect(estimateWeeks([{ weeks: 10 }])).toEqual({ low: 10, high: 15 });
  });

  it("adds less than the full duration of each additional module", () => {
    const combined = estimateWeeks([{ weeks: 10 }, { weeks: 8 }]);
    expect(combined).not.toBeNull();
    expect(combined!.low).toBeGreaterThan(10);
    expect(combined!.low).toBeLessThan(18);
  });

  it("is order-independent", () => {
    const a = estimateWeeks([{ weeks: 4 }, { weeks: 10 }, { weeks: 6 }]);
    const b = estimateWeeks([{ weeks: 10 }, { weeks: 6 }, { weeks: 4 }]);
    expect(a).toEqual(b);
  });

  it("always returns a range, never a single figure", () => {
    const range = estimateWeeks([{ weeks: 6 }, { weeks: 6 }]);
    expect(range!.high).toBeGreaterThan(range!.low);
  });

  it("grows monotonically as modules are added", () => {
    const one = estimateWeeks([{ weeks: 6 }])!;
    const two = estimateWeeks([{ weeks: 6 }, { weeks: 5 }])!;
    const three = estimateWeeks([{ weeks: 6 }, { weeks: 5 }, { weeks: 4 }])!;
    expect(two.low).toBeGreaterThan(one.low);
    expect(three.low).toBeGreaterThan(two.low);
  });
});

describe("parseCountable", () => {
  it("splits a plain integer", () => {
    expect(parseCountable("12")).toMatchObject({ prefix: "", number: 12, suffix: "" });
  });

  it("handles thousands separators", () => {
    expect(parseCountable("18,243").number).toBe(18243);
  });

  it("keeps a trailing unit as the suffix", () => {
    expect(parseCountable("96.4%")).toMatchObject({ number: 96.4, suffix: "%", decimals: 1 });
  });

  it("keeps a leading symbol as the prefix", () => {
    expect(parseCountable("€1.24M")).toMatchObject({ prefix: "€", number: 1.24, suffix: "M" });
  });

  it("leaves non-numeric values alone so they render verbatim", () => {
    expect(parseCountable("∞").number).toBeNull();
    expect(parseCountable("End to end").number).toBeNull();
  });
});
