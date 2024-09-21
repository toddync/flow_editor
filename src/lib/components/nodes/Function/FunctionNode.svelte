<script lang="ts">
	//@ts-nocheck
	import Handle from "$lib/components/nodes/Handle.svelte";
	import * as Card from "$lib/components/ui/card";
	import Input from "$lib/components/ui/input/input.svelte";
	import { NodeResizeControl, Position, useSvelteFlow } from "@xyflow/svelte";
	import { ArrowRight, Expand, Play } from "lucide-svelte";
	import { onMount } from "svelte";

	const iconClass =
		"w-3.5 absolute translate-x-1/2 right-1/2 -translate-y-1/2 top-1/2";

	$: Container = {
		W: $$props.width || 300,
	};

	const { updateNodeData } = useSvelteFlow();
	const update = (x) => updateNodeData($$props.id, x);

	onMount(() => {
		update({
			name: $$props.data.name || "",
			params: $$props.data.params || "",
		});
	});
</script>

<Card.Root
	class="bg-black/10 backdrop-blur-sm -z-10 -left-6 -bottom-6 drag"
	style="min-width: {Container.W}px;"
>
	<Card.Header>
		<Card.Title>Function Declaration</Card.Title>
		<Card.Description class="h-full">
			<pre lang="js" class="h-fit mt-2"><code
					><r class="text-orange-500">function</r><r
						class="text-orange-700"> name</r
					>(<r class="text-orange-700">params</r><r>)&lbrace;</r
					></code
				>
	<code class="text-lg text-lime-400">...</code>
&rbrace;
			</pre>
		</Card.Description>
	</Card.Header>
	<Card.Content class="grid gap-2 -mt-10">
		<Input
			placeholder="Name..."
			class="bg-transparent z-50"
			value={$$props.data?.name}
			on:input={(e) => update({ name: e.target.value })}
		/>
		<Input
			placeholder="Params..."
			class="bg-transparent z-50 mb-5"
			value={$$props.data?.params}
			on:input={(e) => update({ params: e.target.value })}
		/>

		<NodeResizeControl
			minWidth={300}
			minHeight={250}
			class="border-none bg-transparent"
		>
			<Expand class="stroke-slate-100 -ml-6 -mt-7 size-4" />
		</NodeResizeControl>
	</Card.Content>

	<Handle
		type="target"
		position={Position.Left}
		class="top-1/2 left-0"
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
