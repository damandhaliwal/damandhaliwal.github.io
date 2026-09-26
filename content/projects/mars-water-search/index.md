---
title: Mars Water Search
displayTitle: Mars Water Search
displaySummary: "Four AI rovers, limited budgets, one discovery prize. An experiment in search, incentives, and collaboration."
description: "An interactive multi-agent experiment built at Sundai Club’s Wolfram Hack in Boston."
topic: Agents & decision-making
illustration: /images/projects/mars-search.svg
illustrationAlt: "An illustrative terrain map showing four rover paths around a hidden water deposit."
illustrationCaption: "Concept illustration · synthetic search environment, not a recorded run"
featured: true
weight: 2
year: "2026"
status: Sundai Club · Research prototype
repository: https://github.com/damandhaliwal/mars-water-search
repositoryLabel: Explore the code
technologies: [Python, React, TypeScript, Gemini, LangGraph, smolagents]
question: "When is sharing information worth the cost?"
---

## The experiment

Four AI rovers search a synthetic Martian landscape for a hidden water deposit. Each has a limited budget and a choice: explore independently, join an information pool, or buy private human guidance. Movement, observations, and drilling all cost credits. There is one discovery prize.

Built at [Sundai Club’s Wolfram Hack in Boston](https://www.sundai.club/events/boston/wolfram-hack), the project brings an economic question into an interactive agent environment: how do incentives and uncertainty shape the decision to collaborate?

## What I built

A React mission interface makes each rover’s evidence, path, budget, and action reasons visible. Python generates the world, validates actions, and settles rewards. Gemini chooses actions through smolagents tools; LangGraph coordinates simultaneous rounds and resumable interruptions.

The interface supports private and pooled belief maps, human adviser requests, explicit ground-truth revelation, final payouts, and recorded replay. Checkpoints and exported reports make a run inspectable after it ends.

## Decisions that matter

- **Separate choices from rules.** Language models decide what to try; the simulation enforces legal actions, information access, and budget accounting.
- **Keep hidden information hidden.** Rover inputs, adviser views, and presenter-only ground truth have distinct access boundaries.
- **Make interruptions recoverable.** Provider pauses and human requests preserve the round state, rather than discarding accepted decisions.
- **Show the basis for a decision.** Compare evidence, concise action reasons, spending, and outcomes through the interface and replay.

## What this demonstrates

An end-to-end agent experiment with an explicit economic environment, durable orchestration, and a human-facing interface.

This is a local research prototype using synthetic terrain and heuristic belief scores. It is not a geological model or a validated benchmark of optimal agent behavior. Repeated, comparable live experiments would be needed to draw conclusions about whether collaboration improves performance.
