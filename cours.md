---
layout: page
title: Cours & Prez
description: 'Quelques présentations'
---

<div class="posts">
  {% for post in site.posts %}
{% for tag in post.tags %}
        {% if tag == 'Cours' %}
  <div class="post">
    <h1 class="post-title">
      <a href="{{ post.url }}">
        {{ post.title }}
      </a>
    </h1>

    <span class="post-date">
      {{ post.date | date: "%d" }}
      {% assign m = post.date | date: "%m" %}
      {% case m %}
          {% when '01' %}janvier
          {% when '02' %}février
          {% when '03' %}mars
          {% when '04' %}avril
          {% when '05' %}mai
          {% when '06' %}juin
          {% when '07' %}juillet
          {% when '08' %}août
          {% when '09' %}septembre
          {% when '10' %}octobre
          {% when '11' %}novembre
          {% when '12' %}décembre
      {% endcase %}
      {{ post.date | date: "%Y" }}
    - {{ post.subtitle }}
    </span>

  </div>
  {% endif %}
    {% endfor %}
  {% endfor %}
</div>
