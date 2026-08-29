# Chess

This is a web recreation of the classical board game, "Chess". 
The intended purpose of this project is to challenge myself by focusing on strict software development principles found in real world software development, additionally I am a big proponent of "showing rather than telling".  


Ultimately I would like to have something you can actually interact with anywhere in the world, considering virtually every device supports browsing the web. it doesn't matter where you are since you will likely be able to view this project interactively with no-hassle. In the modern age of the internet everything is demanding our attention, and I don't want to take any more of it than I need to.

&lt; IMAGE HERE &gt;
## Professional Development Goals

- [ ] Using Planning And Organizational Tools To Smooth Out The Development Process
- [ ] Committing To Time Tracking And Daily Project Logs To Understand The Progression Of The Project
- [ ] Utilizing Good VCS Conventions
- [ ] Utilizing Test Driven Development (TDD) 
- [ ] Creating Well Documented Software
- [ ] Using Standard Software Development Practice
- [ ] Documenting My Research So Others Can Learn From It

## Project Development Goals

- [ ] Creating A Bug-Free Version Of Chess
- [ ] Setting Up Unit Tests To Prevent Regressions
- [ ] Generating Heuristics For A Chess Engine 
- [ ] Implementing AB-Pruning For The Minimax Function 
- [ ] FIDE-Compliance Excluding Over-The-Board Rules

- [ ] Features
  - [ ] FEN/PGN Import/Export
  - [ ] Undo/Redo
  - [ ] Play As White Or Black
  - [ ] Allow For Underpromotion
  - [ ] Real-Time Engine Evaluation
  - [ ] A Working AI

### Stretch Goals

- [ ] Setting Up A VPS To Enable Multiplayer Networking
- [ ] Setting Up Multiplayer Networking
  - [ ] Lobbies
  - [ ] Disconnection/Reconnection Handling
  - [ ] Using Websockets 
- [ ] Porting The Engine To Rust And Compiling As A "C-Dynamic Library" To Enable It To Be Used Elsewhere
  - [ ] Speeding Up The Engine With Rust WASM 
- [ ] Speeding Up The Engine With Bitboards
- [ ] Creating A Database That Allows For Analytical Improvements To The Engine By Storing Opt-In Submitted PGNs And Player Data

## Setting Up The Developer Environment

> [!NOTE]  
> It's worth noting that you can choose not to follow the setup steps, as they are not required.  
> If you wish you can instead use a globally installed TypeScript compiler, as well as your own HTTP Server.     
> Regardless of what you choose it's recommended to use a file watcher in tandem with the TypeScript compiler,   
> or use the built in `--watch` flag, as well as a server with live reload.  

### Recommended Developer Dependencies:

- [`^10.0.5 <concurrently>`](https://www.npmjs.com/package/concurrently)
- [`^1.2.2 <live-server>`](https://www.npmjs.com/package/live-se\rver)
- [`^7.0.2 <typescript>`](https://www.npmjs.com/package/typescript)

### Setup Steps

1. Install the developer dependencies (recommended)

```
npm install
```

2. Running the development command (recommended)

```
npm run dev
```