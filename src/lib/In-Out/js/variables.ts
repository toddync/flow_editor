import { type EdgeMap, type Node, type NodeMap } from "../transpiler";

const variables = ["VarNode", "UpdateVar", "Variable"];

/**
 * Generates code for variable nodes.
 * @param Node - The function node.
 * @param id - The current node's ID.
 * @param N - The node map.
 * @param E - The edge map.
 * @param indent - The indentation level.
 * @returns The generated variable code as a string.
 */
function Variables(Node: Node, id: string, N: NodeMap, E: EdgeMap, indent: number = 0): string {
    return `${Node.data.const ? "const" : "let"} ${Node.data.name} = ${Node.data.value};\n`;
}

export default {
    valid: variables,
    parse: Variables
};