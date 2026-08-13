import { describe, expect, it } from "vitest";
import {
  filterProjects,
  getAdjacentProject,
  getContent,
  getFeaturedProjects,
  getInsight,
  getInsights,
  getProject,
  getProjectFilters,
  getProjects,
  getRelatedInsights,
} from "@/data";
import { locales, defaultLocale, type Locale } from "@/lib/i18n/config";

const projects = getProjects(defaultLocale);

describe("project filtering", () => {
  it("returns everything for the 'all' filter", () => {
    expect(filterProjects(projects, "all")).toHaveLength(projects.length);
  });

  it("narrows to projects that declare the service", () => {
    const web = filterProjects(projects, "web");
    expect(web.length).toBeGreaterThan(0);
    expect(web.every((p) => p.services.includes("web"))).toBe(true);
  });

  it("returns an empty list for a service with no published work", () => {
    expect(filterProjects(projects, "bots")).toEqual([]);
  });

  it("only offers filters that actually match something", () => {
    for (const filter of getProjectFilters(defaultLocale, "All")) {
      expect(filter.count).toBeGreaterThan(0);
    }
  });

  it("counts the full portfolio under 'all'", () => {
    const all = getProjectFilters(defaultLocale, "All").find((f) => f.key === "all");
    expect(all?.count).toBe(projects.length);
  });
});

describe("project lookup", () => {
  it("finds a project by slug", () => {
    expect(getProject(defaultLocale, "crashatlas")?.name).toBe("CrashAtlas");
  });

  it("returns undefined for an unknown slug", () => {
    expect(getProject(defaultLocale, "nope")).toBeUndefined();
  });

  it("wraps around at the end of the list for the next project", () => {
    const last = projects[projects.length - 1];
    expect(getAdjacentProject(defaultLocale, last.slug).slug).toBe(projects[0].slug);
  });

  it("never points a project at itself", () => {
    for (const project of projects) {
      expect(getAdjacentProject(defaultLocale, project.slug).slug).not.toBe(project.slug);
    }
  });

  it("caps the featured list at the requested size", () => {
    expect(getFeaturedProjects(defaultLocale, 3)).toHaveLength(3);
  });
});

describe("content integrity", () => {
  it("gives every project a unique slug", () => {
    expect(new Set(projects.map((p) => p.slug)).size).toBe(projects.length);
  });

  it("gives every project a live URL", () => {
    for (const project of projects) {
      expect(project.url).toMatch(/^https:\/\//);
    }
  });

  it("points every gallery and cover image at the project's own folder", () => {
    for (const project of projects) {
      expect(project.cover.src).toBe(`/work/${project.slug}/cover.jpg`);
      for (const shot of project.gallery) {
        expect(shot.src.startsWith(`/work/${project.slug}/`)).toBe(true);
        expect(shot.alt.length).toBeGreaterThan(3);
      }
    }
  });

  it("only references real slugs from service proof lists", () => {
    const slugs = new Set(projects.map((p) => p.slug));
    for (const service of getContent(defaultLocale).services) {
      for (const slug of service.proof) {
        expect(slugs.has(slug)).toBe(true);
      }
    }
  });

  it("keeps architecture edges pointing at declared nodes", () => {
    for (const project of projects) {
      const ids = new Set(project.architecture.nodes.map((n) => n.id));
      for (const edge of project.architecture.edges) {
        expect(ids.has(edge.from)).toBe(true);
        expect(ids.has(edge.to)).toBe(true);
      }
    }
  });
});

/**
 * Translations are separate files, so structural drift between them is the
 * realistic failure mode. These assertions make it a failing test rather than
 * a broken page in one language.
 */
describe("locale parity", () => {
  const others = locales.filter((l) => l !== defaultLocale) as Locale[];

  it("ships the same project slugs in every locale", () => {
    for (const locale of others) {
      expect(getProjects(locale).map((p) => p.slug)).toEqual(projects.map((p) => p.slug));
    }
  });

  it("ships the same insight slugs in every locale", () => {
    const base = getInsights(defaultLocale).map((i) => i.slug);
    for (const locale of others) {
      expect(getInsights(locale).map((i) => i.slug)).toEqual(base);
    }
  });

  it("keeps image paths, URLs and accents identical across locales", () => {
    for (const locale of others) {
      const translated = getProjects(locale);
      projects.forEach((project, i) => {
        expect(translated[i].url).toBe(project.url);
        expect(translated[i].cover.src).toBe(project.cover.src);
        expect(translated[i].accent).toBe(project.accent);
        expect(translated[i].featured).toBe(project.featured);
        expect(translated[i].services).toEqual(project.services);
        expect(translated[i].gallery.map((g) => g.src)).toEqual(project.gallery.map((g) => g.src));
      });
    }
  });

  it("keeps architecture graphs structurally identical across locales", () => {
    for (const locale of others) {
      const translated = getProjects(locale);
      projects.forEach((project, i) => {
        expect(translated[i].architecture.nodes.map((n) => n.id)).toEqual(
          project.architecture.nodes.map((n) => n.id),
        );
        // Edge labels are prose and translate; the graph itself must not.
        expect(translated[i].architecture.edges.map((e) => `${e.from}->${e.to}`)).toEqual(
          project.architecture.edges.map((e) => `${e.from}->${e.to}`),
        );
      });
    }
  });

  it("keeps service, industry and module keys identical across locales", () => {
    const base = getContent(defaultLocale);
    for (const locale of others) {
      const other = getContent(locale);
      expect(other.services.map((s) => s.key)).toEqual(base.services.map((s) => s.key));
      expect(other.industries.map((s) => s.key)).toEqual(base.industries.map((s) => s.key));
      expect(other.builderModules.map((m) => m.key)).toEqual(base.builderModules.map((m) => m.key));
      expect(other.builderModules.map((m) => m.weeks)).toEqual(
        base.builderModules.map((m) => m.weeks),
      );
      expect(other.estimatorSteps.map((s) => s.id)).toEqual(base.estimatorSteps.map((s) => s.id));
      // The quote translates; who said it and when is a fact and must not.
      expect(other.testimonials.map((t) => `${t.id}:${t.year}`)).toEqual(
        base.testimonials.map((t) => `${t.id}:${t.year}`),
      );
      expect(other.dashboardTabs.map((t) => t.key)).toEqual(base.dashboardTabs.map((t) => t.key));
      expect(other.automationFlow.map((s) => s.id)).toEqual(base.automationFlow.map((s) => s.id));
      expect(other.aiFlow.map((s) => s.id)).toEqual(base.aiFlow.map((s) => s.id));
    }
  });

  it("keeps every estimator option value identical across locales", () => {
    const base = getContent(defaultLocale).estimatorSteps;
    for (const locale of others) {
      getContent(locale).estimatorSteps.forEach((step, i) => {
        expect(step.options.map((o) => o.value)).toEqual(base[i].options.map((o) => o.value));
      });
    }
  });
});

describe("insights", () => {
  it("sorts newest first", () => {
    const dates = getInsights(defaultLocale).map((i) => i.date);
    expect([...dates].sort().reverse()).toEqual(dates);
  });

  it("finds an insight by slug", () => {
    expect(getInsight(defaultLocale, "automation-that-fails-loudly")?.category).toBe("Automation");
  });

  it("never suggests the article you are already reading", () => {
    const slug = getInsights(defaultLocale)[0].slug;
    expect(getRelatedInsights(defaultLocale, slug).some((i) => i.slug === slug)).toBe(false);
  });

  it("still returns suggestions for an unknown slug", () => {
    expect(getRelatedInsights(defaultLocale, "missing", 2)).toHaveLength(2);
  });
});
