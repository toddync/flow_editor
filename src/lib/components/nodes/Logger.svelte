<script lang="ts">
	//@ts-nocheck
	import Glass from "$lib/components/Glass.svelte";
	import * as Card from "$lib/components/ui/card";
	import {
		Position,
		useHandleConnections,
		useNodesData
	} from "@xyflow/svelte";
	import Handle from "./Handle.svelte";

	const connections = useHandleConnections({
		nodeId: $$props.id,
		type: "target"
	});

	$: nodesData = useNodesData(
		$connections.map((connection) => connection.source)
	);
</script>

<Glass>
	<Handle type="target" position={Position.Top} class="left-1/2" />
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
											class="px-2 py-1 break-words whitespace-pre-wrap max-w-96"
											>{JSON.stringify(
												nodeData.data[key],
												null,
												4
											)}</td
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
</Glass>
