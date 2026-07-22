---
layout: default
title: Publications
permalink: /publications/
---

<h2 class="section-title">Publications</h2>

<ul class="pub-list">
{% assign pubs_sorted = site.data.publications | sort: "year" | reverse %}
{% for pub in pubs_sorted %}
<li class="pub-item">
  <div class="pub-title">{{ pub.title }}</div>
  <div class="pub-authors">{{ pub.authors | markdownify | remove: "<p>" | remove: "</p>" | strip }}</div>
  <div class="pub-venue">{{ pub.venue }}</div>
  {% if pub.links %}
  <div class="pub-badges">
    {% for link in pub.links %}
    <a href="{{ link.url }}" class="badge {{ link.badge }}" target="_blank">{{ link.label }}</a>
    {% endfor %}
  </div>
  {% endif %}
</li>
{% endfor %}
</ul>
