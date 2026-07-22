---
layout: default
title: Projects
permalink: /projects/
---

<h2 class="section-title">Research Projects</h2>

<div class="project-grid">
{% for project in site.data.projects %}
<div class="project-card">
  <h3>{{ project.title }}</h3>
  <p>{{ project.description }}</p>
  {% if project.tags %}
  <div class="project-tags">
    {% for tag in project.tags %}
    <span class="tag">{{ tag }}</span>
    {% endfor %}
  </div>
  {% endif %}
  {% if project.links %}
  <div class="project-links">
    {% for link in project.links %}
    <a href="{{ link.url }}" target="_blank">{{ link.label }}</a>
    {% endfor %}
  </div>
  {% endif %}
</div>
{% endfor %}
</div>
