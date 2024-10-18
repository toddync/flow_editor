<script>
	const isTauri = "__TAURI_INTERNALS__" in window;
</script>

<span class="hidden bg-black/60" />
<div
	class="
		backdrop-blur-sm bg-clip-padding rounded-md backdrop-filter bg-black{isTauri
		? '/60'
		: '/10'} *:bg-transparent {$$props.class}"
>
	<slot />
</div>
