//@ts-nocheck
export const V1 = (N, E) => {
	let code = "";
	N = normalize("N", N);
	E = normalize("E", E);

	console.log({ N, E });
};

function normalize(T, V) {
	let _ = {};

	if (T == "N") {
		V.forEach((e) => {
			_[e.id] = { data: e.data, node: e.type };
		});
	} else if (T == "E") {
		V.forEach((e) => {
			_[e.source] = { target: e.target, handle: e.sourceHandle };
		});
	}

	return _;
}
