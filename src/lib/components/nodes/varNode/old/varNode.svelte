<script lang="ts">
	//@ts-nocheck
	import Glass from "$lib/components/Glass.svelte";
	import Handle from "$lib/components/nodes/Handle.svelte";
	import * as Card from "$lib/components/ui/card";
	import {
		Position,
		useSvelteFlow,
		useUpdateNodeInternals,
	} from "@xyflow/svelte";
	import { ArrowRight } from "lucide-svelte";
	import { onMount } from "svelte";
	import Drag from "../../Drag.svelte";
	import VarTable from "./VarTable.svelte";

	const updateInternals = useUpdateNodeInternals();
	const updateNodeData = useSvelteFlow().updateNodeData;
	const update = (x) =>
		(updateNodeData($$props.id, x) || 1) && updateInternals($$props.id);

	let Rows = $$props.data.vars || [
		{ id: 0, name: "", value: "", type: "let" },
	];

	onMount(() => {
		update({ vars: Rows });
	});

	function onDrop(newItems) {
		Rows = newItems;
	}
</script>

<Drag>
	<Glass class="max-w-m">
		<Card.Root class="border-2 ">
			<Card.Header display="flex gap-5">
				<Card.Title class="w-full flex h-4"
					>Variable declaration</Card.Title
				>
				<Card.Description>
					<p>
						<r class="text-orange-400">let</r> x
						<r class="text-orange-700">=</r> 0;
					</p>
					<p>
						<r class="text-orange-400">var</r> y
						<r class="text-orange-700">=</r> 1;
					</p>
					<p>
						<r class="text-orange-400">const</r> z
						<r class="text-orange-700">=</r> 2;
					</p>
				</Card.Description>
			</Card.Header>
			<Card.Content class="space-y-4">
				<VarTable
					{Rows}
					{onDrop}
					{update}
					{updateInternals}
					id={$$props.id}
				/>
			</Card.Content>
			<Handle
				id="prev"
				type="target"
				position={Position.Left}
				class="top-1/2 left-2.5"
			>
				<ArrowRight
					class="w-3.5 absolute -translate-y-1/2 top-1/2 -left-2"
				/>
			</Handle>

			<Handle
				id="next"
				type="source"
				position={Position.Right}
				class="top-1/2 -right-5"
			>
				<ArrowRight
					class="w-3.5 absolute -translate-y-1/2 top-1/2 left-0.5"
				/>
			</Handle>
		</Card.Root>
	</Glass>
</Drag>
