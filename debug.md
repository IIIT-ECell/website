---
layout: page
title: Debug page
permalink: /debug/
---
<br><br><br><br><br>
{% for cat in site.data.loopteamcat %}
{{cat.cat}}
{% endfor %}
