import { writable } from "svelte/store";
import Logger from "$lib/components/nodes/Logger.svelte";
import { VarNode } from "$lib/components/nodes/varNode";
import IfNode from "$lib/components/nodes/ifNode.svelte";
import ForNode from "$lib/components/nodes/ForNode.svelte";
import WhileNode from "$lib/components/nodes/WhileNode.svelte";
import DoWhileNode from "$lib/components/nodes/DoWhileNode.svelte";
import { UpdateVar } from "$lib/components/nodes/updateVar";
import StartNode from "$lib/components/nodes/StartNode.svelte";

export const nodeTypes = writable({
	StartNode,
	VarNode,
	UpdateVar,
	IfNode,
	ForNode,
	WhileNode,
	DoWhileNode,
	Logger,
});
