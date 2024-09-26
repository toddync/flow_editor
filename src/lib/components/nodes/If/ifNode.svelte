<script lang="ts">
	//@ts-nocheck
	import Glass from "$lib/components/Glass.svelte";
	import Renderer from "$lib/components/blocks/Renderer.svelte";
	import Handle from "$lib/components/nodes/Handle.svelte";
	import * as Card from "$lib/components/ui/card";
	import * as Accordion from "$lib/components/ui/accordion/index.js";
	import Input from "$lib/components/ui/input/input.svelte";
	import {
		Position,
		useHandleConnections,
		useSvelteFlow,
	} from "@xyflow/svelte";
	import { ArrowRight, CheckIcon, XIcon } from "lucide-svelte";
	import { onMount } from "svelte";

	const iconClass =
		"w-3.5 absolute translate-x-1/2 right-1/2 -translate-y-1/2 top-1/2";

	const updateNodeData = useSvelteFlow().updateNodeData;
	const update = (x) => updateNodeData($$props.id, x);

	onMount(() => {
		update({ condition: $$props.data.condition || "" });
	});

	const InCon = useHandleConnections({
		nodeId: $$props.id,
		type: "target",
		id: "prev",
	});
</script>

<div class="m-0 p-0 relative drag">
	<Glass>
		<Card.Root class="min-w-80">
			<Card.Header>
				<Card.Title>If/Else conditional</Card.Title>
				<Card.Description>
					<pre lang="js" class="h-fit mt-2">
<code
							><r class="text-orange-500">if</r>(<r
								class="text-orange-700">condition</r
							>)&lbrace;</code
						>
	<code><CheckIcon class="ml-5 w-2.5 h-2.5 text-lime-400 -my-4" /></code>
<code>&rbrace;<r class="text-orange-500">else</r>&lbrace;</code>
	<code><XIcon class="ml-5 w-2.5 h-2.5 text-red-400 -my-4" /></code>
<code>&rbrace;</code>
	</pre>
				</Card.Description>
			</Card.Header>
			<Card.Content class="-mt-8">
				<Accordion.Root class="w-full">
					<Accordion.Item value="item-1">
						<Accordion.Trigger class="text-orange-700">
							condition
						</Accordion.Trigger>
						<Accordion.Content class="m-2">
							<Renderer />
						</Accordion.Content>
					</Accordion.Item>
				</Accordion.Root>
				<Input
					placeholder="Condition..."
					class="bg-transparent z-50 hidden"
					value={$$props.data?.condition}
					on:input={(e) => update({ condition: e.target.value })}
				/>
			</Card.Content>
		</Card.Root>
	</Glass>
</div>
<Handle
	id="prev"
	type="target"
	position={Position.Left}
	class="top-1/2 left-2.5"
	handleClass={$InCon.length == 0 && "Out"}
>
	<ArrowRight
		class="w-3.5 absolute -translate-y-1/2 -translate-x-1/2 top-1/2 left-1/2"
	/>
</Handle>
<Handle
	id="true"
	type="source"
	class="top-1/4 -right-5 text-lime-400"
	position={Position.Right}
>
	<CheckIcon class={iconClass} />
</Handle>
<Handle
	id="false"
	type="source"
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
