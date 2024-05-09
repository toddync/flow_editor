<script lang="ts">
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

	$: console.log(nodeTypes);
</script>

<SvelteFlowProvider>
	<div class="h-screen">
		<SvelteFlow
			nodes={Nodes}
			edges={Edges}
			{nodeTypes}
			fitView
			colorMode="dark"
			on:nodeclick={(event) => {
				// console.log("on node click", event.detail.node)
			}}
		>
			<Controls />
			<Background variant={BackgroundVariant.Cross} size={6} gap={50} />
		</SvelteFlow>
	</div>

	<Commands />
</SvelteFlowProvider>
