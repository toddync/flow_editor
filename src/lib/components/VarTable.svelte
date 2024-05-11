<script lang="ts">
	//@ts-nocheck
	import * as Table from "$lib/components/ui/table";
	import { Sortable } from "sortablejs/modular/sortable.core.esm";
	import { onMount } from "svelte";
	import Input from "./ui/input/input.svelte";

	export let update = false;
	export let Rows = [];
	let table;

	// onMount(async function () {
	// 	new Sortable(table, {
	// 		group: crypto.randomUUID(),
	// 		swap: true,
	// 		onEnd(e) {
	// 			console.table($Rows);
	// 			console.log(
	// 				$Rows.splice(e.newIndex, 0, $Rows.splice(e.oldIndex, 1)[0])
	// 			);
	// 		}
	// 	});
	// });

	onMount(async function () {
		let sortable = Sortable.create(table, {
			group: crypto.randomUUID(),
			animation: 100,
			store: {
				get: () => $Rows,
				set: (sortable, e) => {
					var order = sortable.toArray();
					let tmp = [];
					order.forEach((v, i) => (tmp[i] = $Rows[v]));
					update({ vars: tmp });
				}
			}
		});
	});
</script>

<Table.Root class="border">
	<Table.Header>
		{#if update}
			<Table.Head class="text-orange-500">type</Table.Head>
		{/if}
		<Table.Head>name</Table.Head>
		<Table.Head class="text-orange-700">=</Table.Head>
		<Table.Head>value</Table.Head>
	</Table.Header>
	<tbody bind:this={table}>
		{#each $Rows as item, i}
			<Table.Row class="*:text-center *:border-t" data-id={i}>
				{#if update}
					<Table.Cell class="text-orange-500">
						{item.type}
					</Table.Cell>
				{/if}
				<Table.Cell>
					<Input value={item.name} />
				</Table.Cell>
				<Table.Cell class="text-orange-700">=</Table.Cell>
				<Table.Cell>
					<Input value={item.value} />
				</Table.Cell>
			</Table.Row>
		{/each}
	</tbody>
</Table.Root>
