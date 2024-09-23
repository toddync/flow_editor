import { writable } from "svelte/store";

export const Types = writable({
    int: 0,
    float: 0.1,
    string: "",
    char: '',
    object: {},
    array: [],
})
