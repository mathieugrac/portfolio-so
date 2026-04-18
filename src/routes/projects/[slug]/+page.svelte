<script lang="ts">
  import Distribution from "$lib/components/Distribution.svelte";
  import BlockRenderer from "$lib/components/BlockRenderer.svelte";

  let { data } = $props();
  const project = $derived(data.project);
  const settings = $derived(data.settings);
</script>

<svelte:head>
  <title>{project.title} — {settings.name}</title>
</svelte:head>

<section class="project wrapper space-bottom-large">
  <div class="row space-bottom-large">
    <div class="col">
      <img class="cover" src={project.pageCover || project.cover} alt={project.title} />
    </div>
    <div class="col padding space-medium">
      <h1>{project.title}</h1>
      {#if project.subtitle}
        <h2 class="subtitle">{project.subtitle}</h2>
      {/if}
    </div>

    {#if project.description}
      <div class="col four-to-six padding">
        <h3 class="space-bottom-small">À propos</h3>
        <div class="justify">{@html project.description}</div>
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
