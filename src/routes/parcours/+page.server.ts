import { getSiteSettings, getParcours } from "$lib/content";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  const [settings, parcours] = await Promise.all([
    getSiteSettings(),
    getParcours(),
  ]);

  return {
    settings,
    experience: parcours.experience,
    formation: parcours.formation,
  };
};

