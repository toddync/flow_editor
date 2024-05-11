<script lang="ts">
	//@ts-nocheck
	import Handle from "$lib/components/nodes/Handle.svelte";
	import { Position, useSvelteFlow } from "@xyflow/svelte";

	import Glass from "$lib/components/Glass.svelte";
	import * as Card from "$lib/components/ui/card";
	import { ArrowRight } from "lucide-svelte";
	import { writable } from "svelte/store";
	import VarTable from "../VarTable.svelte";
	import Drag from "./Drag.svelte";
	import { onMount } from "svelte";

	const updateNodeData = useSvelteFlow().updateNodeData;
	const update = (x) => updateNodeData($$props.id, x);

	let Rows = writable([]);

	onMount(() => {
		$Rows = [
			{
				type: "const",
				name: "x",
				"=": "=",
				value: "{x: 1, y: 3}"
			},
			{
				type: "const",
				name: "k",
				"=": "=",
				value: "{x: 1, y: 3}"
			},
			{
				type: "const",
				name: "l",
				"=": "=",
				value: "{x: 1, y: 3}"
			},
			{
				type: "const",
				name: "o",
				"=": "=",
				value: "{x: 1, y: 3}"
			}
		];
	});

	$: console.table($$props.data.vars);
</script>

<Drag />
<Glass class="max-w-50">
	<Card.Root class="border-2">
		<Card.Header display="flex gap-5">
			<Card.Title class="w-full flex h-4">Variable update</Card.Title>
			<Card.Description>
				x <r class="text-orange-700">=</r> y;
			</Card.Description>
		</Card.Header>
		<Card.Content class="space-y-4">
			<VarTable bind:Rows {update} />
		</Card.Content>
	</Card.Root>
</Glass>

<Handle id="a" type="target" position={Position.Bottom} class="top-1/2 left-0">
	<ArrowRight class="w-3.5 absolute -translate-y-1/2 top-1/2 left-0.5" />
</Handle>
<Handle
	id="next"
	type="source"
	position={Position.Bottom}
	class="top-1/2 -right-5"
>
	<ArrowRight class="w-3.5 absolute -translate-y-1/2 top-1/2 left-0.5" />
</Handle>
