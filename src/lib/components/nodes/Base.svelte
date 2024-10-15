<script lang="ts">
	//@ts-nocheck
    import { Nodes } from "$lib/stores/nodesStore";
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
	const update = (x, y) => updateNodeData(y || $$props.id, x);

	const InCon = useHandleConnections({
		nodeId: $$props.id,
		type: "target",
		id: "prev",
	});
	$: prev = useNodesData([$InCon[0]?.source || ""]);

	$: {
		if(groups.includes($prev?.[0]?.type || ""))
			update({ context: `${$InCon[0]?.sourceHandle}---${$InCon[0]?.source}` || "" })
		else if(!$InCon[0])
			update({context: ""})
	};
	
	$: {
		if($prev?.[0] && !groups.includes($prev?.[0]?.type || "")){
			if(!$prev[0].data.context && $Nodes.filter((v) => v.id == $$props.id)?.[0].data.context)
				update({context: ""})
			else if($prev[0].data.context && !$Nodes.filter((v) => v.id == $$props.id)?.[0].data.context)
				update({context: $prev[0].data.context})
		}
	}
</script>

<div class="relative -translate-y-1/2 -translate-x-1/2 min-w-10 min-h-10">
	<slot />
</div>
