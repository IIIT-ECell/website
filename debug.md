---
layout: page
title: Debug page
permalink: /debug/
---

{% for post in site.posts %}
  {{post.title}} {{post.date}}
{% endfor %}
