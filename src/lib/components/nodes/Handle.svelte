<script lang="ts">
	//@ts-nocheck
	import { Handle } from "@xyflow/svelte";
</script>

<div
	class="absolute -translate-y-1/2 -translate-x-1/2 size-5 place-items-center backdrop-blur-sm {$$props.class}"
>
	<slot />
	<Handle
		position={$$props.position}
		type={$$props.type}
		id={$$props.id}
		isValidConnection={$$props.isValidConnection ||
			((c) =>
				($$props.type == "source"
					? !c.target.includes("---")
					: !c.source.includes("---")) &&
				c.targetHandle != "start" &&
				c.sourceHandle != "start")}
		class="bg-transparent rounded-sm z-50 w-full h-full -translate-y-1/2 top-1/2 -translate-x-1/2 -right-1/2 {$$props.handleClass}"
	/>
</div>
