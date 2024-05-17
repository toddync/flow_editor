<script lang="ts">
	//@ts-nocheck
	import Glass from "$lib/components/Glass.svelte";
	import Handle from "$lib/components/nodes/Handle.svelte";
	import * as Card from "$lib/components/ui/card";
	import * as ContextMenu from "$lib/components/ui/context-menu";
	import { nodeTypes } from "$lib/stores/nodeTypes";
	import { Nodes } from "$lib/stores/nodesStore";
	import { NodeResizeControl, Position, useSvelteFlow } from "@xyflow/svelte";
	import { ArrowRight, Expand } from "lucide-svelte";
	import Node from "lucide-svelte/icons/blocks";
	import { onMount } from "svelte";

	const iconClass =
		"w-3.5 absolute translate-x-1/2 right-1/2 -translate-y-1/2 top-1/2";

	const updateNodeData = useSvelteFlow().updateNodeData;
	const update = (x) => updateNodeData($$props.id, x);

	const types = Object.keys($nodeTypes);
	const addNode = (t) => {
		$Nodes.push({
			id: crypto.randomUUID(),
			data: {},
			type: t,
			position: {
				x: $$props.positionAbsoluteX,
				y: $$props.positionAbsoluteY
			},
			parentId: $$props.id,
			extent: "parent"
		});
		$Nodes = $Nodes;
	};

	onMount(() => {
		update({ condition: "" });
	});
</script>

<ContextMenu.Root class="h-full">
	<ContextMenu.Trigger class="h-full">
		<div class="m-0 p-0 relative h-full min-w-[300px]">
			<Glass class="min-h-[200px] h-full">
				<Card.Root class="min-h-[200px] h-full">
					<Card.Header>
						<Card.Title>For Loop</Card.Title>
						<Card.Description class="h-full">
							<!-- <pre lang="js" class="h-fit mt-2">
								<code
									><r class="text-orange-500">for</r>(<r
										class="text-orange-700"> 1</r
									>;<r class="text-orange-700"> 2</r>;<r
										class="text-orange-700"> 3</r
									>)&lbrace;</code
								>
			<code><CheckIcon class="ml-5 w-2.5 h-2.5 text-lime-400 -my-4" /></code>
&rbrace;
			</pre> -->
						</Card.Description>
					</Card.Header>
					<Card.Content class="-mt-8">
						<!-- <Input
							placeholder="Condition..."
							class="bg-transparent z-50"
							value={$$props.data?.condition}
							on:input={(e) => update({ condition: e.target.value })}
		e				/> -->
					</Card.Content>
				</Card.Root>
			</Glass>
		</div>
	</ContextMenu.Trigger>
	<ContextMenu.Content class="bg-opacity-10 backdrop-blur-sm">
		<ContextMenu.Group name>
			<ContextMenu.Label>Add</ContextMenu.Label>
			{#each types as type}
				<ContextMenu.Item on:click={() => addNode(type)}>
					<Node class="mr-2 h-4 w-4" />
					<span>{type} </span>
				</ContextMenu.Item>
			{/each}
		</ContextMenu.Group>
	</ContextMenu.Content>
</ContextMenu.Root>
<Handle
	type="target"
	position={Position.Left}
	class="top-1/2"
	handleClass="left-1/2"
>
	<ArrowRight class={iconClass} />
</Handle>

<Handle
	id="next"
	type="source"
	class="top-1/2 -right-5"
	position={Position.Right}
>
	<ArrowRight class={iconClass} />
</Handle>

<NodeResizeControl
	minWidth={300}
	minHeight={200}
	style="background: transparent; border: none;"
>
	<Expand class="stroke-slate-100 -ml-6 -mt-7 size-4" />
</NodeResizeControl>
