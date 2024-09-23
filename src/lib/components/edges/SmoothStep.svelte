<script lang="ts">
	//@ts-check
	import {
		BaseEdge,
		EdgeLabelRenderer,
		getBezierPath,
		getSmoothStepPath,
		useEdges,
		type EdgeProps,
	} from "@xyflow/svelte";
	import { Trash2 } from "lucide-svelte";
	import { Button } from "../ui/button";

	type $$Props = EdgeProps;

	export let id: $$Props["id"];
	export let sourceX: $$Props["sourceX"];
	export let sourceY: $$Props["sourceY"];
	export let sourcePosition: $$Props["sourcePosition"];
	export let targetX: $$Props["targetX"];
	export let targetY: $$Props["targetY"];
	export let targetPosition: $$Props["targetPosition"];

	$: [edgePath, labelX, labelY] = getBezierPath({
		sourceX,
		sourceY,
		sourcePosition,
		targetX,
		targetY,
		targetPosition,
	});

	const edges = useEdges();

	const onEdgeClick = () => {
		edges.update((eds) => eds.filter((edge) => edge.id !== id));
	};
</script>

<EdgeLabelRenderer>
	<Button
		size="icon"
		style="transform: translate(-50%, -50%) translate({labelX}px, {labelY}px); z-index: 50; pointer-events: all;"
		class="size-5 relative bg-black/10 backdrop-blur-md rounded-sm border text-foreground hover:bg-accent"
		on:click={onEdgeClick}
	>
		<Trash2
			class="absolute w-3.5 -translate-y-1/2 top-1/2 -translate-x-1/2 left-1/2 text-red-600/80"
		/>
	</Button>
</EdgeLabelRenderer>

<BaseEdge path={edgePath} />
