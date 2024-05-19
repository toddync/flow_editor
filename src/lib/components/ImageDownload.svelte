<script lang="ts">
	//@ts-nocheck
	import {
		getNodesBounds,
		getViewportForBounds,
		useNodes
	} from "@xyflow/svelte";
	import { toJpeg, toPng, toSvg } from "html-to-image";
	import { ImageDown } from "lucide-svelte/icons";
	import { Button } from "./ui/button";

	const nodes = useNodes();

	const scale = 3;
	const imageWidth = 1024 * scale;
	const imageHeight = 768 * scale;

	function handleClick() {
		const nodesBounds = getNodesBounds($nodes);
		const viewport = getViewportForBounds(
			nodesBounds,
			imageWidth,
			imageHeight,
			0.5,
			2.0,
			0.9
		);

		const viewportDomNode = document.querySelector<HTMLElement>(
			".svelte-flow__viewport"
		)!;

		if (viewport) {
			toSvg(viewportDomNode, {
				width: imageWidth,
				height: imageHeight,
				style: {
					width: `${imageWidth}px`,
					height: `${imageHeight}px`,
					position: "absolute",
					transform: `translate(${viewport.x}px, ${viewport.y}px) scale(${viewport.zoom})`
					// "background-image": `url("http://localhost:5173/back.png")`
				}
			}).then((dataUrl) => {
				const link = document.createElement("a");
				link.download = "svelte-flow.png";
				link.href = dataUrl;
				link.click();
			});
		}
	}
</script>

<Button
	size="icon"
	class="bg-black/10 backdrop-blur-sm border hover:bg-accent"
	on:click={handleClick}
>
	<p class="sr-only">Download Flow as SVG</p>
	<ImageDown class="size-6 text-foreground" />
</Button>
