<script lang="ts">
	//@ts-nocheck
	import CodeDown from "$lib/In-Out/code";
	import imageDown from "$lib/In-Out/img";
	import JsonDown from "$lib/In-Out/json";
	import restore from "$lib/In-Out/restore";
	import * as Command from "$lib/components/ui/command/index.js";
	import { showCommands as open } from "$lib/stores/ShowCommands.js";
	import { Edges } from "$lib/stores/edgesStore";
	import { nodeTypes } from "$lib/stores/nodeTypes";
	import { Nodes } from "$lib/stores/nodesStore";
	import { useNodes, useSvelteFlow } from "@xyflow/svelte";
	import {
		Code2,
		CurlyBraces,
		Image,
		Blocks as Node,
	} from "lucide-svelte/icons";
	import { v4 as uuidv4 } from "uuid";

	const isTauri = "__TAURI_INTERNALS__" in window;
	const { screenToFlowPosition } = useSvelteFlow();
	const types = Object.keys($nodeTypes);
	const nodes = useNodes();

	const close = () => ($open = !$open);

	const addNode = (type) => {
		let { x, y } = screenToFlowPosition({
			x: window.innerWidth / 2,
			y: window.innerHeight / 2,
		});

		$Nodes[$Nodes.length] = {
			id: uuidv4(),
			position: { x, y },
			type: type,
			dragHandle: ".drag",
			data: {},
		};
		close();
	};

	async function load(e) {
		({ Nodes: $Nodes, Edges: $Edges } = await restore(e));
		close();
	}
</script>

<Command.Dialog
	bind:open={$open}
	loop
	class="backdrop-blur-md {(isTauri && 'bg-black/90') || 'bg-opacity-0'}"
>
	<Command.Input placeholder="Type a command or search..." />
	<Command.List>
		<Command.Empty>No results found.</Command.Empty>
		<Command.Group heading="Nodes">
			{#each types as type}
				{#if type != "StartNode"}
					<Command.Item onSelect={() => addNode(type)}>
						<Node class="mr-2 h-4 w-4" />
						<span>Add {type} </span>
					</Command.Item>
				{/if}
			{/each}
		</Command.Group>
		<Command.Separator />
		<Command.Group heading="Exports">
			<Command.Item
				onSelect={() => {
					imageDown($nodes);
					close();
				}}
			>
				<Image class="mr-2 h-4 w-4" />
				<span>Download Flow as SVG</span>
			</Command.Item>
			<Command.Item
				onSelect={() => {
					CodeDown($Nodes, $Edges);
					close();
				}}
			>
				<Code2 class="mr-2 h-4 w-4" />
				<span>Download Flow as Code</span>
			</Command.Item>
			<Command.Item
				onSelect={() => {
					JsonDown($Nodes, $Edges);
					close();
				}}
			>
				<CurlyBraces class="mr-2 h-4 w-4" />
				<span>Download Flow as Json</span>
			</Command.Item>
		</Command.Group>
		<Command.Separator />
		<Command.Group heading="Import">
			<Command.Item
				onSelect={() => {
					if (isTauri) {
						load(null);
					} else {
						document.querySelector("#json").click();
					}
				}}
			>
				<CurlyBraces class="mr-2 h-4 w-4" />
				<span>Upload Flow from Json</span>
			</Command.Item>
		</Command.Group>
	</Command.List>
</Command.Dialog>

<input type="file" class="hidden" id="json" accept=".json" on:change={load} />
