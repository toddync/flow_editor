<script lang="ts">
	//@ts-nocheck
	import { Edges } from "$lib/stores/edgesStore";
	import { Nodes } from "$lib/stores/nodesStore";
	import { Transpile } from "$lib/transpiler";
	import { Button } from "./ui/button";
	import { Code2 } from "lucide-svelte/icons";

	function download() {
		var element = document.createElement("a");
		element.setAttribute(
			"href",
			"data:text/plain;charset=utf-8," +
				encodeURIComponent(Transpile($Nodes, $Edges))
		);
		element.setAttribute("download", "svelte-flow.js");
		element.click();
	}
</script>

<Button
	size="icon"
	class="bg-black/10 backdrop-blur-sm border hover:bg-accent"
	on:click={download}
>
	<p class="sr-only">Download Flow as JSON schema</p>
	<Code2 class="size-6 text-foreground" />
</Button>
