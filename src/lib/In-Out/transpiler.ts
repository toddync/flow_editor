import js from "./js";

// Define the types for node structures
export interface Node {
    id: string;
    type: string;
    data: {
        name?: string;
        value?: string;
        const?: boolean;
        condition?: string;
        initialization?: string;
        refresh?: string;
        params?: {id: string, name: string}[];
    };
}

export interface Edge {
    source: string;
    sourceHandle: string;
    target: string;
}

export interface NodeMap {
    [id: string]: Node; // Maps node IDs to Node objects
}

export interface EdgeMap {
    [key: string]: string; // Maps edge keys (e.g., "source---handle") to target node IDs
}

/**
 * Transpiles the node and edge data into JavaScript code.
 * @param N - The node array.
 * @param E - The edge array.
 * @returns The generated JavaScript code as a string.
 */
export function Transpile(N: Node[], E: Edge[]): string {
    console.clear();
    let code: string = "";
    let next: string = "StartNode---next";

    // Normalize nodes and edges
    let {Nm, Em} = Normalize(N, E);

    let t: string = Em[next];
    next = t && `${t}---next`;

    // Check if the next node exists
    if (!Nm[t]) {
        console.error(`Error: Node ${t} not found.`);
        return "";
    }

    let n: Node = Nm[t];
    code = Parse(n, t, Nm, Em);

    console.log(code);
    return code;
};

/**
 * Parses a node and generates corresponding code.
 * @param n - The current node.
 * @param t - The current node's ID.
 * @param N - The node map.
 * @param E - The edge map.
 * @returns The generated code as a string.
 */
export function Parse(n: Node, t: string, N: NodeMap, E: EdgeMap, indent: number = 0): string {
    let code: string = "";

    js.forEach( parser => {
        if(parser.valid.includes(n.type)){
            code += Indent(indent) + parser.parse(n, t, N, E, indent)
        }
    })

    // Check for next node
    const nextNodeKey = `${t}---next`;
    if (E[nextNodeKey]) {
        code += Parse(N[E[nextNodeKey]], E[nextNodeKey], N, E, indent);
    }

    return code;
}

/**
 * Normalizes node and edge data into a more manageable format.
 * @param N - The array of nodes.
 * @param E - The array of edges.
 * @returns The mapped data as an object.
 */
export function Normalize(N: Node[], E: Edge[]): {Nm: NodeMap, Em: EdgeMap} {
    let Em: EdgeMap = {};
    let Nm: NodeMap = {};

    N.forEach((e: Node) => Nm[e.id] = { id: e.id, data: e.data, type: e.type });

    E.forEach((e) => Em[`${e.source}---${e.sourceHandle}`] = e.target);
    
    return {Nm, Em};
}

/**
 * Generates indentation based on the current level.
 * @param lvl - The current indentation level.
 * @returns The indentation string.
 */
export function Indent(lvl: number): string {
    let indentation = "";
    console.log(lvl)
    for (let i = 0; i < lvl; i++) {
        indentation += "    "; // 4 spaces for each level
    }
    return indentation;
}
