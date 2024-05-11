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
		SvelteFlowProvider
	} from "@xyflow/svelte";
	import Commands from "$lib/components/Commands.svelte";
	import { Edges } from "$lib/stores/edgesStore";
	import { Nodes } from "$lib/stores/nodesStore";
	import { nodeTypes as nt } from "$lib/stores/nodeTypes";

	let nodeTypes = {};

	$: nodeTypes = $nt;
</script>

<SvelteFlowProvider>
	<div class="h-screen">
		<SvelteFlow
			fitView
			colorMode="dark"
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
</SvelteFlowProvider>
