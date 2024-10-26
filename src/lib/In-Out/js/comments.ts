import { type EdgeMap, type Node, type NodeMap } from "../transpiler";

const comments = ["Comment"];

/**
 * Generates code for variable nodes.
 * @param Node - The function node.
 * @param id - The current node's ID.
 * @param N - The node map.
 * @param E - The edge map.
 * @param indent - The indentation level.
 * @returns The generated variable code as a string.
 */
function Comments(
	Node: Node,
	id: string,
	N: NodeMap,
	E: EdgeMap,
	indent: number = 0
): string {
	let code: string = "";

	Node.data.text?.split("\n").forEach((line: string) => {
		code += "// " + line + "\n";
	});

	return code;
}

export default {
	valid: comments,
	parse: Comments,
};
