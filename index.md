---
layout: default
title: About
---

<div class="profile">
  <div class="profile-photo-placeholder">👤</div>
  <div>
    <h1 class="profile-name">Your Name</h1>
    <p class="profile-position">PhD Student · Department of Computer Science<br>University Name</p>
    <p>
      Brief introduction about your research interests. For example:<br>
      I am a researcher working on <strong>natural language processing</strong> and <strong>machine learning</strong>.
      My research focuses on building robust language models that can reason across domains.
    </p>
    <div class="profile-links">
      <a href="mailto:{{ site.email }}">✉ Email</a>
      <a href="https://github.com/{{ site.author.github }}" target="_blank">GitHub</a>
      {% if site.author.google_scholar != "" %}
      <a href="https://scholar.google.com/citations?user={{ site.author.google_scholar }}" target="_blank">Google Scholar</a>
      {% endif %}
      {% if site.author.orcid != "" %}
      <a href="https://orcid.org/{{ site.author.orcid }}" target="_blank">ORCID</a>
      {% endif %}
      <a href="{{ '/cv/' | relative_url }}">CV</a>
    </div>
  </div>
</div>

## Research Interests

- Natural Language Processing
- Machine Learning
- Knowledge Representation

## News

<ul class="news-list">
  <li>
    <span class="news-date">2026-07</span>
    <span>Paper accepted at ACL 2026.</span>
  </li>
  <li>
    <span class="news-date">2026-05</span>
    <span>Presented work at Workshop on Reasoning in NLP.</span>
  </li>
  <li>
    <span class="news-date">2025-09</span>
    <span>Started PhD program at University Name.</span>
  </li>
</ul>
