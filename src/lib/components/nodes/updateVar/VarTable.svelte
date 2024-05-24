<script lang="ts">
	//@ts-nocheck
	import { Button } from "$lib/components/ui/button/";
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
	import { Input } from "$lib/components/ui/input/";
	import * as Table from "$lib/components/ui/table";
	import { Textarea } from "$lib/components/ui/textarea";
	import { EllipsisVertical, Plus, Trash2 } from "lucide-svelte";
	import { dndzone } from "svelte-dnd-action";
	import { flip } from "svelte/animate";

	export let onDrop;
	export let flipDurationMs = 300;
	export let update = false;
	export let Rows;

	function handleConsider(e) {
		Rows = e.detail.items;
	}
	function handleFinalize(e) {
		onDrop(e.detail.items);
	}

	const change = (e, i) => {
		let ind = 0;
		Rows.find((v, _) => v.id == i && (ind = _));
		Rows[ind] = { ...Rows[ind], [e.target.name]: e.target.value };
		Rows = Rows;
		update({ vars: [...Rows] });
	};

	const remove = (i) => {
		let ind = 0;
		Rows.find((v, _) => v.id == i && (ind = _));
		Rows.splice(ind, 1);
		Rows = Rows;
		update({ vars: Rows });
	};
</script>

<Table.Root class="border">
	<Table.Caption>
		<Button
			size="icon"
			class="bg-transparent text-foreground border mb-5 hover:bg-accent transition-colors size-8 p-0 m-0"
			on:click={() =>
				Rows.push({ id: crypto.randomUUID(), name: "", value: "" }) &&
				(Rows = Rows)}
		>
			<Plus />
		</Button>
	</Table.Caption>
	<Table.Header class="*:text-center">
		{#if $$props.dec}
			<Table.Head class="text-orange-500">type</Table.Head>
		{/if}
		<Table.Head>name</Table.Head>
		<Table.Head class="text-orange-700">=</Table.Head>
		<Table.Head>value</Table.Head>
		<Table.Head>...</Table.Head>
	</Table.Header>
	<tbody
		use:dndzone={{
			items: Rows,
			flipDurationMs,
			dropTargetClasses: ["outline-none"],
		}}
		on:consider={handleConsider}
		on:finalize={handleFinalize}
	>
		{#each Rows as item (item["id"])}
			<tr
				class="*:text-center *:border-t z-50"
				animate:flip={{ duration: flipDurationMs }}
			>
				{#if $$props.dec}
					<Table.Cell class="text-orange-500">
						{item.type}
					</Table.Cell>
				{/if}
				<Table.Cell>
					<Input
						name="name"
						value={item.name}
						on:input={(e) => change(e, item.id)}
						class="max-w-32"
					/>
				</Table.Cell>
				<Table.Cell class="text-orange-700">=</Table.Cell>
				<Table.Cell>
					<Textarea
						name="value"
						cols={30}
						rows={1}
						value={item.value}
						on:input={(e) => change(e, item.id)}
						class="max-w-56 whitespace-pre"
					/>
				</Table.Cell>
				<Table.Cell>
					<DropdownMenu.Root>
						<DropdownMenu.Trigger>
							<Button
								size="icon"
								class="bg-transparent text-foreground border hover:bg-accent"
							>
								<EllipsisVertical />
							</Button>
						</DropdownMenu.Trigger>
						<DropdownMenu.Content
							class="bg-black/10 backdrop-blur-sm"
						>
							<DropdownMenu.Item on:click={() => remove(item.id)}>
								<Trash2 class="text-red-400 mr-2" />
								Remove
							</DropdownMenu.Item>
						</DropdownMenu.Content>
					</DropdownMenu.Root>
				</Table.Cell>
			</tr>
		{/each}
	</tbody>
</Table.Root>
