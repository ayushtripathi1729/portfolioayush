export const PROJECT_STATUSES = [
  "PUBLISHED",
  "DRAFT",
  "ARCHIVED",
] as const;


export type ProjectStatus =
  (typeof PROJECT_STATUSES)[number];