---
layout: default
title: About
---

<div class="lang-toggle">
  <button type="button" class="lang-btn active" data-lang="en">EN</button>
  <button type="button" class="lang-btn" data-lang="ja">日本語</button>
</div>

<div class="profile">
  <img class="profile-photo" src="{{ '/assets/me/me.JPG' | relative_url }}" alt="Takumi Yamamoto">
  <div>
    <h1 class="profile-name">
    <span class="lang-en">Takumi Yamamoto</span><span class="lang-ja" hidden>山本 匠</span></h1>
    <p class="profile-position">
      <span class="lang-en">PhD Student · Department of Computer Science<br>Keio University</span><span class="lang-ja" hidden>慶應義塾大学大学院開放環境科学専攻情報工学専修 博士課程3年</span>
    </p>
    <p>
      <span class="lang-en">I am a researcher working on <strong>Human Computer Interaction</strong> and <strong>Digital Fabrication</strong>. My research focuses on developing novel fabrication and interaction method.</span><span class="lang-ja" hidden><strong>ヒューマン・コンピュータ・インタラクション（HCI）</strong>と<strong>デジタル・ファブリケーション</strong>分野の研究をしています。</span>
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

<!-- ## <span class="lang-en">Research Interests</span><span class="lang-ja" hidden>研究分野</span>

- <span class="lang-en">Human Computer Interaction</span><span class="lang-ja" hidden>ヒューマンコンピュータインタラクション</span> -->

## <span class="lang-en">News</span><span class="lang-ja" hidden>お知らせ</span>

<ul class="news-list">
{% assign news_sorted = site.data.news | sort: "date" | reverse %}
{% assign news_recent = news_sorted | slice: 0, 5 %}
{% for item in news_recent %}
  <li>
    <span class="news-date">{{ item.date }}</span>
    <span><span class="lang-en">{{ item.en }}</span><span class="lang-ja" hidden>{{ item.ja }}</span></span>
  </li>
{% endfor %}
</ul>

{% if news_sorted.size > 5 %}
<div class="news-more">
  <a href="{{ '/news/' | relative_url }}">
    <span class="lang-en">View all news →</span><span class="lang-ja" hidden>お知らせ一覧を見る →</span>
  </a>
</div>
{% endif %}

<script src="{{ '/assets/js/lang-toggle.js' | relative_url }}"></script>
