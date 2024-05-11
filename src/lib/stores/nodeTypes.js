import { writable } from "svelte/store";
import Logger from "$lib/components/nodes/Logger.svelte";
import VarNode from "$lib/components/nodes/varNode.svelte";
import IfNode from "$lib/components/nodes/ifNode.svelte";
import UpdateVar from "$lib/components/nodes/updateVar.svelte";

export const nodeTypes = writable({
	VarNode,
	UpdateVar,
	IfNode,
	Logger
});
