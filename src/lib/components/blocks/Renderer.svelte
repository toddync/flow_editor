<script>
	//@ts-nocheck
	import * as Card from "$lib/components/ui/card";
	import * as Command from "$lib/components/ui/command";
	import * as ContextMenu from "$lib/components/ui/context-menu";
	import { writable } from "svelte/store";
	import And from "./And.svelte";
	import Group from "./Group.svelte";

	const Blocks = {
		Group,
		And,
	};
	const blocks = writable([]);

	function add(v) {
		$blocks.push({ type: v });
		$blocks = $blocks;
	}
</script>

<ContextMenu.Root class="size-full" closeOnItemClick>
	<ContextMenu.Trigger class="size-full">
		<Card.Root class="size-full">
			<Card.Content class="py-2 flex flex-col pointer-events-all">
				{#each $blocks as block}
					<svelte:component this={Blocks[block.type]} {block} />
				{/each}
			</Card.Content>
		</Card.Root>
	</ContextMenu.Trigger>
	<ContextMenu.Content class="min-w-80">
		<Command.Root class="bg-opacity-0">
			<Command.Input placeholder="Search for a block..." />
			<Command.List>
				<Command.Empty>No results found.</Command.Empty>
				<Command.Group heading="Blocks">
					{#each Object.keys(Blocks) as block, i (i)}
						<Command.Item onSelect={() => add(block)}>
							{block}
						</Command.Item>
					{/each}
				</Command.Group>
			</Command.List>
		</Command.Root>
	</ContextMenu.Content>
</ContextMenu.Root>
