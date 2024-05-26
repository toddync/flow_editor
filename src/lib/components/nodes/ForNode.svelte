<script lang="ts">
	//@ts-nocheck
	import Handle from "$lib/components/nodes/Handle.svelte";
	import * as Card from "$lib/components/ui/card";
	import * as ContextMenu from "$lib/components/ui/context-menu";
	import Input from "$lib/components/ui/input/input.svelte";
	import { nodeTypes } from "$lib/stores/nodeTypes";
	import { Nodes } from "$lib/stores/nodesStore";
	import { NodeResizeControl, Position, useSvelteFlow } from "@xyflow/svelte";
	import { ArrowRight, Expand, Play } from "lucide-svelte";
	import Node from "lucide-svelte/icons/blocks";
	import { onMount } from "svelte";

	const sub = $$props.data.sub == true;

	const iconClass =
		"w-3.5 absolute translate-x-1/2 right-1/2 -translate-y-1/2 top-1/2";

	$: Container = {
		W: $$props.width || 400,
	};

	const { flowToScreenPosition, updateNodeData } = useSvelteFlow();
	const update = (x) => updateNodeData($$props.id, x);

	const types = Object.keys($nodeTypes);
	const addNode = (t) => {
		$Nodes.push({
			data: { sub: true },
			extent: "parent",
			position: flowToScreenPosition({
				x: $$props.positionAbsoluteX,
				y: $$props.positionAbsoluteY,
			}),
			type: t,
			id: `${$$props.id}---${crypto.randomUUID()}`,
			parentId: $$props.id,
		});
		$Nodes = $Nodes;
	};

	onMount(() => {
		update({
			initialization: $$props.data.initialization || "",
			condition: $$props.data.condition || "",
			refresh: $$props.data.refresh || "",
		});
	});
</script>

<Card.Root
	class="bg-black/10 backdrop-blur-sm -z-10 -left-6 -bottom-6 drag"
	style=" width: {Container.W}px;"
>
	<Card.Header>
		<Card.Title>For Loop</Card.Title>
		<Card.Description class="h-full">
			<pre lang="js" class="h-fit mt-2"><code
					><r class="text-orange-500">for</r>(<r
						class="text-orange-700"> initialization</r
					>;<r class="text-orange-700"> condition</r>;<r
						class="text-orange-700"> refresh</r
					>)&lbrace;</code
				>
	<code class="text-lg text-lime-400">...</code>
&rbrace;
			</pre>
		</Card.Description>
	</Card.Header>
	<Card.Content class="grid gap-2 -mt-10">
		<Input
			placeholder="Initialization..."
			class="bg-transparent z-50"
			value={$$props.data?.initialization}
			on:input={(e) => update({ initialization: e.target.value })}
		/>
		<Input
			placeholder="Condition..."
			class="bg-transparent z-50"
			value={$$props.data?.condition}
			on:input={(e) => update({ condition: e.target.value })}
		/>
		<Input
			placeholder="Refresh..."
			class="bg-transparent z-50 mb-5"
			value={$$props.data?.refresh}
			on:input={(e) => update({ refresh: e.target.value })}
		/>
		<NodeResizeControl
			minWidth={400}
			maxHeight={250}
			class="border-none bg-transparent"
		>
			<Expand class="stroke-slate-100 -ml-6 -mt-7 size-4" />
		</NodeResizeControl>
	</Card.Content>

	<Handle
		type="target"
		position={Position.Left}
		class="top-1/2 -left-0"
		handleClass="left-1/2"
	>
		<ArrowRight class={iconClass} />
	</Handle>

	<Handle
		type="source"
		id="start"
		position={Position.Bottom}
		class="left-1/2 -bottom-5"
	>
		<Play class="{iconClass} text-lime-400" />
	</Handle>

	<Handle
		id="next"
		type="source"
		class="top-1/2 -right-5"
		position={Position.Right}
	>
		<ArrowRight class={iconClass} />
	</Handle>
</Card.Root>
