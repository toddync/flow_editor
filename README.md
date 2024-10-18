![Screenshot from 2024-05-20 18-57-21](https://github.com/toddync/flow_editor/assets/102318495/4c4c0f07-b77c-4510-a427-839a86c5b724)

## What is Flow Editor?

Flow Editor is a node-based code editor designed to be language-agnostic, meaning it supports multiple programming and scripting languages.

## Why create Flow Editor?

Programming can be unnecessarily complicated due to language-specific syntax. While Flow Editor isn't intended to enable beginners to build complex projects like Google right away, it aims to simplify the coding experience. The tool abstracts syntax-related challenges, making it easier to transition between languages by simply changing the target language in the **compilation settings**\*.

Programming isn't about memorizing every detail of a specific language—it's about problem-solving and breaking down tasks into manageable, bite-sized chunks. Flow Editor helps visualize and solve these problems by organizing them into interconnected nodes, similar to solving a puzzle.

### Why use nodes?

Scratch successfully abstracted many complexities for young learners, but blocks are outdated and overly simplistic for modern use.

Nodes offer a more intuitive way to visualize data flow. By following the connections and arrows between nodes, users can easily trace how data moves from one point to another. This level of visualization is something Scratch couldn’t fully achieve, and nodes provide an improved mechanism for organizing complex logic.

### How does it work?

The application allows you to add nodes and connect them with edges, creating a clear visual representation of your Flow. Once everything is in place, the compiler takes over and does the heavy lifting. It processes the nodes, organizes the structure, and uses node metadata (accessible by connecting any node to a logger node) to generate the final code.

At the moment, the compiler outputs JavaScript—because, well, JavaScript seems to have its hands in everything. The templating system is modular and can potentially support other languages in the future, though don’t expect Rust anytime soon. The generated code is structured based on your node connections, making it easy to review, adjust, and use directly in your projects.

### Why templates?

Templates are key to making the code modular and easily extensible. They allow for future growth by enabling users to add new nodes or support for languages that are not currently integrated.

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
    - [X]  Declaration
    - [ ]  Calling
- [X]  Exports
  - [X]  Image
  - [X]  JSON schema
  - [X]  Source code (JavaScript)
