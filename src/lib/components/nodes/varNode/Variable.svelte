<script lang="ts">
	//@ts-nocheck
	import Glass from "$lib/components/Glass.svelte";
	import Handle from "$lib/components/nodes/Handle.svelte";
	import * as Card from "$lib/components/ui/card";
	import * as ContextMenu from "$lib/components/ui/context-menu/index.js";
	import { Input } from "$lib/components/ui/input";
	import { Types } from "$lib/stores/typesStore";
	import {
		Position,
		useHandleConnections,
		useNodesData,
		useSvelteFlow,
		useUpdateNodeInternals,
	} from "@xyflow/svelte";
	import { ArrowRight, Equal } from "lucide-svelte";
	import { writable } from "svelte/store";
	import Drag from "../Drag.svelte";

	const data = writable({
		value: 0,
		name: "x",
		type: "int",
		const: false,
	});

	const updateInternals = useUpdateNodeInternals();
	const updateNodeData = useSvelteFlow().updateNodeData;

	$: update($data);
	const update = (x) =>
		(updateNodeData($$props.id, x) || 1) && updateInternals($$props.id);

	const InCon = useHandleConnections({
		nodeId: $$props.id,
		type: "target",
		id: "prev",
	});
</script>

<Drag>
	<ContextMenu.Root>
		<ContextMenu.Trigger>
			<Glass class="max-w-m">
				<Card.Root class="rounded-lg">
					<Card.Header display="flex ">
						<Card.Content class="flex gap-2 p-0 *:my-auto">
							<span class="text-lg mx-auto">
								{$data.name}
							</span>
							<span
								class="text-xs text-muted-foreground capitalize"
							>
								: {$data.type}
							</span>
							<Equal class="size-3" />
							<span class="text-lg">
								{$data.value}
							</span>
						</Card.Content>
					</Card.Header>
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
						id="next"
						type="source"
						position={Position.Right}
						class="top-1/2 -right-5 -translate-x-1/2"
					>
						<ArrowRight
							class="w-3.5 absolute -translate-y-1/2 top-1/2 left-0.5"
						/>
					</Handle>
				</Card.Root>
			</Glass>
		</ContextMenu.Trigger>

		<ContextMenu.Content class="bg-black/70 overflow-scroll max-h-[50svh]">
			<ContextMenu.Label>Name</ContextMenu.Label>
			<Input class="mb-3" bind:value={$data.name} />
			<ContextMenu.Separator />
			<ContextMenu.Label>Value</ContextMenu.Label>
			<Input class="mb-3" bind:value={$data.value} />
			<ContextMenu.Separator />
			<ContextMenu.CheckboxItem bind:checked={$data.const}>
				Constant
			</ContextMenu.CheckboxItem>
			<ContextMenu.Separator />
			<ContextMenu.RadioGroup bind:value={$data.type}>
				<ContextMenu.Label>Type</ContextMenu.Label>
				<ContextMenu.Separator />
				{#each Object.keys($Types) as type}
					<ContextMenu.RadioItem value={type} class="capitalize">
						{type}
					</ContextMenu.RadioItem>
				{/each}
			</ContextMenu.RadioGroup>
		</ContextMenu.Content>
	</ContextMenu.Root>
</Drag>
