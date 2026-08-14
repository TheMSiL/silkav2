import { describe, expect, it } from "vitest";
import { getLeadSchema, toFieldErrors } from "@/server/validators/lead";

const leadSchema = getLeadSchema("en");

const valid = {
  name: "Dana Meyer",
  email: "dana@example.com",
  projectType: "crm",
  message: "We need a CRM that matches how our sales team actually works today.",
};

describe("leadSchema", () => {
  it("accepts a minimal valid lead", () => {
    const result = leadSchema.safeParse(valid);
    expect(result.success).toBe(true);
  });

  it("trims whitespace from text fields", () => {
    const result = leadSchema.parse({ ...valid, name: "  Dana Meyer  " });
    expect(result.name).toBe("Dana Meyer");
  });

  it("turns an empty optional string into undefined", () => {
    const result = leadSchema.parse({ ...valid, company: "", budget: "" });
    expect(result.company).toBeUndefined();
    expect(result.budget).toBeUndefined();
  });

  it("accepts a real budget value", () => {
    expect(leadSchema.parse({ ...valid, budget: "15k-30k" }).budget).toBe("15k-30k");
  });

  it("rejects an unknown budget value", () => {
    expect(leadSchema.safeParse({ ...valid, budget: "one-million" }).success).toBe(false);
  });

  it("rejects a malformed email", () => {
    const result = leadSchema.safeParse({ ...valid, email: "dana@" });
    expect(result.success).toBe(false);
  });

  it("rejects a message that says nothing", () => {
    const result = leadSchema.safeParse({ ...valid, message: "hi" });
    expect(result.success).toBe(false);
  });

  it("rejects an unknown project type", () => {
    expect(leadSchema.safeParse({ ...valid, projectType: "blockchain" }).success).toBe(false);
  });

  it("rejects a filled honeypot", () => {
    expect(leadSchema.safeParse({ ...valid, website: "http://spam.example" }).success).toBe(false);
  });

  it("maps issues onto one message per field", () => {
    const result = leadSchema.safeParse({ ...valid, name: "", email: "x" });
    expect(result.success).toBe(false);
    if (result.success) return;
    const errors = toFieldErrors(result.error);
    expect(errors.name).toBeTruthy();
    expect(errors.email).toBeTruthy();
    expect(errors.message).toBeUndefined();
  });

  it("keeps attribution fields when present", () => {
    const result = leadSchema.parse({
      ...valid,
      source: "linkedin",
      utmCampaign: "q4-launch",
      pageUrl: "https://keel.studio/contact?utm_campaign=q4-launch",
    });
    expect(result.source).toBe("linkedin");
    expect(result.utmCampaign).toBe("q4-launch");
  });
});
