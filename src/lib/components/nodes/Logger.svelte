<script lang="ts">
	//@ts-nocheck
	import {
		Handle,
		Position,
		useHandleConnections,
		useNodesData
	} from "@xyflow/svelte";
	import * as Card from "$lib/components/ui/card";
	import Node from "$lib/components/Glass.svelte";

	export let id;

	const connections = useHandleConnections({
		nodeId: id,
		type: "target"
	});

	$: nodesData = useNodesData(
		$connections.map((connection) => connection.source)
	);

	console.log($connections);
</script>

<Node class="max-w-">
	<Handle type="target" position={Position.Top} />
	<Card.Root>
		<Card.Header class="grid gap-1">
			{#if $nodesData}
				{#each $nodesData as nodeData}
					<Card.Description>
						<table class="border mx-auto">
							<thead class="*:border">
								<th class="px-2 py-1">key</th>
								<th class="px-2 py-1">value</th>
							</thead>
							<tbody>
								{#each Object.keys(nodeData.data) as key}
									<tr class="border *:border">
										<td class="px-2 py-1">{key}</td>
										<td
											class="px-2 py-1 break-words max-w-96"
											>{nodeData.data[key]}</td
										>
									</tr>
								{/each}
							</tbody>
						</table>
					</Card.Description>
				{/each}
			{/if}
		</Card.Header>
	</Card.Root>
</Node>
