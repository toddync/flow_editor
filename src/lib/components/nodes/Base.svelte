<script lang="ts">
	//@ts-nocheck
	import {
		useHandleConnections,
		useNodesData,
		useSvelteFlow,
	} from "@xyflow/svelte";

	const groups = [
		"ForNode",
		"WhileNode",
		"DoWhileNode",
		"FunctionNode",
		"IfNode",
	];

	const { updateNodeData } = useSvelteFlow();
	const update = (x) => updateNodeData($$props.id, x);

	const InCon = useHandleConnections({
		nodeId: $$props.id,
		type: "target",
		id: "prev",
	});
	$: prev = useNodesData([$InCon[0]?.source || ""]);

	$: {
		let p = $prev?.[0];
		let i = $InCon[0];

		let isGouper = groups.includes(p?.type || "");
		console.log(p);
		console.log(i);

		// if (p?.data?.cgroup && !isGouper) {
		// 	update({ cgroup: p.data.cgroup });
		// 	return;
		// }

		console.log(p?.type);
		if (isGouper) {
			console.log({ cgroup: `${i?.sourceHandle}---${i?.id}` });
			update({ cgroup: `${i?.sourceHandle}---${i?.source}` || "" });
		}

		// if (groups.includes(p?.type || "")) {
		// 	// update({cgroup: })
		// }
	}
</script>

<div class="relative -translate-y-1/2 -translate-x-1/2 min-w-10 min-h-10">
	<slot />
</div>
