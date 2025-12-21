import { error } from "@sveltejs/kit";
import { getProjectBySlug, getSiteSettings } from "$lib/content";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
  const [project, settings] = await Promise.all([
    getProjectBySlug(params.slug),
    getSiteSettings(),
  ]);

  if (!project) {
    throw error(404, "Project not found");
  }

  return { project, settings };
};
