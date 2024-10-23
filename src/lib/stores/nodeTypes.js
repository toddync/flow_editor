import Comment from "$lib/components/nodes/Comment.svelte";
import DoWhileNode from "$lib/components/nodes/DoWhile/DoWhileNode.svelte";
import ForNode from "$lib/components/nodes/For/ForNode.svelte";
import FunctionNode from "$lib/components/nodes/Function/FunctionNode.svelte";
import ReturnNode from "$lib/components/nodes/Function/ReturnNode.svelte";
import IfNode from "$lib/components/nodes/If/ifNode.svelte";
import Logger from "$lib/components/nodes/Logger.svelte";
import StartNode from "$lib/components/nodes/StartNode.svelte";
import { UpdateVar } from "$lib/components/nodes/updateVar";
import { Variable } from "$lib/components/nodes/varNode";
import WhileNode from "$lib/components/nodes/While/WhileNode.svelte";
import { writable } from "svelte/store";
// import Test from "$lib/components/nodes/Test.svelte";

export const nodeTypes = writable({
	StartNode,
	Variable,
	UpdateVar,
	IfNode,
	ForNode,
	WhileNode,
	DoWhileNode,
	FunctionNode,
	ReturnNode,
	Logger,
	Comment,
	// Test
});
