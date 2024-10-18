//@ts-nocheck
import {
    getNodesBounds,
    getViewportForBounds
} from "@xyflow/svelte";
import { toPng } from "html-to-image";
import download from "./download";

function imageDown(nodes){
		const scale = 1;
		let imageWidth = 1024 * scale;
		let imageHeight = 768 * scale;

		const nodesBounds = getNodesBounds(nodes);
		const viewport = getViewportForBounds(
			nodesBounds,
			imageWidth,
			imageHeight,
			0.5,
			2.0,
			0.2
		);

		const viewportDomNode = document.querySelector(
			".svelte-flow__viewport",
		)!;

		if (viewport) {
			toPng(viewportDomNode, {
				backgroundColor: "#000",
				width: imageWidth,
				height: imageHeight,
				quality: 1,
				pixelRatio: 4,
				style: {
					width: `${imageWidth}px`,
					height: `${imageHeight}px`,
					transform: `translate(${viewport.x}px, ${viewport.y}px) scale(${viewport.zoom})`,
					// "background-image": "linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px)",
					// "background-size": "50px 50px",
				}
			  })
			.then((dataUrl) => {
				download(dataUrl, "svelte-flow.png", true);
			});
		}
	}

export default imageDown;
