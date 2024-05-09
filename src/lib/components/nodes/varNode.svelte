<script lang="ts">
	//@ts-nocheck
	import { Handle, Position, useSvelteFlow } from "@xyflow/svelte";
	import Glass from "$lib/components/Glass.svelte";
	import * as Card from "$lib/components/ui/card";
	import * as Hover from "$lib/components/ui/hover-card";
	import { Input } from "$lib/components/ui/input";
	import { Textarea } from "$lib/components/ui/textarea";
	import { InfoIcon } from "lucide-svelte";
	import { onMount } from "svelte";

	const updateNodeData = useSvelteFlow().updateNodeData;
	const update = (x) => updateNodeData($$props.id, x);

	onMount(() => update({ name: "", value: "" }));
	let isConnectable = true;
</script>

<Glass class="max-w-50">
	<Card.Root>
		<Card.Header display="flex gap-5">
			<Card.Title>
				Var declaration
				<Hover.Root class="bg-white">
					<Hover.Trigger>
						<InfoIcon class="size-2.5 inline my-auto" />
					</Hover.Trigger>
					<Hover.Content class="bg-black select-none grid gap-2">
						<p>
							Follow all of the rules for variable declaration
							within JavaScript
						</p>
						<p>The value will be runned trough a json parse</p>
					</Hover.Content>
				</Hover.Root>
			</Card.Title>
			<Card.Description>let x = y;</Card.Description>
		</Card.Header>
		<Card.Content class="space-y-4">
			<Input
				class="border bg-transparent w-full"
				placeholder="Name..."
				value={$$props.data.name || ""}
				on:input={(e) => update({ name: e.target.value })}
			/>

			<Textarea
				draggable={false}
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

<Handle
	id="b"
	type="source"
	position={Position.Bottom}
	class="w-8 h-3 rounded-md bg-stone-900"
	{isConnectable}
/>
