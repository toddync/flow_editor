import DoWhileNode from "$lib/components/nodes/DoWhile/DoWhileNode.svelte";
import ForNode from "$lib/components/nodes/For/ForNode.svelte";
import FunctionNode from "$lib/components/nodes/Function/FunctionNode.svelte";
import Logger from "$lib/components/nodes/Logger.svelte";
import ReturnNode from "$lib/components/nodes/Function/ReturnNode.svelte";
import StartNode from "$lib/components/nodes/StartNode.svelte";
import WhileNode from "$lib/components/nodes/While/WhileNode.svelte";
import IfNode from "$lib/components/nodes/If/ifNode.svelte";
import { UpdateVar } from "$lib/components/nodes/updateVar";
import { VarNode } from "$lib/components/nodes/varNode";
import { writable } from "svelte/store";

export const nodeTypes = writable({
	StartNode,
	VarNode,
	UpdateVar,
	IfNode,
	ForNode,
	WhileNode,
	DoWhileNode,
	FunctionNode,
	ReturnNode,
	Logger,
});
