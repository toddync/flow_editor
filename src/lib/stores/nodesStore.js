import { writable } from "svelte/store";

export const Nodes = writable([
	{
		type: "StartNode",
		id: "StartNode",
		data: {},
		position: {
			x: 0,
			y: 0
		}
	}
]);
