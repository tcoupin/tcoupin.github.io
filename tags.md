---
title: Tags
icon: tags
---

<p class="text-center">
{% assign fulltags = site.posts | map: 'tags' | compact | sort %}
{% assign uniqtags = fulltags | uniq %}
{% for utag in uniqtags %}
    {% assign count = 0 %}
    {% for ftag in fulltags %}
        {% if utag==ftag %}
            {% assign count = count | plus:1 %}
        {% endif %}
    {% endfor %}
<a href="#{{ utag }}" class="btn btn-primary">
  {{ utag }} <span class="badge badge-light">{{ count }}</span>
</a>
{% endfor %}
</p>

<br>

{% for tag in uniqtags %}
<div id="{{ tag }}" class="tag-list-post">
<h3>{{ tag }}</h3>
    {% for post in site.tags[tag] %}
<a href="{{ post.url }}"><h4>{{ post.title }}</h4></a>
{% include post-detail.html %}
    {% endfor %}
</div>
{% endfor %}