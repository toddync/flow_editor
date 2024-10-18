import { Indent, Parse, type EdgeMap, type Node, type NodeMap } from "../transpiler";

const loops = ["ForNode", "WhileNode", "DoWhileNode"];

/**
 * Generates code for loop nodes.
 * @param Node - The loop node.
 * @param id - The current node's ID.
 * @param N - The node map.
 * @param E - The edge map.
 * @param indent - The indentation level.
 * @returns The generated loop code as a string.
 */
function Loops(Node: Node, id: string, N: NodeMap, E: EdgeMap, indent: number = 0): string {
    let code = "";

    // Generate loop code based on the node type
    if (Node.type === "ForNode") {
        code += `for(${Node.data.initialization}; ${Node.data.condition}; ${Node.data.refresh}){\n`;
    } else if (Node.type === "WhileNode") {
        code += `while(${Node.data.condition}){\n`;
    } else if (Node.type === "DoWhileNode") {
        code += `do{\n`;
    }

    // Parse any nested nodes
    if (N[E[`${id}---start`]]) {
        code += Parse(N[E[`${id}---start`]], E[`${id}---start`], N, E, indent+1);
    }

    if (Node.type === "DoWhileNode") {
        code += Indent(indent) + `} while(${Node.data.condition})\n`;
    } else {
        code += Indent(indent) + "}\n";
    }

    return code;
}

export default {
    valid: loops,
    parse: Loops
}