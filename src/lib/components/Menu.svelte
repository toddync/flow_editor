<script lang="ts">
	//@ts-nocheck
	import { Panel } from "@xyflow/svelte";
	import ImageDownload from "./ImageDownload.svelte";
	import JsonDownload from "./JsonDownload.svelte";
</script>

<Panel position="top-right">
	<ImageDownload />
	<JsonDownload />
</Panel>
