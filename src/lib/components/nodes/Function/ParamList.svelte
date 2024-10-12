<script lang="ts">
	//@ts-nocheck
	import { Button } from "$lib/components/ui/button";
	import Input from "$lib/components/ui/input/input.svelte";
	import { GripVertical, Trash2 } from "lucide-svelte";
	import { dndzone } from "svelte-dnd-action";
	import { flip } from "svelte/animate";
	import { v4 as uuidv4 } from "uuid";

	export let params: Array = [];
	export let onDrop = () => {};

	function handleSort(e) {
		onDrop(e.detail.items);
	}
</script>

<Button
	class="font-jb"
	variant="outline"
	on:click={() => {
		$params[$params.length] = {
			id: uuidv4(),
			name: "X",
		};
	}}
>
	<span> Add a Paramenter </span>
</Button>
<div
	class="flex flex-col gap-2"
	use:dndzone={{
		dropTargetClasses: ["outline-none"],
		items: $params,
	}}
	on:consider={handleSort}
	on:finalize={handleSort}
>
	{#each $params as param, i (param.id)}
		<div class="flex gap-1" animate:flip>
			<GripVertical
				class="handle size-6 my-auto hover:text-orange-500 transition-colors duration-500"
			/>
			<Input
				class="flex-1 mx-auto h-10 font-jb"
				bind:value={$params[i].name}
			/>
			<Button
				variant="outline"
				size="icon"
				on:click={() => {
					$params.splice($params.indexOf(param), 1);
					$params = $params;
				}}
			>
				<Trash2
					class="size-5 my-auto text-muted-foreground hover:text-red-500 transition-colors duration-500"
				/>
			</Button>
		</div>
	{/each}
</div>
