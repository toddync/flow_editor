//@ts-nocheck
import { save } from "@tauri-apps/plugin-dialog";
import { writeFile, writeTextFile } from "@tauri-apps/plugin-fs";

const isTauri = "__TAURI_INTERNALS__" in window

async function download(content, name, img){
    if(!isTauri){
        let _ = document.createElement("a");
        _.setAttribute("href", content);
        _.setAttribute("download", name);
        _.click();
        return;
    }

    try {
        let selectedFilePath = await save({ defaultPath: name });

        if (selectedFilePath) {
            if(img){
                await writeFile(selectedFilePath, base2bin(content))
            } else {
                await writeTextFile(selectedFilePath, content);
            }
        }
    } catch (e) {}
}

function base2bin(base) {
    const data = base.replace(/^data:image\/\w+;base64,/, "");
    const binaryString = atob(data);

    const length = binaryString.length;
    const binaryArray = new Uint8Array(length);
    for (let i = 0; i < length; i++) binaryArray[i] = binaryString.charCodeAt(i);

    return binaryArray;
}

export default download
