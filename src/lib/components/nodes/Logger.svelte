<script lang="ts">
	//@ts-nocheck
	import Glass from "$lib/components/Glass.svelte";
	import * as Card from "$lib/components/ui/card";
	import {
		Position,
		useHandleConnections,
		useNodesData,
	} from "@xyflow/svelte";
	import Handle from "./Handle.svelte";
	import Drag from "./Drag.svelte";
	import { flip } from "svelte/animate";
  import { ArrowRight } from "lucide-svelte";

	const connections = useHandleConnections({
		nodeId: $$props.id,
		type: "target",
	});

	$: nodesData = useNodesData(
		$connections.map((connection) => connection.source),
	);
</script>

<Drag>
	<Glass>
		<Card.Root>
			<Card.Header class="flex flex-col gap-2 text-xs font-jb">
				{#if $nodesData}
					{#each $nodesData as nodeData, i}
						{#if i > 0}
							<div class="h-0.5 rounded bg-muted-foreground/20" />
						{/if}
						<pre>{JSON.stringify(nodeData.data, null, 2)}</pre>
					{/each}
				{/if}
			</Card.Header>
		</Card.Root>
		<Handle type="target" position={Position.Bottom} class="left-1/2">
			
			<ArrowRight class="w-3.5 absolute -translate-y-1/2 top-1/2 left-0.5 -rotate-90" />
			
		</Handle>
	</Glass>
</Drag>
