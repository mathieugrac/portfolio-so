<script lang="ts">
  import type { Project, SiteSettings } from "$lib/content";

  export let projects: Project[];
  export let settings: SiteSettings;
</script>

<header class="header">
  <nav>
    <a class="home" href="/">{settings.name}</a>
    <ul>
      <li>
        <a href="/">Projets</a>
        <ul class="submenu">
          {#each projects as project}
            <li><a href="/projects/{project.slug}">{project.title}</a></li>
          {/each}
        </ul>
      </li>
      <li><a href="/parcours">Parcours</a></li>
      <li><a href="mailto:{settings.email}">Contact</a></li>
    </ul>
  </nav>
</header>
