import { Indent, Parse, type EdgeMap, type Node, type NodeMap } from "../transpiler";

const functions = ["FunctionNode"];

/**
 * Generates code for function nodes.
 * @param Node - The function node.
 * @param id - The current node's ID.
 * @param N - The node map.
 * @param E - The edge map.
 * @param indent - The indentation level.
 * @returns The generated function code as a string.
 */
function Functions(Node: Node, id: string, N: NodeMap, E: EdgeMap, indent: number = 0): string {
    let code = "";

    // Generate function declaration code
    if (Node.type.toLowerCase().includes("function")) {
        code += `function ${Node.data.name}(`
        Node.data.params?.forEach((p, i) => {
            code += i > 0 ? ", " : ""
            code += p.name
        })
        code += `){\n`;
    }

    // Parse any nested nodes
    if (N[E[`${id}---start`]]) {
        code += Parse(N[E[`${id}---start`]], E[`${id}---start`], N, E, indent+1);
    }

    code += Indent(indent) + "}\n";

    return code;
}

export default {
    valid: functions,
    parse: Functions
}