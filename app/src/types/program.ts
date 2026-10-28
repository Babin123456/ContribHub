export type ProgramCategory =
  | "mentorship"
  | "fellowship"
  | "hackathon"
  | "diversity"
  | "documentation";

export type ProgramStatus = "open" | "upcoming" | "ongoing" | "closed" | "rolling";

export type ProgramDifficulty = "beginner" | "intermediate" | "advanced";

export interface ProgramStipend {
  offered: boolean;
  amount?: string;
  currency?: string;
  details?: string;
}

export interface ProgramTimeline {
  applicationStart?: string;
  applicationEnd?: string;
  duration?: string;
}

export interface Program {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  organization: string;
  category: ProgramCategory;
  status: ProgramStatus;
  difficulty: ProgramDifficulty;
  stipend: ProgramStipend;
  timeline: ProgramTimeline;
  tags: string[];
  websiteUrl: string;
  docsUrl?: string;
  isRemote: boolean;
}

export interface ProgramFilterOptions {
  query?: string;
  category?: ProgramCategory | "all";
  status?: ProgramStatus | "all";
  difficulty?: ProgramDifficulty | "all";
  stipendOnly?: boolean;
  remoteOnly?: boolean;
  tag?: string;
}

export interface ProgramStatistics {
  totalPrograms: number;
  openPrograms: number;
  paidPrograms: number;
  categoryCounts: Record<ProgramCategory, number>;
}

