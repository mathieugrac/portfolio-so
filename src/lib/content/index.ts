import fs from "fs";
import path from "path";
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

// Content directory path
const CONTENT_DIR = path.join(process.cwd(), "src/content");

/**
 * Get all projects from markdown files
 */
export async function getAllProjects(): Promise<Project[]> {
  const projectsDir = path.join(CONTENT_DIR, "projects");

  // Check if directory exists
  if (!fs.existsSync(projectsDir)) {
    console.warn("Projects directory not found:", projectsDir);
    return [];
  }

  const files = fs.readdirSync(projectsDir).filter((f) => f.endsWith(".md"));

  const projects: Project[] = [];

  for (const file of files) {
    const filePath = path.join(projectsDir, file);
    const content = fs.readFileSync(filePath, "utf-8");
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
 * Parse a YAML file (with or without frontmatter)
 */
function parseYamlFile<T>(filePath: string): T | null {
  if (!fs.existsSync(filePath)) {
    return null;
  }

  const content = fs.readFileSync(filePath, "utf-8");

  // If file has frontmatter delimiters, use gray-matter
  if (content.startsWith("---")) {
    const { data } = matter(content);
    return data as T;
  }

  // Otherwise, parse as pure YAML using gray-matter's engine
  const parsed = matter(content, {
    engines: {
      yaml: (s) => matter.engines.yaml.parse(s) as Record<string, unknown>,
    },
  });

  // For pure YAML, content is in the file, so we parse it directly
  return matter.engines.yaml.parse(content) as T;
}

/**
 * Get site settings
 */
export async function getSiteSettings(): Promise<SiteSettings> {
  const filePath = path.join(CONTENT_DIR, "settings/site.yml");

  const data = parseYamlFile<SiteSettings>(filePath);

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
  const experiencePath = path.join(CONTENT_DIR, "parcours/experience.yml");
  const formationPath = path.join(CONTENT_DIR, "parcours/formation.yml");

  const experienceData = parseYamlFile<{ items: ParcoursYear[] }>(experiencePath);
  const formationData = parseYamlFile<{ items: ParcoursYear[] }>(formationPath);

  return {
    experience: experienceData?.items || [],
    formation: formationData?.items || [],
  };
}

