<script lang="ts">
	//@ts-nocheck
	import { Sortable, Swap } from "sortablejs/modular/sortable.core.esm";
	Sortable.mount(new Swap());

	import "./assets/altFlow.css";
	import Commands from "$lib/components/Commands.svelte";
	import { Edges } from "$lib/stores/edgesStore";
	import { Nodes } from "$lib/stores/nodesStore";
	import { nodeTypes } from "$lib/stores/nodeTypes";
	import Menu from "$lib/components/Menu.svelte";
	import SmoothStep from "$lib/components/edges/SmoothStep.svelte";
	import {
		SvelteFlow,
		Controls,
		Background,
		BackgroundVariant,
		SvelteFlowProvider,
		ConnectionLineType,
	} from "@xyflow/svelte";
	import Bindings from "$lib/components/Bindings.svelte";
</script>

<svelte:head>
	<title>Flow Editor</title>
</svelte:head>

<SvelteFlowProvider>
	<div class="h-svh">
		<!-- connectionLineType={ConnectionLineType.SmoothStep} -->
		<SvelteFlow
			colorMode="dark"
			fitView
			nodeTypes={$nodeTypes}
			edgeTypes={{
				smoothstep: SmoothStep,
			}}
			nodes={Nodes}
			edges={Edges}
			defaultEdgeOptions={{
				type: "smoothstep",
			}}
		>
			<!-- <Controls /> -->
			<Background variant={BackgroundVariant.Lines} gap={50} />
		</SvelteFlow>
	</div>

	<Bindings />
	<Commands />
	<Menu />
</SvelteFlowProvider>
