import { getAllProjects, getSiteSettings } from "$lib/content";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async () => {
  const [projects, settings] = await Promise.all([
    getAllProjects(),
    getSiteSettings(),
  ]);

  return {
    allProjects: projects,
    siteSettings: settings,
  };
};

