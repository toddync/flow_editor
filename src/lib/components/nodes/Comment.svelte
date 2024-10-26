<script lang="ts">
	//@ts-nocheck
	import {
		NodeResizer,
		Position,
		useHandleConnections,
		useSvelteFlow,
		useUpdateNodeInternals,
	} from "@xyflow/svelte";
	import { ArrowRight, Hand } from "lucide-svelte";
	import { writable } from "svelte/store";
	import Glass from "../Glass.svelte";
	import { Button } from "../ui/button";
	import * as Card from "../ui/card";
	import Textarea from "../ui/textarea/textarea.svelte";
	import Base from "./Base.svelte";
	import Handle from "./Handle.svelte";

	const data = writable({ text: $$props.data.text || "" });

	console.log($$props);

	const updateInternals = useUpdateNodeInternals();
	const updateNodeData = useSvelteFlow().updateNodeData;

	const update = (x) =>
		(updateNodeData($$props.id, x) || 1) && updateInternals($$props.id);

	$: update($data);

	const connections = useHandleConnections({
		nodeId: $$props.id,
		type: "source",
	});

	$: isConnectable = $connections.length <= 1;
</script>

<Base id={$$props.id} class="size-full">
	<Glass class="size-full">
		<Card.Root class="size-full">
			<Card.Content class="p-0 min-h-full flex flex-col">
				<NodeResizer
					class="rounded-2xl"
					isVisible={$$props.selected}
					minWidth={80}
					minHeight={80}
				/>
				<div
					class="relative h-10 drag flex p-3 gap-1 border-b border-border"
				>
					<div
						class="bg-[#FF605C] min-w-3 min-h-3 max-h-3 rounded-full"
					/>
					<div
						class="bg-[#FFBD44] min-w-3 min-h-3 max-h-3 rounded-full"
					/>
					<div
						class="bg-[#00CA4E] min-w-3 min-h-3 max-h-3 rounded-full"
					/>
				</div>

				<Textarea
					class="text-xs h-full border-none font-jb resize-none min-h-0 min-w-0 px-1 pb-1 pt-2 overflow-scroll"
					spellcheck={false}
					bind:value={$data.text}
				/>

				<Handle
					{isConnectable}
					type="source"
					id="next"
					position={Position.Bottom}
					class="right-1/2 translate-x-1/2 translate-y-1/2 bottom-0"
				>
					<ArrowRight
						class="w-3.5 absolute -translate-y-1/2 top-1/2 left-0.5 rotate-90"
					/>
				</Handle>
			</Card.Content>
		</Card.Root>
	</Glass>
</Base>
