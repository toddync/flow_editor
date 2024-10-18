import { Indent, Parse, type EdgeMap, type Node, type NodeMap } from "../transpiler";

const conditionals = ["IfNode"];

/**
 * Generates code for conditional nodes.
 * @param Node - The conditional node.
 * @param id - The current node's ID.
 * @param N - The node map.
 * @param E - The edge map.
 * @param indent - The indentation level.
 * @returns The generated conditional code as a string.
 */
function Conditionals(Node: Node, id: string, N: NodeMap, E: EdgeMap, indent: number = 0): string {
    let code = "";

    // Generate if statement code
    if (Node.type.toLowerCase().includes("if")) {
        code += `if(${Node.data.condition}){\n`;
    }

    // Parse true branch
    if (N[E[`${id}---true`]]) {
        code += Parse(N[E[`${id}---true`]], E[`${id}---true`], N, E, indent+1);
    }

    code += Indent(indent) + "}";

    // Parse false branch
    if (N[E[`${id}---false`]]) {
        code += " else {\n";
        code += Parse(N[E[`${id}---false`]], E[`${id}---false`], N, E, indent+1);
        code += Indent(indent) + "}\n";
    } else {
        code += "\n";
    }

    return code;
}

export default {
    valid: conditionals,
    parse: Conditionals
}