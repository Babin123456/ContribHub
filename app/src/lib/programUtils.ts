import {
  Program,
  ProgramCategory,
  ProgramFilterOptions,
  ProgramStatistics,
  ProgramStatus,
} from "../types/program";

/**
 * Searches programs using multi-token matching across name, organization, tagline, and tags.
 */
export function searchPrograms(programs: Program[], query: string): Program[] {
  const trimmed = query.trim().toLowerCase();
  if (!trimmed) {
    return programs;
  }

  const tokens = trimmed.split(/\s+/);

  return programs.filter((program) => {
    const searchableText = [
      program.name,
      program.organization,
      program.tagline,
      program.description,
      ...program.tags,
    ]
      .join(" ")
      .toLowerCase();

    return tokens.every((token) => searchableText.includes(token));
  });
}

/**
 * Filters programs based on a comprehensive set of criteria (query, category, status, difficulty, stipend, remote).
 */
export function filterPrograms(
  programs: Program[],
  options: ProgramFilterOptions = {}
): Program[] {
  let result = programs;

  if (options.query) {
    result = searchPrograms(result, options.query);
  }

  if (options.category && options.category !== "all") {
    result = result.filter(
      (p) => p.category.toLowerCase() === options.category?.toLowerCase()
    );
  }

  if (options.status && options.status !== "all") {
    result = result.filter(
      (p) => p.status.toLowerCase() === options.status?.toLowerCase()
    );
  }

  if (options.difficulty && options.difficulty !== "all") {
    result = result.filter(
      (p) => p.difficulty.toLowerCase() === options.difficulty?.toLowerCase()
    );
  }

  if (options.stipendOnly) {
    result = result.filter((p) => p.stipend.offered);
  }

  if (options.remoteOnly) {
    result = result.filter((p) => p.isRemote);
  }

  if (options.tag) {
    const targetTag = options.tag.toLowerCase();
    result = result.filter((p) =>
      p.tags.some((t) => t.toLowerCase() === targetTag)
    );
  }

  return result;
}

/**
 * Finds a program by its URL-friendly slug.
 */
export function getProgramBySlug(
  programs: Program[],
  slug: string
): Program | undefined {
  return programs.find((p) => p.slug.toLowerCase() === slug.toLowerCase());
}

/**
 * Retrieves a list of unique tags across all registered programs.
 */
export function getUniqueTags(programs: Program[]): string[] {
  const tagSet = new Set<string>();
  programs.forEach((p) => {
    p.tags.forEach((tag) => tagSet.add(tag));
  });
  return Array.from(tagSet).sort();
}

/**
 * Computes high-level aggregated catalog metrics for dashboard/overview widgets.
 */
export function getProgramStatistics(programs: Program[]): ProgramStatistics {
  const categoryCounts: Record<ProgramCategory, number> = {
    mentorship: 0,
    fellowship: 0,
    hackathon: 0,
    diversity: 0,
    documentation: 0,
  };

  let openPrograms = 0;
  let paidPrograms = 0;

  programs.forEach((program) => {
    if (categoryCounts[program.category] !== undefined) {
      categoryCounts[program.category] += 1;
    }
    if (program.status === "open") {
      openPrograms += 1;
    }
    if (program.stipend.offered) {
      paidPrograms += 1;
    }
  });

  return {
    totalPrograms: programs.length,
    openPrograms,
    paidPrograms,
    categoryCounts,
  };
}

/**
 * Formats a status into a human-readable badge label and color variant.
 */
export function formatProgramStatus(status: ProgramStatus): {
  label: string;
  variant: "success" | "warning" | "info" | "default";
} {
  switch (status) {
    case "open":
      return { label: "Applications Open", variant: "success" };
    case "upcoming":
      return { label: "Upcoming", variant: "warning" };
    case "ongoing":
      return { label: "In Progress", variant: "info" };
    case "rolling":
      return { label: "Rolling Applications", variant: "info" };
    case "closed":
    default:
      return { label: "Closed", variant: "default" };
  }
}
