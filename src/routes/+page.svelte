<script lang="ts">
  import ProjectCard from "$lib/components/ProjectCard.svelte";

  let { data } = $props();
  const { projects, settings } = data;
</script>

<svelte:head>
  <title>{settings.name} — Scénographe et Costumière</title>
</svelte:head>

<section class="intro row space-top-normal space-bottom-large">
  <div class="col five-to-six padding">
    <img src={settings.portrait} alt="Portrait {settings.name}" />
    <div>
      <h1>{settings.headline}</h1>
      <h2>{settings.subheadline}</h2>
    </div>
  </div>
</section>

<section class="row">
  {#each projects as project}
    <ProjectCard {project} />
  {/each}
</section>
