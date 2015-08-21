---
layout:     post
title:      "Nginx + Squid = relay :)"
subtitle:   "Comment configurer Nginx pour proxyfier des requêtes ?"
header-img: "img/proxy.jpeg"
---

C'était une de mes prises de tête aujourd'hui : je ne peux pas attaquer un serveur directement en raison d'un problème de crossdomain. Une de nos applis flash (shame on us !) a besoin d'accéder à `fpdownload.adobe.com` pour charger des dépendances mais aujourd'hui surprise, leur crossdomain.xml a changé !

Pô grave, on va pointer les dépendances vers chez nous, on contrôle notre crossdomain.xml après tout. Mais comment faire passer notre serveur pour celui de `fpdownload.adobe.com` ? Par un proxy comme ça on ne stocke rien.


Premier test :

~~~
location /pub {
  rewrite (.*) http://fpdownload.adobe.com$1 last;
  proxy_pass http://monSuperProxySquid:3128;
  proxy_set_header X-Real-IP $remote_addr;
  proxy_set_header Host fpdownload.adobe.com;
  proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
}
~~~

Ah zut, je n'arrive à obtenir que des 302... Hé Nginx ! Mon proxy_pass c'est pas fait pour décorer !

Un café plus tard...

Ah oui, c'est écrit dans la doc : "If a replacement string starts with “http://” or “https://”, the processing stops and the redirect is returned to a client." (cf [the doc](http://nginx.org/en/docs/http/ngx_http_rewrite_module.html#rewrite))

Bon ben on va arrêté de mettre http devant alors ! Mais j'en ai besoin quand même un moment ou un autre, sinon mon Squid va être perdu. Aller, on va la faire à la sioux...

~~~
location /pub {
  rewrite (.*) /http/fpdownload.adobe.com$1 last;
}

location /http {
  internal;
  rewrite ^/([^/]*)/(.*)$ $1://$2 break; #vous avez vu http:// ? moi non...
  proxy_pass http://monSuperProxySquid:3128;
  proxy_set_header X-Real-IP $remote_addr;
  proxy_set_header Host fpdownload.adobe.com;
  proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
}
~~~

Et voilà, `http://monserver.fr/pub/toto` va chercher sa donnée sur `http://fpdownload.adobe.com/pub/toto` !

A venir dans quelques temps : un point sur les proxy.
