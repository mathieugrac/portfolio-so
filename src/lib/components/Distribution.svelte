<script lang="ts">
  import type { DistributionItem } from "$lib/content";

  export let items: DistributionItem[];
</script>

<ul class="list-distribution">
  {#each items as item}
    <li><span>{item.role}</span>{item.name}</li>
  {/each}
</ul>
