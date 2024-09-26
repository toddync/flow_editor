<script lang="ts">
	//@ts-nocheck
	import * as Card from "$lib/components/ui/card";
	import * as ContextMenu from "$lib/components/ui/context-menu";
	import { Ampersand, Ampersands } from "lucide-svelte";
	let me;
	let above, bellow;
	function mousemove(e) {
		let y = e.clientY;
		const rect = me.getBoundingClientRect(); // Get the element's position and size
		if (y - rect.top > rect.height / 2) {
			above = false;
			bellow = true;
		} else {
			above = true;
			bellow = false;
		}
	}
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	bind:this={me}
	on:mousemove={mousemove}
	on:mouseleave={() => (bellow = above = false)}
>
	<div
		class="h-1 transition-all duration-1000 rounded-md data-[light]:bg-purple-400"
		data-light={above || null}
	/>
	<Card.Root class="w-fit mx-auto">
		<Card.Header class="p-2">
			<Ampersands />
		</Card.Header>
	</Card.Root>
	<div
		class="h-1 transition-all duration-1000 rounded-md data-[light]:bg-purple-400"
		data-light={bellow || null}
	/>
</div>
