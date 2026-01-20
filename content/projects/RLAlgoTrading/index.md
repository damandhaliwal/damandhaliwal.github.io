---
title: "Deep Hedging with Non-Parametric Volatility Surfaces and Explicit Forecasting" 
date: 2025-12-09
tags: ["Deep Reinforcement Learning", "Options Hedging", "Volatility Surface", "Autoencoder", "LSTM", "Quantitative Finance", "Black-Scholes"]
author: "Daman Dhaliwal"
description: "This paper develops a novel deep hedging framework trained on real SPY options data, using autoencoder-compressed volatility surfaces and LSTM forecasting to learn optimal hedging strategies." 
summary: "A three-stage deep hedging architecture combining autoencoder compression, LSTM forecasting, and reinforcement learning achieves up to 46% improvement over Black-Scholes delta hedging for put options using real market data from 2011-2023." 
#cover:
#    image: "paper3.png"
#    alt: "Image caption"
#    relative: false
editPost:
    URL: "https://damandhaliwal.me/projects"
    Text: "Working Paper"

---

---

##### Download

+ [Paper](RLAlgoTrading.pdf)
+ [Code](https://github.com/damandhaliwal/RLAlgoTrading)

---

##### Abstract
Options hedging remains critical to quantitative finance, yet traditional Black-Scholes delta hedging relies on assumptions—constant volatility, continuous rebalancing, no transaction costs—that rarely hold in practice. This paper proposes a novel deep hedging framework trained directly on real SPY options data from 2011 to 2023, providing agents access to the same information available to human traders: the full implied volatility surface structure. The architecture comprises three stages: (1) an autoencoder that compresses the 374-dimensional volatility surface into a compact latent representation, (2) an LSTM network that forecasts future volatility dynamics, and (3) a reinforcement learning agent that learns optimal hedging policies. Empirical results demonstrate that the RL framework consistently outperforms Black-Scholes delta hedging for put options, reducing mean squared hedging error by up to 46%. The latent representation proves superior to using the full surface directly, while explicit forecasting improves performance only in controlled synthetic environments—suggesting real-world volatility dynamics are too complex for the LSTM to reliably capture. Robustness checks reveal strong performance in bull and boom regimes but significant degradation during crashes, highlighting the challenge of generalizing to extreme market conditions not well-represented in training data.

---

##### Related material