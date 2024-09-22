//@ts-nocheck
import { Transpile } from "$lib/transpiler";
import download from "./download";

const isTauri = "__TAURI_INTERNALS__" in window

function CodeDown(nodes, edges) {
    if(!isTauri){
        download(
			"data:text/plain;charset=utf-8," +
				encodeURIComponent(Transpile(nodes, edges)),
			"svelte-flow.js",
		);
        return
    }

    download(
        Transpile(nodes, edges),
        "svelte-flow.js"
    );
}

export default CodeDown
