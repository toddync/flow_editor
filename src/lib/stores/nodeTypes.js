import { writable } from "svelte/store";
import Logger from "$lib/components/nodes/Logger.svelte";
import { VarNode } from "$lib/components/nodes/varNode";
import IfNode from "$lib/components/nodes/ifNode.svelte";
import ForNode from "$lib/components/nodes/ForNode.svelte";
import { UpdateVar } from "$lib/components/nodes/updateVar";

export const nodeTypes = writable({
	VarNode,
	UpdateVar,
	IfNode,
	ForNode,
	Logger
});
