<script lang="ts">
	//@ts-nocheck
	import { Edges } from "$lib/stores/edgesStore";
	import { Nodes } from "$lib/stores/nodesStore";
	import { Button } from "./ui/button";
	import { Download, CurlyBraces, Upload } from "lucide-svelte/icons";

	import * as Popover from "./ui/popover";

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

	function restore(e) {
		console.log(e.target.files[0]);
		const reader = new FileReader();
		reader.readAsText(e.target.files[0]);
		reader.onload = function () {
			let data = JSON.parse(reader.result);

			$Nodes = data.Nodes;
			$Edges = data.Edges;
		};
	}
</script>

<Popover.Root>
	<Popover.Trigger>
		<Button
			size="icon"
			class="bg-black/10 backdrop-blur-sm border hover:bg-accent"
		>
			<p class="sr-only">Export or import Flow as JSON schema</p>
			<CurlyBraces class="size-6 text-foreground" />
		</Button>
	</Popover.Trigger>
	<Popover.Content class="w-fit flex gap-3 mt-2 bg-black/10 backdrop-blur-sm">
		<Button
			on:click={() => document.querySelector("#json").click()}
			class="bg-transparent border text-foreground hover:bg-accent"
			size="icon"
		>
			<p class="sr-only">Import Flow as JSON schema</p>
			<Upload />
		</Button>
		<Button
			on:click={download}
			class="bg-transparent border text-foreground hover:bg-accent"
			size="icon"
		>
			<p class="sr-only">ExportFlow as JSON schema</p>
			<Download />
		</Button>
	</Popover.Content>
</Popover.Root>

<input type="file" class="sr-only" id="json" on:change={restore} />
