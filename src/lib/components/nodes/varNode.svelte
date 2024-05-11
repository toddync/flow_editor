<script lang="ts">
	//@ts-nocheck
	import Handle from "$lib/components/nodes/Handle.svelte";
	import { Position, useSvelteFlow } from "@xyflow/svelte";

	import Glass from "$lib/components/Glass.svelte";
	import * as Card from "$lib/components/ui/card";
	import * as ContextMenu from "$lib/components/ui/context-menu";
	import * as Hover from "$lib/components/ui/hover-card";
	import { Input } from "$lib/components/ui/input";
	import { Textarea } from "$lib/components/ui/textarea";
	import { ArrowDownIcon, InfoIcon } from "lucide-svelte";
	import { onMount } from "svelte";
	import Drag from "./Drag.svelte";

	const updateNodeData = useSvelteFlow().updateNodeData;
	const update = (x) => updateNodeData($$props.id, x);

	onMount(() => update({ name: "", value: "", type: "let" }));
</script>

<Drag />

<ContextMenu.Root>
	<ContextMenu.Trigger class="cursor-default">
		<Glass class="max-w-50">
			<Card.Root class="border-2">
				<Card.Header display="flex gap-5">
					<Card.Title class="w-full flex h-4">
						<p class="space-x-2 mr-3">
							Variable declaration
							<Hover.Root>
								<Hover.Trigger>
									<InfoIcon class="size-2.5 inline mt-0.5" />
								</Hover.Trigger>

								<Hover.Content
									class="bg-opacity-10 backdrop-blur-sm"
								>
									The value will be runned trough a json parse
								</Hover.Content>
							</Hover.Root>
						</p>
					</Card.Title>
					<Card.Description
						><r class="text-orange-500">{$$props.data.type}</r> x
						<r class="text-orange-700">=</r> y;</Card.Description
					>
				</Card.Header>
				<Card.Content class="space-y-4">
					<Input
						class="border bg-transparent w-full"
						placeholder="Name..."
						value={$$props.data.name || ""}
						on:input={(e) => update({ name: e.target.value })}
					/>

					<Textarea
						class="border bg-transparent w-full h-fit"
						placeholder="Variable value..."
						value={$$props.data.value || ""}
						on:input={(e) =>
							update({
								value: e.target.value
							})}
					/>
				</Card.Content>
			</Card.Root>
		</Glass>
	</ContextMenu.Trigger>

	<ContextMenu.Content class="bg-opacity-10 backdrop-blur-sm">
		<ContextMenu.Group class="bg-transparent">
			<ContextMenu.Label>Type</ContextMenu.Label>
			<ContextMenu.Separator class="w-[95%] mx-auto mt-2 h-[2px]" />
			<ContextMenu.RadioGroup
				bind:value={$$props.data.type}
				onValueChange={(e) => update({ type: e })}
			>
				<ContextMenu.RadioItem value="let">let</ContextMenu.RadioItem>
				<ContextMenu.RadioItem value="var">var</ContextMenu.RadioItem>
				<ContextMenu.RadioItem value="const"
					>const</ContextMenu.RadioItem
				>
			</ContextMenu.RadioGroup>
		</ContextMenu.Group>
	</ContextMenu.Content>
</ContextMenu.Root>

<Handle
	id="b"
	type="source"
	position={Position.Bottom}
	class="-bottom-5 left-1/2"
>
	<ArrowDownIcon class="w-3.5 absolute -translate-y-1/2 top-1/2 left-0.5" />
</Handle>
