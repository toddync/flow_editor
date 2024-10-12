//@ts-nocheck
const variables = ["VarNode", "UpdateVar", "Variable"];
const loops = ["ForNode", "WhileNode", "DoWhileNode"];
const functions = ["FunctionNode"];
const conditionals = ["IfNode"];
let indentLvl = 0;

export const Transpile = (N, E) => {
	console.clear();
	let code = "";
	let next = "StartNode---next";
	N = normalize("N", N);
	E = normalize("E", E);

	let t = E[next];
	next = t && `${t}---next`;

	let n = N[t];
	code = Parse(n, t, N, E);

	console.log(code);
	return code;
};

function Parse(n, t, N, E) {
	let code = "";

	if (loops.includes(n.node)) {
		code += indent(indentLvl) + Loops(n, t, N, E);
		indentLvl--;
	} else if (conditionals.includes(n.node)) {
		code += indent(indentLvl) + Conditionals(n, t, N, E);
		indentLvl--;
	} else if (variables.includes(n.node)) {
        code += `${indent(indentLvl)}${n.data.const ? "const" : "let"} ${n.data.name} = ${
            n.data.value
        };\n`;
	} else if (functions.includes(n.node)) {
		code += indent(indentLvl) + Functions(n, t, N, E);
		indentLvl--;
	}
	E[`${t}---next`] &&
		(code += Parse(N[E[`${t}---next`]], E[`${t}---next`], N, E));

	return code;
}

function Loops(Node, id, N, E) {
	let code = "";
	indentLvl++;
	if (Node.node == "ForNode") {
		code += `for(${Node.data.initialization}; ${Node.data.condition}; ${Node.data.refresh}){\n`;
	}

	if (Node.node == "WhileNode") {
		code += `while(${Node.data.condition}){\n`;
	}

	if (Node.node == "DoWhileNode") {
		code += `do{\n`;
	}

	if (N[E[`${id}---start`]]) {
		code += Parse(N[E[`${id}---start`]], E[`${id}---start`], N, E);
	}

	if (Node.node == "DoWhileNode") {
		code += indent(indentLvl - 1) + `} while(${Node.data.condition})\n`;
	} else {
		code += indent(indentLvl - 1) + "}\n";
	}

	return code;
}

function Conditionals(Node, id, N, E) {
	let code = "";
	indentLvl++;
	if (Node.node.toLowerCase().includes("if")) {
		code += `if(${Node.data.condition}){\n`;
	}

	if (N[E[`${id}---true`]]) {
		code += Parse(N[E[`${id}---true`]], E[`${id}---true`], N, E);
	}

	code += indent(indentLvl - 1) + "}";

	if (N[E[`${id}---false`]]) {
		code += " else {\n";
		code += Parse(N[E[`${id}---false`]], E[`${id}---false`], N, E);
		code += indent(indentLvl - 1) + "}\n";
	} else {
		code += "\n";
	}

	return code;
}

function Functions(Node, id, N, E) {
	let code = "";
	indentLvl++;

	if (Node.node.toLowerCase().includes("function")) {
		code += `function ${Node.data.name}(${Node.data.params}){\n`;
	}

	if (N[E[`${id}---start`]]) {
		code += Parse(N[E[`${id}---start`]], E[`${id}---start`], N, E);
	}

	code += indent(indentLvl - 1) + "}\n";

	return code;
}

function normalize(T, V) {
	let _ = {};
	if (T == "N") {
		V.forEach((e) => {
			_[e.id] = { data: e.data, node: e.type };
		});
	} else if (T == "E") {
		V.forEach((e) => {
			_[`${e.source}---${e.sourceHandle}`] = e.target;
		});
	}
	return _;
}

function indent(lvl) {
	let _ = "";
	for (let i = lvl; i > 0; i--) {
		_ += "    ";
	}
	return _;
}
