---
layout: page
title: Cours & Prez
description: 'Quelques présentations'
---

<div class="posts">
  {% for pres in site.presentations %}
  {% if pres.draft != true or site.show_drafts == true %}
  <div class="post">
    <h1 class="post-title">
      <a href="{{ pres.url }}" target="_blank">
        {% if pres.draft==true %}[draft]{% endif %}{{ pres.title }}
      </a>
    </h1>
    <span class="post-date">
     {{ pres.subtitle }}
    </span>

  </div>
  {% endif %}
  {% endfor %}
</div>
