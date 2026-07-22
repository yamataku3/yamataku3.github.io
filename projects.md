---
layout: default
title: Projects
permalink: /projects/
---

<h2 class="section-title">Research Projects</h2>

<div class="project-feed">
{% assign projects_sorted = site.projects | sort: "year" | reverse %}
{% for project in projects_sorted %}
<div class="project-feed-item">
  {% if project.external_link %}
  <a class="project-feed-link" href="{{ project.external_link }}" target="_blank" rel="noopener">
  {% else %}
  <a class="project-feed-link" href="{{ project.url | relative_url }}">
  {% endif %}
    <div class="project-feed-thumb">
      {% if project.image %}
      <img src="{{ project.image | relative_url }}" alt="{{ project.title }}">
      {% else %}
      <span>🔬</span>
      {% endif %}
    </div>
    <div class="project-feed-body">
      <h3>{{ project.title }}</h3>
      <p class="project-feed-desc">{{ project.description }}</p>
      {% if project.venue %}
      <p class="project-feed-meta">{{ project.venue }}</p>
      {% endif %}
    </div>
  </a>
  {% if project.card_links %}
  <div class="project-links project-feed-links">
    {% for link in project.card_links %}
    <a href="{{ link.url }}" target="_blank">{{ link.label }}</a>
    {% endfor %}
  </div>
  {% endif %}
</div>
{% endfor %}
</div>
