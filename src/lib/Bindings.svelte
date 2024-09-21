<script>
	//@ts-nocheck
	import { showCommands as open } from "$lib/stores/ShowCommands.js";
	import { useSvelteFlow } from "@xyflow/svelte";
	import { onMount } from "svelte";
	const { zoomIn, zoomOut, fitView } = useSvelteFlow();

	onMount(() => {
		function handleKeydown(e) {
			if (e.metaKey || e.ctrlKey) {
				if (e.key.toLowerCase() == "k") {
					e.preventDefault();
					$open = !$open;
				} else if (e.key.toLowerCase() == "-") {
					e.preventDefault();
					zoomOut({ duration: 300 });
				} else if (e.key.toLowerCase() == "=") {
					e.preventDefault();
					zoomIn({ duration: 300 });
				} else if (e.key.toLowerCase() == "r") {
					e.preventDefault();
					window.location.reload();
				}
			}
		}

		document.addEventListener("keydown", handleKeydown);
		return () => document.removeEventListener("keydown", handleKeydown);
	});
</script>
