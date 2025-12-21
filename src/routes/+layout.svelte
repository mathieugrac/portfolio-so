<script lang="ts">
  import Header from "$lib/components/Header.svelte";
  import Footer from "$lib/components/Footer.svelte";
  import "$lib/styles/main.css";

  let { data, children } = $props();
</script>

<Header projects={data.allProjects} settings={data.siteSettings} />

<section class="main wrapper space-bottom-large">
  {@render children()}
</section>

<Footer settings={data.siteSettings} />
