import { getAllProjects, getSiteSettings } from "$lib/content";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  const [projects, settings] = await Promise.all([
    getAllProjects(),
    getSiteSettings(),
  ]);

  return {
    projects,
    settings,
  };
};

