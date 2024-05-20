//@ts-nocheck
const loops = ["ForNode"];
const conditionals = ["IfNode"];
const variables = ["VarNode", "UpdateVar"];
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
	}

	if (conditionals.includes(n.node)) {
		code += indent(indentLvl) + Conditionals(n, t, N, E);
		indentLvl--;
	}

	if (variables.includes(n.node)) {
		n.data.vars.map((v) => {
			if (v.type) {
				code += `${indent(indentLvl)}${v.type} ${v.name} = ${
					v.value
				};\n`;
			} else {
				code += `${indent(indentLvl)}${v.name} = ${v.value};\n`;
			}
		});
	}

	E[`${t}---next`] &&
		(code += Parse(N[E[`${t}---next`]], E[`${t}---next`], N, E));

	return code;
}

function Loops(Node, id, N, E) {
	let code = "";
	indentLvl++;
	if (Node.node.toLowerCase().includes("for")) {
		code += `for(${Node.data.initialization}; ${Node.data.condition}; ${Node.data.refresh}){\n`;
	}

	if (N[E[`${id}---start`]]) {
		code += Parse(N[E[`${id}---start`]], E[`${id}---start`], N, E);
	}

	code += indent(indentLvl - 1) + "}\n";

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
	while (lvl > 0) {
		_ += "    ";
		lvl--;
	}

	return _;
}
