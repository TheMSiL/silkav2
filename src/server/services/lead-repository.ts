import { randomUUID } from "node:crypto";
import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";
import type { Lead } from "@/types";

/**
 * Where leads go.
 *
 * The repository is an interface so the delivery mechanism is a deployment
 * decision, not an application one. Today: append to a JSONL file (and log in
 * development). Tomorrow: Prisma + PostgreSQL — see `prisma/schema.prisma`,
 * which already models this exact shape. Add `PrismaLeadRepository`, return it
 * from `getLeadRepository()`, and nothing above this file changes.
 */
export interface LeadRepository {
  create(lead: Omit<Lead, "id" | "createdAt">): Promise<Lead>;
}

class FileLeadRepository implements LeadRepository {
  constructor(private readonly file = path.join(process.cwd(), ".data", "leads.jsonl")) {}

  async create(input: Omit<Lead, "id" | "createdAt">): Promise<Lead> {
    const lead: Lead = { ...input, id: randomUUID(), createdAt: new Date() };
    await mkdir(path.dirname(this.file), { recursive: true });
    await appendFile(this.file, `${JSON.stringify(lead)}\n`, "utf8");
    return lead;
  }
}

/**
 * Read-only environments (edge, some serverless targets) have no writable
 * filesystem. Falling back to a logged lead is better than dropping it.
 */
class ConsoleLeadRepository implements LeadRepository {
  async create(input: Omit<Lead, "id" | "createdAt">): Promise<Lead> {
    const lead: Lead = { ...input, id: randomUUID(), createdAt: new Date() };
    console.info("[lead]", JSON.stringify(lead));
    return lead;
  }
}

class ResilientLeadRepository implements LeadRepository {
  constructor(
    private readonly primary: LeadRepository,
    private readonly fallback: LeadRepository,
  ) {}

  async create(input: Omit<Lead, "id" | "createdAt">): Promise<Lead> {
    try {
      return await this.primary.create(input);
    } catch (error) {
      console.error("[lead] primary store failed, falling back", error);
      return this.fallback.create(input);
    }
  }
}

let repository: LeadRepository | null = null;

export function getLeadRepository(): LeadRepository {
  if (!repository) {
    repository = new ResilientLeadRepository(new FileLeadRepository(), new ConsoleLeadRepository());
  }
  return repository;
}

/** Test seam. */
export function __setLeadRepository(next: LeadRepository | null) {
  repository = next;
}
