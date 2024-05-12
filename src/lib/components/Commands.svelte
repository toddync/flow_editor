<script lang="ts">
	//@ts-nocheck
	import { onMount } from "svelte";
	import Node from "lucide-svelte/icons/blocks";
	import { showCommands as open } from "$lib/stores/ShowCommands.js";
	import * as Command from "$lib/components/ui/command/index.js";

	import { Nodes } from "$lib/stores/nodesStore";
	import { useSvelteFlow } from "@xyflow/svelte";
	import { nodeTypes } from "$lib/stores/nodeTypes";

	const { screenToFlowPosition } = useSvelteFlow();
	const types = Object.keys($nodeTypes);

	const addNode = (type) => {
		let { x, y } = screenToFlowPosition({
			x: window.innerWidth / 2,
			y: window.innerHeight / 2
		});

		$Nodes.push({
			id: crypto.randomUUID(),
			position: { x, y },
			type: type,
			dragHandle: type.toLowerCase().includes("var") && ".drag",
			data: {}
		});

		$Nodes = $Nodes;
		$open = !$open;
	};

	onMount(() => {
		function handleKeydown(e) {
			if (e.key.toLowerCase() == "k" && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				$open = !$open;
			}
		}

		document.addEventListener("keydown", handleKeydown);
		return () => {
			document.removeEventListener("keydown", handleKeydown);
		};
	});
</script>

<Command.Dialog bind:open={$open} class="bg-opacity-0 backdrop-blur-md">
	<Command.Input placeholder="Type a command or search..." />
	<Command.List>
		<Command.Empty>No results found.</Command.Empty>
		<Command.Group heading="Suggestions">
			{#each types as type}
				<Command.Item onSelect={() => addNode(type)}>
					<Node class="mr-2 h-4 w-4" />
					<span>Add {type} </span>
				</Command.Item>
			{/each}
		</Command.Group>
		<!-- <Command.Separator /> -->
	</Command.List>
</Command.Dialog>
