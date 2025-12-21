<script lang="ts">
  import type { Project } from "$lib/content";

  export let project: Project;
</script>

<article>
  <a class="item-project" href="/projects/{project.slug}">
    <img class="item-project-image" src={project.cover} alt={project.title} />
    <div class="item-project-title">
      <div>
        <h3 class="space-top-medium">{project.title}</h3>
      </div>
      <div>
        <h4 class="title-project-year">{project.year}</h4>
        <ul class="list-horizontal list-roles">
          <li>{project.director}</li>
        </ul>
      </div>
    </div>
  </a>
</article>
