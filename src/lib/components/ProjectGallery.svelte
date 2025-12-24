<script lang="ts">
	import type { ProjectImage } from '$lib/content';

	export let images: ProjectImage[];

	function getLayoutClass(layout: ProjectImage['layout']): string {
		switch (layout) {
			case 'left':
				return 'photo-landscape--left';
			case 'right':
				return 'photo-landscape--right';
			case 'center-small':
				return 'photo-landscape--center-small';
			case 'center':
			default:
				return 'photo-landscape--center';
		}
	}
</script>

{#each images as image}
	<figure class={getLayoutClass(image.layout)}>
		<img src={image.src} alt={image.alt} />
		{#if image.caption}
			<figcaption>{image.caption}</figcaption>
		{/if}
	</figure>
{/each}

