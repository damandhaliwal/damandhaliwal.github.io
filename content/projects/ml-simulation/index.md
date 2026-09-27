---
title: Marketplace ETA Intelligence
displayTitle: Marketplace ETA Intelligence
displaySummary: "From a delivery-time model to a complete local ML system: serving, monitoring, retraining, and rollback."
description: "A local machine learning system for delivery-time prediction and late-delivery risk, built with fully synthetic data."
topic: Machine learning systems
illustration: /images/projects/ml-system.svg
illustrationAlt: "A schematic connecting model training, prediction, observed outcomes, monitoring, and model improvement."
illustrationCaption: "System schematic · all data and predictions are synthetic"
featured: true
weight: 1
year: "2026"
status: Local system · Synthetic data
repository: https://github.com/damandhaliwal/ml-simulation
repositoryLabel: Explore the code
technologies: [Python, LightGBM, FastAPI, PostgreSQL, Docker]
question: "What happens after a model makes a prediction?"
---

## The problem

A good model is only one part of a useful ML system. Its inputs need a clear contract, predictions need to meet their eventual outcomes, and a new model needs a defensible reason to replace the old one.

I built a local delivery-time system to work through that entire loop, using an inspectable synthetic market instead of customer data.

## What I built

The system predicts delivery duration at order confirmation and separately estimates the risk of missing the promised deadline. LightGBM models sit behind a validated FastAPI service, with Docker packaging and PostgreSQL logging.

A replay harness sends orders through the actual API and joins predictions to outcomes only when those outcomes become available. Monitoring checks performance and input drift. A model registry supports challenger evaluation, promotion, and rollback.

## Decisions that matter

- **Respect time.** Chronological splits and label-availability cutoffs keep future outcomes out of training and evaluation inputs.
- **Make the contract explicit.** Python, CLI, and HTTP prediction share strict input validation. Invalid requests fail visibly.
- **Keep predictions traceable.** Saved artifacts carry checksums and metadata; logged predictions retain the model identity that produced them.
- **Earn an upgrade.** Evaluate challengers on an untouched window, inspect weak segments, and retain a route back to the previous model.

## What this demonstrates

The engineering around a model: reproducible training, serving, delayed outcomes, operational checks, and controlled model changes. Everything runs locally within a zero-dollar infrastructure budget.

The data, metrics, and predictions are fully synthetic. This is a production-style learning system; it does not establish real-world delivery accuracy or reliability at scale.
