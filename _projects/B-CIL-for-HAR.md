---
layout: project
title: "Blurry Class Incremental Learning for IMU-based HAR"
year: 2026
venue: "EMBC2026"
image: /assets/teasers/project_BCIL_HAR.jpg
tags: [Research]
pdf: /assets/slides/BlurryCILforHAR.pdf
authors:
  - "Takumi Yamamoto"
  - "Suguru Kanoga"
  - "Mitsunori Tada"
  - "Yuta Sugiura"
abstract: >
  Inertial measurement unit (IMU)-based human activity recognition (HAR) has attracted considerable attention, leading to a growing demand for systems that support long-term deployment. In such scenarios, user requirements may evolve over time, necessitating the ability to recognize additional activity classes. Class-incremental learning (CIL) offers a promising approach by enabling models to incorporate new classes without retraining from scratch. Although previous studies have examined CIL in the context of HAR, they have largely overlooked cases where the same classes reappear across different tasks–a setting known as the Blurry class-incremental learning (B-CIL) scenario. In this work, we investigate the B-CIL scenario for IMU-based HAR and conduct extensive experiments on two widely used IMU datasets (UCI-HAR and USC-HAD).We evaluate nine continual learning methods under multiple configurations of overlapping classes. Our results demonstrate that replay-based methods consistently outperform regularization-based methods in the B-CIL scenario. Furthermore, we observe that increasing the number of overlapping classes can lead to improved performance. In the future, we aim to extend our study to additional datasets and explore more realistic blurry scenarios, including online continual learning.
---
<!-- # links:
#   - label: "Paper (DOI)"
#     url: "https://ieeexplore.ieee.org/document/10871083/"
# # citation: >
# #   Takumi Yamamoto, Suguru Kanoga, Mitsunori Tada, and Yuta Sugiura. 2025. Comparison of Nine
# #   Deep Regressors in Continuous Blood Pressure Estimation Using
# #   Single-Channel Photoplethysmograms under the PulseDB. In 2025 IEEE/SICE
# #   International Symposium on System Integration (SII '25).
# #   https://ieeexplore.ieee.org/document/10871083/
# card_links:
#   - label: "DOI"
#     url: "https://ieeexplore.ieee.org/document/10871083/"
--- -->
