<script>
	const isTauri = "__TAURI_INTERNALS__" in window;
</script>

<span class="hidden bg-black/80" />
<div
	class="
		backdrop-blur-md bg-clip-padding rounded-md backdrop-filter bg-black{isTauri
		? '/80'
		: '/10'} *:bg-transparent {$$props.class}"
>
	<slot />
</div>
