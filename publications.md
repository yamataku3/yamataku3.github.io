---
layout: default
title: Publications
permalink: /publications/
---

<h2 class="section-title">Publications</h2>

<div class="pub-controls">
  <span class="pub-controls-label">Sort by:</span>
  <button type="button" class="pub-sort-btn active" data-sort="category">Category</button>
  <button type="button" class="pub-sort-btn" data-sort="year">Year</button>
</div>

<div id="pubs-by-category">
{% assign pub_types = "Journal|International Conference (Paper)|International Conference (Demo/Poster)|Domestic Conference" | split: "|" %}
{% assign pub_prefixes = "J|I|D|DC" | split: "|" %}
{% for pub_type in pub_types %}
{% assign prefix = pub_prefixes[forloop.index0] %}
{% assign pubs_in_type = site.data.publications | where: "type", pub_type | sort: "year" | reverse %}
{% if pubs_in_type.size > 0 %}
<h3 class="section-title" style="font-size:1.1rem">{{ pub_type }} x{{ pubs_in_type.size }}</h3>
<ul class="pub-list">
{% for pub in pubs_in_type %}
<li class="pub-item" data-year="{{ pub.year }}" data-type="{{ pub_type }}">
  <div class="pub-title">[{{ prefix }}{{ forloop.index }}] {{ pub.title }}</div>
  <div class="pub-authors">{{ pub.authors | markdownify | remove: "<p>" | remove: "</p>" | strip }}</div>
  <div class="pub-venue">{{ pub.venue }}</div>
  {% if pub.links and pub.links.size > 0 or pub.project %}
  <div class="pub-badges">
    {% for link in pub.links %}
    <a href="{{ link.url }}" class="badge {{ link.badge }}" target="_blank">{{ link.label }}</a>
    {% endfor %}
    {% if pub.project %}
    <a href="{{ '/projects/' | append: pub.project | append: '/' | relative_url }}" class="badge badge-project">Project Page</a>
    {% endif %}
  </div>
  {% endif %}
</li>
{% endfor %}
</ul>
{% endif %}
{% endfor %}
</div>

<div id="pubs-by-year" style="display:none"></div>

<div class="pub-extras">
  <details class="pub-chart-details">
    <summary>Show graph</summary>
    <div class="pub-chart-wrap">
      <div id="pub-chart" role="img" aria-label="Stacked bar chart of publications per year, broken down by category"></div>
      <div class="pub-chart-legend" id="pub-chart-legend"></div>
    </div>
  </details>

  <details class="pub-table-details">
    <summary>Show as table</summary>
    <table class="pub-table">
      <thead>
        <tr><th>Year</th><th>Journal</th><th>Conference</th><th>Demo/Poster</th><th>Domestic</th><th>Total</th></tr>
      </thead>
      <tbody>
        {% assign years_desc = site.data.publications | map: "year" | uniq | sort | reverse %}
        {% for y in years_desc %}
        {% assign pubs_y = site.data.publications | where: "year", y %}
        {% assign j = pubs_y | where: "type", "Journal" | size %}
        {% assign i = pubs_y | where: "type", "International Conference (Paper)" | size %}
        {% assign d = pubs_y | where: "type", "International Conference (Demo/Poster)" | size %}
        {% assign dc = pubs_y | where: "type", "Domestic Conference" | size %}
        <tr>
          <td>{{ y }}</td><td>{{ j }}</td><td>{{ i }}</td><td>{{ d }}</td><td>{{ dc }}</td><td>{{ pubs_y.size }}</td>
        </tr>
        {% endfor %}
      </tbody>
    </table>
  </details>
</div>

<script src="{{ '/assets/js/publications.js' | relative_url }}"></script>
