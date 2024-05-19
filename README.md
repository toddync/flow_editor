![sample](https://github.com/toddync/flow_editor/assets/102318495/1907dd0f-c5b9-45c9-a848-0a24f8eefbae)


## What it is?

Flow Editor is, as the name implies, a node based editor for code. The intent is for it to be language-agnostic, allowing for you to use whatever programming/scripting language you might want

## Why it is?

I feel like programming, as it is, is too complicated. Obviously this isn't gonna make a toddler be able to build google from scratch, but I want this tool to at least abstract away the syntax shenanigans of the language, so the transition between two languages is as simple as clicking a button and changing the target language in the *compilation settings\** menu.

Also, programming isn't about knowing every detail of a single language, it is knowing how to solve problems, how to brake'em down into "bite-sized" chunks that you can solve one by one and just snap them together in the end like a puzzle... or like a series of nodes!

#### Why nodes?

I could sit here and say that I had a epiphany in the shower while talking to Jamal (my imaginary rubber duck), but the truth is way simpler: I think Scratch did a good job abstracting the bulk of the programming difficulties away from the tech starved kids. But blocks are for kids, and outdated.

Also, nodes can offer a better visualization of data flow in your code, making it easier to comprehend how does it get from point A to point B, which is something that I think scratch couldn't cover. With nodes, you just need to follow the connection lines, and they also have arrows indicating where the lines start and end.

## How does (will) it  work?

The web interface lets you add nodes to the Nodes array and connect them using edges that will be added to the Edges array, that's all the web interface will do for the time being, apart from enabling you to export your Flow as a SVG (to maintain quality), so you con use it in presentations, to explain your code, or just as decoration, do as you please.

After this, its the job of the compiler/transpiler (call it as you please, but transpiler is the best way to describe), it will take the arrays, organize them, and them use the nodes metadata (you can see the metadata by plugging any node into the logger node, the logger node doesn't have any metadata) to build the final code based on a series of *templates\**.

#### Why templates?

I'll use templates because it makes the code more modular and easier to expand in the future. Also, using well defined templates enables me to let the user add a template for a not yet supported language.

# glossary

\*: not implemented yet

## Development progress:

- [ ] Add all basic nodes
	- [x] Variables 
		- [x] Declaration
		- [x] Update
	- [ ] Conditionals
		- [x] If / Else
		- [ ] Switch case
	- [ ] Loops
		- [x] For
		- [ ] While
		- [ ] Do while
	- [ ] Functions
		- [ ] Declaration
		- [ ] Calling
- [ ] Exports
	- [x] Image (SVG)
	- [ ] Json schema
	- [ ] Source code
