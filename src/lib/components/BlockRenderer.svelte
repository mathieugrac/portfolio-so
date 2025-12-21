<script lang="ts">
  import type { ContentBlock } from "$lib/content";

  export let blocks: ContentBlock[];

  function getLayoutClass(layout?: string): string {
    switch (layout) {
      case "left":
        return "photo-landscape--left";
      case "right":
        return "photo-landscape--right";
      case "center":
      default:
        return "photo-landscape--center";
    }
  }
</script>

{#each blocks as block}
  {#if block.type === "image"}
    <figure class={getLayoutClass(block.layout)}>
      <img src={block.src} alt={block.alt} />
      {#if block.caption}
        <figcaption>{block.caption}</figcaption>
      {/if}
    </figure>
  {:else if block.type === "text"}
    <div class="row">
      <div class="texte">
        {@html block.content}
      </div>
    </div>
  {/if}
{/each}

