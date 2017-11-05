---
title: Cours & Prez
description: 'Quelques présentations'
icon: slideshare
---

{% for pres in site.presentations %}
{% if pres.draft != true or site.show_drafts == true %}
<article class="media border p-2 m-2">
  <div class="media-body">
    <h4 class="mt-0">
      <a href="{{ pres.url }}" target="_blank">
        {% if pres.draft==true %}[draft]{% endif %}{{ pres.title }}
      </a>
    </h4>
    <p>
      {{ pres.subtitle }}
    </p>
{% include post-detail.html %}


  </div>
    
</article>
{% endif %}
{% endfor %}
