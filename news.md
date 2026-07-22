---
layout: default
title: News
permalink: /news/
---

<div class="lang-toggle">
  <button type="button" class="lang-btn active" data-lang="en">EN</button>
  <button type="button" class="lang-btn" data-lang="ja">日本語</button>
</div>

<h2 class="section-title"><span class="lang-en">News</span><span class="lang-ja" hidden>お知らせ</span></h2>

<ul class="news-list">
{% assign news_sorted = site.data.news | sort: "date" | reverse %}
{% for item in news_sorted %}
  <li>
    <span class="news-date">{{ item.date }}</span>
    <span><span class="lang-en">{{ item.en }}</span><span class="lang-ja" hidden>{{ item.ja }}</span></span>
  </li>
{% endfor %}
</ul>

<script src="{{ '/assets/js/lang-toggle.js' | relative_url }}"></script>
