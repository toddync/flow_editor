//@ts-nocheck
import { open } from "@tauri-apps/plugin-dialog";
import { readTextFile } from "@tauri-apps/plugin-fs";

// Prints file path or URI
const isTauri = "__TAURI_INTERNALS__" in window;

async function restore(e) {
	let Nodes = [],
		Edges = [];

	if (!isTauri) {
		const reader = new FileReader();

		return new Promise((resolve, reject) => {
			reader.readAsText(e.target.files[0]);

			reader.onload = function () {
				try {
					let data = JSON.parse(reader.result);
					Nodes = data.Nodes;
					Edges = data.Edges;
				} catch (e) {}

				resolve({ Nodes, Edges });
			};

			reader.onerror = () => resolve({ Nodes, Edges });
		});
	}

	const path = await open({
		multiple: false,
		directory: false,
	});

	if (path) {
		let content = await readTextFile(path);
		try {
			({ Nodes, Edges } = JSON.parse(content));
		} catch (e) {}
	}

	return { Nodes, Edges };
}

export default restore;
