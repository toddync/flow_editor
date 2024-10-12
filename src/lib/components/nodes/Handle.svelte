<script lang="ts">
	//@ts-nocheck
	import { Nodes } from "$lib/stores/nodesStore";
	import { Handle } from "@xyflow/svelte";

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

	const validate = (c) => {
		let prev = $Nodes.filter((v) => v.id == c.source)?.[0];
		let next = $Nodes.filter((v) => v.id == c.target)?.[0];
		if (prev.data.cgroup || next.data.cgroup) {
		} else {
			return true;
		}
		// return c.target.includes("---") || c.source.includes("---")
		// 	? c.cgroup == c.target
		// 	: true;
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
		class="bg-black/10 rounded-sm backdrop-blur-md  w-full h-full -translate-y-1/2 top-1/2 -translate-x-1/2 -right-1/2 *:pointer-events-none {$$props.handleClass}"
	>
		<slot />
	</Handle>
</div>
