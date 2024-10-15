import { writable } from "svelte/store";

export const Nodes = writable([
	{
		type: "StartNode",
		id: "StartNode",
		data: {
			context: "GLOBAL"
		},
		position: {
			x: 0,
			y: 0,
		},
	},
]);
