<script lang="ts">
	//@ts-nocheck
	import * as Card from "$lib/components/ui/card";
	import * as Command from "$lib/components/ui/command";
	import * as ContextMenu from "$lib/components/ui/context-menu";
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
	import { Parentheses } from "lucide-svelte";
	import { writable } from "svelte/store";
	import And from "./And.svelte";
	import Group from "./Group.svelte";

	const open = writable(false);

	const Blocks = {
		And,
	};
	const blocks = writable([]);

	function add(v) {
		$blocks.push({ type: v });
		$blocks = $blocks;
	}
</script>

<Card.Root>
	<Card.Header class="p-2 flex">
		<Parentheses class="mx-auto" />
	</Card.Header>
	<Card.Content class="flex p-3">
		<DropdownMenu.Root class="size-full" closeOnItemClick closeFocus>
			<DropdownMenu.Trigger class="size-full">
				<Card.Root class="size-full my-auto">
					<Card.Content class="py-2 flex flex-col gap-3">
						{#each $blocks as block}
							<svelte:component
								this={Blocks[block.type]}
								{block}
							/>
						{/each}
					</Card.Content>
				</Card.Root>
			</DropdownMenu.Trigger>
			<DropdownMenu.Content class="min-w-80">
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
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	</Card.Content>
</Card.Root>
