<script lang="ts">
    //@ts-nocheck
    import Glass from "../Glass.svelte";
    import Handle from "$lib/components/nodes/Handle.svelte";
    import { Button } from "$lib/components/ui/button";
	import * as Card from "$lib/components/ui/card";
	import * as ContextMenu from "$lib/components/ui/context-menu";
    import Base from "./Base.svelte";
    import { ArrowRight } from "lucide-svelte";
    import Drag from "./Drag.svelte";
</script>

<Base>
    <ContextMenu.Root>
        <ContextMenu.Trigger>
            <Drag>
                <Glass>
                    <Card.Root>
                        <Card.Title class="font-jb m-10">
                            Test
                        </Card.Title>
                    </Card.Root>
                </Glass>
            </Drag>
        </ContextMenu.Trigger>
        <ContextMenu.Content>
            <ContextMenu.Sub>
                <ContextMenu.SubTrigger>Enter position</ContextMenu.SubTrigger>
                <ContextMenu.SubContent class="w-48 translate-x-[10px]">
                    <div class="p-10">
                        <Card.Root class="aspect-square mx-auto relative">
                            <Card.Content class="flex size-full p-0 relative">
                                <Card.Title class="my-auto mx-auto">
                                    ...
                                </Card.Title>
                                <Button
                                    class="bg-background rounded-sm backdrop-blur-md top-1/2 left-0 absolute -translate-y-1/2 -translate-x-1/2 size-8 border hover:bg-background hover:border-orange-800 transition-colors"
                                >
                                    <ArrowRight
                                        class="w-5 absolute -translate-y-1/2 -translate-x-1/2 top-1/2 left-1/2 text-foreground"
                                    />
                                </Button>
                                
                                <Button
                                    class="bg-background rounded-sm backdrop-blur-md top-0 left-1/2 absolute -translate-y-1/2 -translate-x-1/2 size-8 border hover:bg-background hover:border-orange-800 transition-colors"
                                >
                                    <ArrowRight
                                        class="w-5 absolute -translate-y-1/2 -translate-x-1/2 top-1/2 left-1/2 text-foreground rotate-90"
                                    />
                                </Button>

                                <Button
                                    class="bg-background rounded-sm backdrop-blur-md top-1/2 right-0 absolute -translate-y-1/2 translate-x-1/2 size-8 border hover:bg-background hover:border-orange-800 transition-colors"
                                >
                                    <ArrowRight
                                        class="w-5 absolute -translate-y-1/2 -translate-x-1/2 top-1/2 left-1/2 text-foreground rotate-180"
                                    />
                                </Button>

                                <Button
                                    class="bg-background rounded-sm backdrop-blur-md bottom-0 left-1/2 absolute translate-y-1/2 -translate-x-1/2 size-8 border hover:bg-background hover:border-orange-800 transition-colors"
                                >
                                    <ArrowRight
                                        class="w-5 absolute -translate-y-1/2 -translate-x-1/2 top-1/2 left-1/2 text-foreground -rotate-90"
                                    />
                                </Button>
                                
                            </Card.Content>
                        </Card.Root>
                    </div>
                </ContextMenu.SubContent>
              </ContextMenu.Sub>
        </ContextMenu.Content>
    </ContextMenu.Root>
</Base>