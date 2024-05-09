import { writable } from "svelte/store";
import Logger from "$lib/components/nodes/Logger.svelte";
import VarNode from "$lib/components/nodes/varNode.svelte";

export const nodeTypes = writable({
	VarNode,
	Logger
});
