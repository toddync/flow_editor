<script lang="ts">
	//@ts-nocheck
	import { Sortable, Swap } from "sortablejs/modular/sortable.core.esm";
	Sortable.mount(new Swap());

	import "./assets/altFlow.css";
	import {
		SvelteFlow,
		Controls,
		Background,
		BackgroundVariant,
		SvelteFlowProvider,
		ConnectionLineType
	} from "@xyflow/svelte";
	import Commands from "$lib/components/Commands.svelte";
	import { Edges } from "$lib/stores/edgesStore";
	import { Nodes } from "$lib/stores/nodesStore";
	import { nodeTypes as nt } from "$lib/stores/nodeTypes";
	import Menu from "$lib/components/Menu.svelte";

	let nodeTypes = {};

	$: nodeTypes = $nt;
</script>

<svelte:head>
	<title>Flow Editor</title>
</svelte:head>

<SvelteFlowProvider>
	<div class="h-screen">
		<SvelteFlow
			colorMode="dark"
			fitView
			connectionLineType={ConnectionLineType.SmoothStep}
			{nodeTypes}
			nodes={Nodes}
			edges={Edges}
			defaultEdgeOptions={{
				type: "smoothstep"
				// animated: true
			}}
		>
			<Controls />
			<Background variant={BackgroundVariant.Cross} size={6} gap={50} />
		</SvelteFlow>
	</div>

	<Commands />
	<Menu />
</SvelteFlowProvider>
