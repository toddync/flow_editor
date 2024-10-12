<script lang="ts">
	//@ts-nocheck
	import { Nodes } from "$lib/stores/nodesStore";
	import { Position } from "@xyflow/svelte";
	import { ArrowRight, Play } from "lucide-svelte";
	import { onMount } from "svelte";
	import Glass from "../Glass.svelte";
	import * as Card from "../ui/card";
	import Handle from "./Handle.svelte";

	onMount(() => () => {
		$Nodes.push({
			type: "StartNode",
			id: "StartNode",
			data: {},
			position: {
				x: 0,
				y: 0,
			},
		});
		$Nodes = $Nodes;
	});
</script>

<Glass>
	<Card.Root>
		<Card.Header>
			<Card.Title>
				<Play class="text-lime-400 size-full" />
			</Card.Title>
		</Card.Header>
	</Card.Root>
	<Handle
		id="next"
		position={Position.Right}
		class="-right-5 top-1/2 -translate-x-1/2 -translate-y-1/2"
	>
		<ArrowRight
			class="w-3.5 absolute translate-x-1/2 right-1/2 -translate-y-1/2 top-1/2"
		/>
	</Handle>
</Glass>
