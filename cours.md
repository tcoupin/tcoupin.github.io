---
layout: page
title: Cours
description: 'Quelques présentations'
---

{% for post in site.posts %}
	{% for tag in post.tags %}
		{% if tag == 'Cours' %}
  
<div class="post-preview">
    <a href="{{ post.url | prepend: site.baseurl }}">
        <h2 class="post-title">            {{ post.title }}
        </h2>
        {% if post.subtitle %}
        <h3 class="post-subtitle">
            {{ post.subtitle }}
        </h3>
        {% endif %}
    </a>
    <p class="post-meta">Posté le {{ post.date | date: "%d" }}
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
                {{ post.date | date: "%Y" }}</p>
</div>
<hr>
  
  		{% endif %}
  	{% endfor %}
{% endfor %}