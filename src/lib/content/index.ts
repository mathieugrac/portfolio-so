import matter from "gray-matter";
import { marked } from "marked";

// Types
export interface ProjectImage {
  type: "image";
  src: string;
  alt: string;
  caption?: string;
  layout?: "center" | "left" | "right";
}

export interface ProjectText {
  type: "text";
  content: string;
}

export type ContentBlock = ProjectImage | ProjectText;

export interface DistributionItem {
  role: string;
  name: string;
}

export interface Project {
  slug: string;
  title: string;
  subtitle?: string;
  year: number;
  director: string;
  cover: string;
  description?: string;
  distribution?: DistributionItem[];
  blocks?: ContentBlock[];
}

export interface SiteSettings {
  name: string;
  email: string;
  portrait: string;
  headline: string;
  subheadline: string;
}

export interface ParcoursProject {
  title: string;
  role?: string;
  desc: string;
}

export interface ParcoursYear {
  year: string;
  projects: ParcoursProject[];
}

// Import all content files at build time using Vite's import.meta.glob
const projectFiles = import.meta.glob("/src/content/projects/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

const siteSettingsFile = import.meta.glob("/src/content/settings/site.yml", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

const experienceFile = import.meta.glob("/src/content/parcours/experience.yml", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

const formationFile = import.meta.glob("/src/content/parcours/formation.yml", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

/**
 * Get all projects from markdown files
 */
export async function getAllProjects(): Promise<Project[]> {
  const projects: Project[] = [];

  for (const [, content] of Object.entries(projectFiles)) {
    const { data } = matter(content);

    // Process blocks - convert markdown content in text blocks
    const blocks = data.blocks?.map((block: ContentBlock) => {
      if (block.type === "text" && "content" in block) {
        return {
          ...block,
          content: marked.parse(block.content) as string,
        };
      }
      return block;
    });

    projects.push({
      slug: data.slug,
      title: data.title,
      subtitle: data.subtitle,
      year: data.year,
      director: data.director,
      cover: data.cover,
      description: data.description,
      distribution: data.distribution,
      blocks,
    });
  }

  // Sort by year (newest first)
  return projects.sort((a, b) => b.year - a.year);
}

/**
 * Get a single project by slug
 */
export async function getProjectBySlug(
  slug: string
): Promise<Project | undefined> {
  const projects = await getAllProjects();
  return projects.find((p) => p.slug === slug);
}

/**
 * Parse a YAML file content
 */
function parseYamlContent<T>(content: string): T | null {
  if (!content) {
    return null;
  }

  // If file has frontmatter delimiters, use gray-matter
  if (content.startsWith("---")) {
    const { data } = matter(content);
    return data as T;
  }

  // Otherwise, parse as pure YAML using gray-matter's engine
  return matter.engines.yaml.parse(content) as T;
}

/**
 * Get site settings
 */
export async function getSiteSettings(): Promise<SiteSettings> {
  const content = Object.values(siteSettingsFile)[0];
  const data = parseYamlContent<SiteSettings>(content);

  if (!data) {
    // Return defaults
    return {
      name: "Anne Sophie Grac",
      email: "annesophiegrac@gmail.com",
      portrait: "/img/portrait-anneso-5.jpg",
      headline: "Anne Sophie Grac est scénographe et costumière.",
      subheadline:
        "Diplômée de l'École du Théâtre National de Strasbourg, elle consacre son énergie à de nombreuses créations théâtrales.",
    };
  }

  return data;
}

/**
 * Get parcours (experience + formation)
 */
export async function getParcours(): Promise<{
  experience: ParcoursYear[];
  formation: ParcoursYear[];
}> {
  const experienceContent = Object.values(experienceFile)[0];
  const formationContent = Object.values(formationFile)[0];

  const experienceData = parseYamlContent<{ items: ParcoursYear[] }>(experienceContent);
  const formationData = parseYamlContent<{ items: ParcoursYear[] }>(formationContent);

  return {
    experience: experienceData?.items || [],
    formation: formationData?.items || [],
  };
}
