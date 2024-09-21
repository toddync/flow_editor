<script lang="ts">
	//@ts-nocheck
	import { showCommands as open } from "$lib/stores/ShowCommands";
	import { Panel } from "@xyflow/svelte";
	import { Command, Search } from "lucide-svelte";
	import { Badge } from "./ui/badge";
	import { Button } from "./ui/button";
</script>

<Panel position="top-center">
	<Button
		on:click={() => ($open = true)}
		class="bg-black/10 backdrop-blur-sm border hover:bg-accent rounded-2xl flex gap-5 group transition-colors"
	>
		<Search class="text-foreground size-5" />
		<p class="text-muted-foreground mx-auto col-span-2">Search...</p>
		<Badge
			variant="secondary"
			class="text-muted-foreground group-hover:bg-red-900/50 transition-colors"
		>
			<Command class="size-4" />
			+ K
		</Badge>
	</Button>
</Panel>
