import { sql } from "drizzle-orm";

import { db } from "@/db";
import {
  blogPostRecords,
  industryRecords,
  projectRecords,
  serviceRecords,
  teamMemberRecords,
  testimonialRecords,
} from "@/db/schema";

type CountableTable =
  | typeof serviceRecords
  | typeof projectRecords
  | typeof industryRecords
  | typeof blogPostRecords
  | typeof testimonialRecords
  | typeof teamMemberRecords;

async function countRows(table: CountableTable): Promise<number | null> {
  try {
    const [row] = await db.select({ value: sql<number>`count(*)::int` }).from(table);
    return row?.value ?? 0;
  } catch {
    return null; // database unreachable
  }
}

/**
 * Reports whether each content type is currently served from PostgreSQL or is
 * still falling back to the typed seed content in src/content/*.
 */
export async function getContentSources() {
  const [services, projects, industries, posts, testimonials, team] = await Promise.all([
    countRows(serviceRecords),
    countRows(projectRecords),
    countRows(industryRecords),
    countRows(blogPostRecords),
    countRows(testimonialRecords),
    countRows(teamMemberRecords),
  ]);

  const resolve = (count: number | null) =>
    count && count > 0 ? ("database" as const) : ("seed content" as const);

  return {
    services: { count: services, source: resolve(services) },
    projects: { count: projects, source: resolve(projects) },
    industries: { count: industries, source: resolve(industries) },
    posts: { count: posts, source: resolve(posts) },
    testimonials: { count: testimonials, source: resolve(testimonials) },
    team: { count: team, source: resolve(team) },
    databaseReachable: services !== null,
  };
}
