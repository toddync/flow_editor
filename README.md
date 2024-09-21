![Screenshot from 2024-05-20 18-57-21](https://github.com/toddync/flow_editor/assets/102318495/4c4c0f07-b77c-4510-a427-839a86c5b724)

## What is Flow Editor?

Flow Editor is a node-based code editor designed to be language-agnostic, meaning it supports multiple programming and scripting languages.

## Why create Flow Editor?

Programming can be unnecessarily complicated due to language-specific syntax. While Flow Editor isn't intended to enable beginners to build complex projects like Google right away, it aims to simplify the coding experience. The tool abstracts syntax-related challenges, making it easier to transition between languages by simply changing the target language in the **compilation settings**\*.

Programming isn't about memorizing every detail of a specific language—it's about problem-solving and breaking down tasks into manageable, bite-sized chunks. Flow Editor helps visualize and solve these problems by organizing them into interconnected nodes, similar to solving a puzzle.

### Why use nodes?

Scratch successfully abstracted many complexities for young learners, but blocks are outdated and overly simplistic for modern use.

Nodes offer a more intuitive way to visualize data flow. By following the connections and arrows between nodes, users can easily trace how data moves from one point to another. This level of visualization is something Scratch couldn’t fully achieve, and nodes provide an improved mechanism for organizing complex logic.

## How does it work?

The web interface allows you to add nodes and connect them using edges. Currently, the web interface supports exporting your Flow as an SVG (to maintain quality), so you can use it for presentations, code explanations, or even as decoration—your choice.

Once the Flow is designed, the transpiler  takes over. It processes the nodes, organizes the structure, and uses node metadata (viewable by connecting any node to a logger node) to generate the final code. At the moment, the transpiler only outputs JavaScript. While templates are modular and could theoretically support other languages, there is no guarantee of future support for heavily typed languages like Rust.

### Why templates?

Templates are key to making the code modular and easily extensible. They allow for future growth by enabling users to add support for languages that are not currently integrated, but for now, the only available output is JavaScript.

---

# Glossary

\*: Not implemented yet.

## Development Progress:

- [ ]  Add all basic nodes
  - [X]  Variables
    - [X]  Declaration
    - [X]  Update
  - [ ]  Conditionals
    - [X]  If / Else
    - [ ]  Switch Case
  - [X]  Loops
    - [X]  For
    - [X]  While
    - [X]  Do While
  - [ ]  Functions
    - [ ]  Declaration
    - [ ]  Calling
- [X]  Exports
  - [X]  Image (SVG)
  - [X]  JSON schema
  - [X]  Source code (JavaScript)
