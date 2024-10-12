<script lang="ts">
	//@ts-nocheck
	import FnIcon from "$lib/components/icons/function?in-svelte";
	import Parentheses from "$lib/components/icons/parentheses?in-svelte";
	import Handle from "$lib/components/nodes/Handle.svelte";
	import * as Card from "$lib/components/ui/card";
	import * as Dialog from "$lib/components/ui/dialog";
	import Input from "$lib/components/ui/input/input.svelte";
	import {
		Position,
		useHandleConnections,
		useSvelteFlow,
	} from "@xyflow/svelte";
	import { ArrowRight, Play } from "lucide-svelte";
	import { writable } from "svelte/store";
	import Base from "../Base.svelte";
	import ParamList from "./ParamList.svelte";

	const InCon = useHandleConnections({
		nodeId: $$props.id,
		type: "target",
		id: "prev",
	});

	const iconClass =
		"w-3.5 absolute translate-x-1/2 right-1/2 -translate-y-1/2 top-1/2";

	const { updateNodeData } = useSvelteFlow();
	const update = (x) => updateNodeData($$props.id, x);
	let params = writable($$props.data.params || []);
	let name = writable($$props.data.name || "name");

	$: {
		update({ params: $params, name: $name });
	}
</script>

<Base id={$$props.id}>
	<Dialog.Root>
		<Dialog.Trigger>
			<Card.Root
				class="bg-black/10 backdrop-blur-sm -z-10 -left-6 -bottom-6 drag "
			>
				<Card.Header>
					<Card.Title class="flex">
						<FnIcon class="h-10 -my-3 text-orange-500 fn" />
						<span class="text-sm mt-auto font-jb text-orange-700"
							>{$name}</span
						>
						<Parentheses class="h-10 -my-3 hide-second" />
						<div class="-mx-[9px] text-xs my-auto font-jb flex">
							{#each $params as param, i}
								<span class="flex whitespace-nowrap">
									{#if i > 0}
										,
									{/if}
									{param.name}
									<span
										class="text-muted-foreground whitespace-nowrap text-[6px] hidden"
									>
										:int
									</span>
								</span>
							{/each}
						</div>
						<Parentheses class="h-10 -my-3 hide-first " />
					</Card.Title>
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
		</Dialog.Trigger>
		<Dialog.Content class="bg-black/60">
			<Dialog.Header>
				<Dialog.Description class="font-jb text-base">
					<code class="text-orange-500">function</code>
					<code class="text-orange-700">name</code>
					(<code class="text-orange-700">params</code>) &lbrace;
					<Play class="w-3.5 text-lime-400 ml-3" />
					&rbrace;
				</Dialog.Description>
			</Dialog.Header>
			<div class="h-1 bg-border rounded" />
			<Input class="font-jb text-lg" bind:value={$name} />
			<ParamList {params} onDrop={(x) => ($params = [...x])} />
		</Dialog.Content>
	</Dialog.Root>
</Base>
