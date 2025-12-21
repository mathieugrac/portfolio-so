<script lang="ts">
  let { data } = $props();
  const { settings, experience, formation } = data;
</script>

<svelte:head>
  <title>Parcours — {settings.name}</title>
</svelte:head>

<section class="parcours row space-top-normal space-bottom-large">
  <div class="col five-to-six padding">
    <img src={settings.portrait} alt="Portrait {settings.name}" />
    <div>
      <h1>{settings.headline}</h1>
      <h2>{settings.subheadline}</h2>
    </div>
  </div>
</section>

<section class="parcours row">
  <div class="col three-to-six padding space-bottom-large">
    <h3 class="space-bottom-medium">Expériences</h3>

    {#each experience as yearGroup}
      <div class="parcours-experience">
        <h4>{yearGroup.year}</h4>
        {#each yearGroup.projects as project}
          <h6>{project.title}</h6>
          <p class="paragraph-small">
            {#if project.role}
              <strong>{project.role}</strong> —
            {/if}
            {project.desc}
          </p>
        {/each}
      </div>
    {/each}
  </div>

  <div class="col three-to-six padding space-bottom-large">
    <h3 class="space-bottom-medium">Formation</h3>

    {#each formation as yearGroup}
      <div class="parcours-experience">
        <h4>{yearGroup.year}</h4>
        {#each yearGroup.projects as project}
          <h6>{project.title}</h6>
          <p class="paragraph-small">{project.desc}</p>
        {/each}
      </div>
    {/each}
  </div>
</section>
