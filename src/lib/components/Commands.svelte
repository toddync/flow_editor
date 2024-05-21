<script lang="ts">
	//@ts-nocheck
	import * as Command from "$lib/components/ui/command/index.js";
	import { showCommands as open } from "$lib/stores/ShowCommands.js";
	import {
		Code2,
		CurlyBraces,
		Image,
		Blocks as Node,
	} from "lucide-svelte/icons";
	import { onMount } from "svelte";

	import { Edges } from "$lib/stores/edgesStore";
	import { nodeTypes } from "$lib/stores/nodeTypes";
	import { Nodes } from "$lib/stores/nodesStore";
	import { Transpile } from "$lib/transpiler";
	import {
		getNodesBounds,
		getViewportForBounds,
		useNodes,
		useSvelteFlow,
	} from "@xyflow/svelte";
	import { toSvg } from "html-to-image";

	const { screenToFlowPosition } = useSvelteFlow();
	const types = Object.keys($nodeTypes);

	const close = () => ($open = !$open);

	const addNode = (type) => {
		let { x, y } = screenToFlowPosition({
			x: window.innerWidth / 2,
			y: window.innerHeight / 2,
		});

		$Nodes.push({
			id: crypto.randomUUID(),
			position: { x, y },
			type: type,
			dragHandle: type.toLowerCase().includes("var") && ".drag",
			data: {},
		});

		$Nodes = $Nodes;
		close();
	};

	const nodes = useNodes();
	export function ImageDown() {
		const scale = 2;
		let imageWidth = 1024 * scale;
		let imageHeight = 768 * scale;

		const nodesBounds = getNodesBounds($nodes);
		const viewport = getViewportForBounds(
			nodesBounds,
			imageWidth,
			imageHeight,
			0.5,
			2.0,
			0.9,
		);

		const viewportDomNode = document.querySelector(
			".svelte-flow__viewport",
		)!;

		if (viewport) {
			toSvg(viewportDomNode, {
				width: imageWidth,
				height: imageHeight,
				style: {
					width: `${imageWidth}px`,
					height: `${imageHeight}px`,
					position: "absolute",
					transform: `translate(${viewport.x}px, ${viewport.y}px) scale(${viewport.zoom})`,
					// "background-image": `url("http://localhost:5173/back.png")`,
				},
			}).then((dataUrl) => {
				download(dataUrl, "svelte-flow.svg");
			});
		}
	}

	function CodeDown() {
		download(
			"data:text/plain;charset=utf-8," +
				encodeURIComponent(Transpile($Nodes, $Edges)),
			"svelte-flow.js",
		);
	}

	function JsonDown() {
		download(
			"data:text/plain;charset=utf-8," +
				encodeURIComponent(
					JSON.stringify({ Nodes: $Nodes, Edges: $Edges }, null, 2),
				),
			"svelte-flow.json",
		);
	}

	function restore(e) {
		const reader = new FileReader();
		reader.readAsText(e.target.files[0]);
		reader.onload = function () {
			let data = JSON.parse(reader.result);

			$Nodes = data.Nodes;
			$Edges = data.Edges;
			close();
		};
	}

	function download(ref, name) {
		let _ = document.createElement("a");
		_.setAttribute("href", ref);
		_.setAttribute("download", name);
		_.click();
		close();
	}

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
			<Command.Item onSelect={ImageDown}>
				<Image class="mr-2 h-4 w-4" />
				<span>Download Flow as SVG</span>
			</Command.Item>
			<Command.Item onSelect={CodeDown}>
				<Code2 class="mr-2 h-4 w-4" />
				<span>Download Flow as Code</span>
			</Command.Item>
			<Command.Item onSelect={JsonDown}>
				<CurlyBraces class="mr-2 h-4 w-4" />
				<span>Download Flow as Json</span>
			</Command.Item>
		</Command.Group>
		<Command.Separator />
		<Command.Group heading="Import">
			<Command.Item
				onSelect={() => document.querySelector("#json").click()}
			>
				<CurlyBraces class="mr-2 h-4 w-4" />
				<span>Upload Flow from Json</span>
			</Command.Item>
		</Command.Group>
	</Command.List>
</Command.Dialog>

<input
	type="file"
	class="sr-only"
	id="json"
	accept=".json"
	on:change={restore}
/>
