<script lang="ts">
	//@ts-nocheck
	import Glass from "$lib/components/Glass.svelte";
	import Handle from "$lib/components/nodes/Handle.svelte";
	import * as Accordion from "$lib/components/ui/accordion";
	import * as Card from "$lib/components/ui/card";
	import * as ContextMenu from "$lib/components/ui/context-menu/index.js";
	import Input from "$lib/components/ui/input/input.svelte";
	import {
		Position,
		useHandleConnections,
		useSvelteFlow,
	} from "@xyflow/svelte";
	import { ArrowRight, CheckIcon, Circle, XIcon } from "lucide-svelte";
	import { onMount } from "svelte";
	import Base from "../Base.svelte";

	const iconClass =
		"w-3.5 absolute translate-x-1/2 right-1/2 -translate-y-1/2 top-1/2";

	const updateNodeData = useSvelteFlow().updateNodeData;
	const update = (x) => updateNodeData($$props.id, x);

	onMount(() => {
		update({
			condition: $$props.data.condition || "",
			conditionType: $$props.data.conditionType || "flow",
		});
	});

	const InCon = useHandleConnections({
		nodeId: $$props.id,
		type: "target",
		id: "prev",
	});
</script>

<Base>
	<div class="m-0 p-0 relative drag">
		<ContextMenu.Root>
			<ContextMenu.Trigger>
				<Glass>
					<Card.Root
						data-text={$$props.data?.conditionType == "text" ||
							null}
						class="min-w-[168px] data-[text]:min-w-[268]"
					>
						<Card.Header>
							<Accordion.Root>
								<Accordion.Item class="border-0" value="1">
									<Accordion.Trigger
										class="hover:no-underline"
									>
										<Card.Title>If</Card.Title>
									</Accordion.Trigger>
									<Accordion.Content>
										<Card.Description class="mt-3">
											<code class="text-xs">
												<span class="text-orange-500"
													>if</span
												>(<span class="text-orange-700"
													>condition</span
												>) &lbrace; <br />
												<CheckIcon
													class="inline size-3 ml-3 text-lime-400"
												/> <br />
												&rbrace;
												<span class="text-orange-500"
													>else</span
												>
												&lbrace; <br />
												<XIcon
													class="inline size-3 ml-3 text-red-400"
												/> <br />
												&rbrace;
											</code>
										</Card.Description>
									</Accordion.Content>
								</Accordion.Item>
							</Accordion.Root>
						</Card.Header>
						{#if $$props.data?.conditionType == "text"}
							<Card.Content class="-mt-2 relative">
								<Input
									placeholder="Condition..."
									class="bg-transparent z-50"
									value={$$props.data?.condition}
									on:input={(e) =>
										update({ condition: e.target.value })}
								/>
							</Card.Content>
						{/if}
					</Card.Root>
				</Glass>
			</ContextMenu.Trigger>
			<ContextMenu.Content>
				<ContextMenu.RadioGroup
					value={$$props.data?.conditionType}
					onValueChange={(e) => update({ conditionType: e })}
				>
					<ContextMenu.RadioItem value="text"
						>text</ContextMenu.RadioItem
					>
					<ContextMenu.RadioItem value="flow"
						>flow</ContextMenu.RadioItem
					>
				</ContextMenu.RadioGroup>
			</ContextMenu.Content>
		</ContextMenu.Root>
	</div>
	{#if $$props.data?.conditionType == "flow"}
		<Handle
			id="condition"
			type="source"
			position={Position.Bottom}
			class="left-1/2"
		>
			<Circle
				class="w-3.5 absolute -translate-y-1/2 -translate-x-1/2 top-1/2 left-1/2 text-orange-700"
			/>
		</Handle>
	{/if}
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
</Base>
