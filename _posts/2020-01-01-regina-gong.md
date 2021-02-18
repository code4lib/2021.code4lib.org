---
layout: presentation
speakers-text: Regina Gong
speakers: regina-gong
day: 4
group: key-close
spot: 1
length: 50
type: key-close
categories: keynotes
startTime: 2021-03-25T12:10
title: Title Forthcoming
slides:
youtube_key:
---

<p>
{% for speaker in site.data.speakers %}
    {% if speaker.id == page.speakers %}
        {{ speaker.bio }}
    {% endif %}
{% endfor %}
</p>