//@ts-nocheck
import {
    getNodesBounds,
    getViewportForBounds
} from "@xyflow/svelte";
import { toPng } from "html-to-image";
import download from "./download";

function imageDown(nodes){
		const scale = 2;
		let imageWidth = 1024 * scale;
		let imageHeight = 768 * scale;

		const nodesBounds = getNodesBounds(nodes);
		const viewport = getViewportForBounds(
			nodesBounds,
			imageWidth,
			imageHeight,
			0.5,
			2.0,
			0.9,
		);

		const viewportDomNode = document.querySelector(
			".svelte-flow__viewport",
		)!;

		if (viewport) {
			toPng(viewportDomNode, {
				backgroundColor: "#fff",
				width: imageWidth,
				height: imageHeight,
				style: {
					width: `${imageWidth}px`,
					height: `${imageHeight}px`,
					transform: `translate(${viewport.x}px, ${viewport.y}px) scale(${viewport.zoom})`,
				},
			}).then((dataUrl) => {
				download(dataUrl, "svelte-flow.png", true);
			});
		}
	}

export default imageDown;
