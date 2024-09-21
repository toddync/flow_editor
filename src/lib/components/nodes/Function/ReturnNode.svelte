<script lang="ts">
	import { NodeResizeControl, Position } from "@xyflow/svelte";

	//@ts-nocheck
	import { ArrowRight, Expand } from "lucide-svelte";
	import Glass from "../../Glass.svelte";
	import * as Card from "../../ui/card";
	import { Input } from "../../ui/input";
	import Handle from "../Handle.svelte";
	import { Textarea } from "../../ui/textarea";
</script>

<Glass class="drag h-full">
	<Card.Root class="h-full">
		<Card.Header>
			<Card.Title>Return</Card.Title>
			<Card.Description class="h-full">
				<Card.Description lang="js" class="h-fit mt-2"
					><code
						><r class="text-orange-500">return</r>
						<r class="text-orange-700"> value</r>;
					</code>
				</Card.Description>
			</Card.Description>
		</Card.Header>
		<Card.Content class="h-[100%-10rem]">
			<Textarea
				placeholder="Value..."
				class="h-full"
				style="resize: none"
			/>

			<NodeResizeControl
				minWidth={265}
				minHeight={213}
				class="border-none bg-transparent"
			>
				<Expand class="stroke-slate-100 -ml-6 -mt-7 size-4" />
			</NodeResizeControl>
		</Card.Content>
		<Handle
			type="target"
			id="prev"
			position={Position.Left}
			class="top-1/2 left-2.5"
		>
			<ArrowRight
				class="w-3.5 absolute translate-x-1/2 right-full -translate-y-1/2 top-1/2"
			/>
		</Handle>
	</Card.Root>
</Glass>
