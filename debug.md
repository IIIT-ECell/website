---
layout: page
title: Debug page
permalink: /debug/
---
<br><br><br><br><br>
{% for file in site.static_files %}

{% if file.path contains "logo-ecell.png" %}
{{file.path}}
{% endif %}

<!-- {{file.path}} -->
{% endfor %}
