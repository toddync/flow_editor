<script lang="ts">
	//@ts-nocheck
	import { Handle } from "@xyflow/svelte";

	const validate = (c) => {
		const getGroup = (gId) => {
			let _ = (gId as String).split("---");

			if (typeof _ == "object") {
				if (_?.length > 1) {
					_.pop();
					return _.join("---");
				} else {
					return _.pop();
				}
			}

			return _;
		};

		return c.target.includes("---") || c.source.includes("---")
			? getGroup(c.source) == getGroup(c.target)
			: true;
	};
</script>

<div
	class="absolute -translate-y-1/2 -translate-x-1/2 size-5 place-items-center {$$props.class}"
>
	<Handle
		id={$$props.id}
		position={$$props.position}
		type={$$props.type}
		isValidConnection={$$props.isValidConnection || validate}
		class="bg-black/10 rounded-sm z-50 w-full h-full -translate-y-1/2 top-1/2 -translate-x-1/2 -right-1/2 {$$props.handleClass} peer"
	/>
	<slot />
</div>
