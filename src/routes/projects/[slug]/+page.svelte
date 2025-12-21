<script lang="ts">
  import Distribution from "$lib/components/Distribution.svelte";
  import BlockRenderer from "$lib/components/BlockRenderer.svelte";

  let { data } = $props();
  const { project, settings } = data;
</script>

<svelte:head>
  <title>{project.title} — {settings.name}</title>
</svelte:head>

<section class="project wrapper space-bottom-large">
  <div class="row space-bottom-large">
    <div class="col">
      <img class="cover" src={project.cover} alt={project.title} />
    </div>
    <div class="col padding space-medium">
      <h1>{project.subtitle || project.title}</h1>
      {#if project.subtitle}
        <h2 class="subtitle">de {project.director}</h2>
      {/if}
    </div>

    {#if project.description}
      <div class="col four-to-six padding">
        <h3 class="space-bottom-small">À propos</h3>
        <p class="justify">{project.description}</p>
      </div>
    {/if}

    {#if project.distribution && project.distribution.length > 0}
      <div class="col two-to-six padding">
        <h3 class="space-bottom-small">Distribution</h3>
        <Distribution items={project.distribution} />
      </div>
    {/if}
  </div>

  {#if project.blocks && project.blocks.length > 0}
    <div class="project-content row">
      <BlockRenderer blocks={project.blocks} />
    </div>
  {/if}
</section>
