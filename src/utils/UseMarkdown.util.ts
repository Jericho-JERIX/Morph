import { readFileSync } from "fs";

const baseMarkdownResource = "src/resources/"

export function useMarkdown(parentPath: string) {
    return (filename: string) => (readFileSync(`${baseMarkdownResource}/${parentPath}/${filename}`, "utf-8"))
}