<script lang="ts">
	//@ts-nocheck
	import { Edges } from "$lib/stores/edgesStore";
	import { Nodes } from "$lib/stores/nodesStore";
	import { Button } from "./ui/button";
	import { FileJson } from "lucide-svelte/icons";

	function download() {
		var element = document.createElement("a");
		element.setAttribute(
			"href",
			"data:text/plain;charset=utf-8," +
				encodeURIComponent(
					JSON.stringify({ Nodes: $Nodes, Edges: $Edges }, null, 2)
				)
		);
		element.setAttribute("download", "svelte-flow.json");
		element.click();
	}
</script>

<Button
	size="icon"
	class="bg-black/10 backdrop-blur-sm border hover:bg-accent"
	on:click={download}
>
	<p class="sr-only">Download Flow as JSON schema</p>
	<FileJson class="size-6 text-foreground" />
</Button>
