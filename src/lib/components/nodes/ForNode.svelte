<script lang="ts">
	//@ts-nocheck
	import Glass from "$lib/components/Glass.svelte";
	import Handle from "$lib/components/nodes/Handle.svelte";
	import * as Card from "$lib/components/ui/card";
	import Input from "$lib/components/ui/input/input.svelte";
	import {
		Position,
		useHandleConnections,
		useNodesData,
		useSvelteFlow
	} from "@xyflow/svelte";
	import { ArrowRight, CheckIcon, XIcon } from "lucide-svelte";
	import { onMount } from "svelte";

	const iconClass =
		"w-3.5 absolute translate-x-1/2 right-1/2 -translate-y-1/2 top-1/2";

	const updateNodeData = useSvelteFlow().updateNodeData;
	const update = (x) => updateNodeData($$props.id, x);

	onMount(() => {
		update({ condition: "" });
	});

	export let id;
	const connections = useHandleConnections({
		nodeId: id,
		type: "source"
	});
	$: nodesData = useNodesData(
		$connections.map((connection) => connection.source)
	);
	$: console.log($nodesData);
	console.log($connections);
</script>

<div class="m-0 p-0 relative">
	<!-- <Drag class="z-10" /> -->
	<Glass>
		<Card.Root>
			<Card.Header>
				<Card.Title>For Loop</Card.Title>
				<Card.Description>
					<pre lang="js" class="h-fit mt-2">
<code
							><r class="text-orange-500">for</r>
                            <r class="text-orange-700">condition</r>
                            &lbrace;</code
						>
	<code><CheckIcon class="ml-5 w-2.5 h-2.5 text-lime-400 -my-4" /></code>
&rbrace;
	</pre>
				</Card.Description>
			</Card.Header>
			<Card.Content class="-mt-8">
				<Input
					placeholder="Condition..."
					class="bg-transparent z-50"
					value={$$props.data?.condition}
					on:input={(e) => update({ condition: e.target.value })}
				/>
			</Card.Content>
		</Card.Root>
	</Glass>

	<Handle
		type="target"
		position={Position.Left}
		class="top-1/2"
		handleClass="left-1/2"
	>
		<ArrowRight class={iconClass} />
	</Handle>

	<Handle
		type="source"
		id="true"
		class="top-1/4 -right-5 text-lime-400"
		position={Position.Right}
	>
		<CheckIcon class={iconClass} />
	</Handle>

	<Handle
		type="source"
		id="false"
		class="top-2/4 -right-5 text-red-400"
		position={Position.Right}
	>
		<XIcon class={iconClass} />
	</Handle>

	<Handle
		id="next"
		type="source"
		class="top-3/4 -right-5"
		position={Position.Right}
	>
		<ArrowRight class={iconClass} />
	</Handle>
</div>
