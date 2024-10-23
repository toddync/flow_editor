<script lang="ts">
	//@ts-nocheck
	import { Nodes } from "$lib/stores/nodesStore";
	import { Handle, useSvelteFlow } from "@xyflow/svelte";

	export let isConnectable = true;

	console.log($$props)

	const { updateNodeData } = useSvelteFlow();
	const update = (x, y) => updateNodeData(x, y);

	const validate = (c) => {
		let prev = $Nodes.filter((v) => v.id == c.source)?.[0];
		let next = $Nodes.filter((v) => v.id == c.target)?.[0];

		if(prev.type.toLowerCase == "comment"){
			console.log(1)
			return true
		}

		if (prev.data.context || next.data.context) {
			if(prev.data.context && !next.data.context)
				return true;
			else if(next.data.context && !prev.data.context)
				return true
			else if (prev.data.context == next.data.context)
				return true;
		} else
			return true;
		return false;
	}

	const connect = ([c]) => {
		let prev = $Nodes.filter((v) => v.id == c.source)?.[0];
		let next = $Nodes.filter((v) => v.id == c.target)?.[0];

		// if(prev.type.toLowerCase == "comment") return true

		if(prev?.data.context != "" && !next?.data.context){
			update(next.id, {context: prev.data.context})
		} else if(next?.data.context != "" && !prev?.data.context){
			update(prev.id, {context: next.data.context})
		}
	}

	const disconnect = ([c]) => {
		let prev = $Nodes.filter((v) => v.id == c.source)?.[0];
		let next = $Nodes.filter((v) => v.id == c.target)?.[0];

		if(prev?.data?.context && next?.data?.context)
			update(next.id, {context: ""})
	}
</script>

<div
	class="absolute -translate-y-1/2 -translate-x-1/2 size-5 place-items-center {$$props.class}"
>
	<Handle
		id={$$props.id}
		type={$$props.type}
		onconnect={connect}
		ondisconnect={disconnect}
		position={$$props.position}
		isConnectable={isConnectable}
		isValidConnection={$$props.isValidConnection || validate}
		class="bg-black/10 rounded-sm backdrop-blur-md  w-full h-full -translate-y-1/2 top-1/2 -translate-x-1/2 -right-1/2 *:pointer-events-none {$$props.handleClass}"
	>
		<slot />
	</Handle>
</div>
