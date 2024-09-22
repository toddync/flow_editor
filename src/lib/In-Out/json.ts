//@ts-nocheck
import download from "./download";

const isTauri = "__TAURI_INTERNALS__" in window

function JsonDown(nodes, edges) {
	if(!isTauri){
		download(
			"data:text/plain;charset=utf-8," +
				encodeURIComponent(
					JSON.stringify({Nodes: nodes, Edges: edges }, null, 2)
				),
			"svelte-flow.json",
		);
		return
	}

	download(
		JSON.stringify({Nodes: nodes, Edges: edges }, null, 4),
		"svelte-flow.json",
	);
}

export default JsonDown
