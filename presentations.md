---
layout: page
title: Cours & Prez
description: 'Quelques présentations'
---

<div class="posts">
  {% for pres in site.presentations %}
  <div class="post">
    <h1 class="post-title">
      <a href="{{ pres.url }}" target="_blank">
        {{ pres.title }}
      </a>
    </h1>
    <span class="post-date">
     {{ pres.subtitle }}
    </span>

  </div>
  {% endfor %}
</div>
