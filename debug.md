---
layout: page
title: Debug page
permalink: /debug/
---



<br><br><br>

{% assign my_variable = false %}
{% if my_variable != true %}
  This statement is valid.
{% endif %}

{% assign my_variable = true %}
{% if my_variable == true %}
  This statement is in valid.
{% endif %}




{% for file in site.static_files %}

{% if file.path contains "logo-ecell.png" %}
{{file.path}}
{% endif %}

<!-- {{file.path}} -->
{% endfor %}
