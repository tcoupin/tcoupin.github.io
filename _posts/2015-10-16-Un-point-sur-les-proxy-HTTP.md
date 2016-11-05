---
layout: post
title: Un point sur les proxys HTTP
subtitle:   "HTTP, Squid3"
---

1. [Pourquoi mettre un proxy ?](#pourquoi)
2. [Rappels sur HTTP](#http)
3. [HTTP(s) et proxy](#proxy)

***

## Pourquoi mettre un proxy ? {#pourquoi}

On trouve les proxies dans les entreprises ayant un réseau significatif. Il se différencie d'une simple passerelle réseau par son côté applicatif. Là où la passerelle ne fait "que" le lien entre 2 réseaux, le proxy ajoute de multiples possibilités :

- la mise en cache, utile si le point d'accès internet du réseau est limité ;
- le filtrage, peu pratique pour les utilisateurs et très utile pour que les administrateurs réseaux puissent bloquer certains contenus dangereux pour le réseau de l'entreprise et l'accès à certains sites (youtube, deezer ...) ;
- la journalisation, en loguant toutes les requêtes qui transitent par le proxy.

## Rappels sur HTTP  {#http}

### La requête

La requête peut contenir jusqu'à 3 parties : la commande, les en-têtes et le corps de requête.
 
1. La commande. C'est la seule partie obligatoire. Elle contient la méthode (`GET`, `POST`, `PUT` ou autre), la ressource demandée et la version du protocole HTTP utilisée.
Par exemple pour demander la page tcoupin sur github.com :

```http
GET /tcoupin HTTP/1.1
```

2. Viennent ensuite les en-têtes de requête. Ils permettent de faire de multiples choses : contrôle de la mise en cache, ajout d'information de contexte (Referer : site ayant émis la requête, User-Agent : logiciel ayant émis la requête) et tout ce qu'on veut y mettre qui peut aider le serveur à répondre.
L'en-tête le plus utile est `Host` qui définit le domaine interrogé. C'est utile quand un serveur (une seule IP) héberge plusieurs sites (domaines).
Voici des exemples d'en-têtes :

```
Host: github.com
Connection: keep-alive
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36
Accept-Encoding: gzip, deflate, sdch
Accept-Language: fr,en-US;q=0.8,en;q=0.6
```

3. Enfin le corps de la requête. Il n'est pas obligatoire voire inutile pour certaines méthodes comme `GET`. Le corps est souvent renseigné pour les méthodes `POST` et `PUT` car il contient les données envoyées par le client au serveur.

### La réponse

La réponse contient elle aussi 3 parties : le statut, les en-têtes et le corps de réponse.

1. Le statut contient la version du protocole HTTP supportée par le serveur, le code de réponse et le texte de réponse (qui correspond au code) ;

2. Les en-têtes sont comme pour les requêtes utilisés pour de multiples choses : contrôle de mise en cache...

3. Le corps de réponse est quasi toujours rempli puisqu'il contient la donnée transmise par le serveur.

### En pratique

On peut s'amuser à écrire des requêtes à la main avec l'utilitaire `telnet`. Pour demander la page principale de mon site <http://tcoupin.github.io>, il faut initialiser une connexion sur le serveur hébergeant le site, l'IP est 23.235.43.133 et le port 80 (port standard du protocole HTTP).

~~~~
$ telnet 23.235.43.133 80
Trying 23.235.43.133...
Connected to 23.235.43.133.
Escape character is '^]'.
GET / HTTP/1.1
Host: tcoupin.github.io

HTTP/1.1 200 OK
Server: GitHub.com
Content-Type: text/html; charset=utf-8
Last-Modified: Tue, 01 Sep 2015 10:01:39 GMT
Access-Control-Allow-Origin: *
Expires: Tue, 01 Sep 2015 14:18:06 GMT
Cache-Control: max-age=600
Content-Length: 7376
Accept-Ranges: bytes
Date: Tue, 01 Sep 2015 14:08:09 GMT
Via: 1.1 varnish
Age: 0
Connection: keep-alive
X-Served-By: cache-ams4143-AMS
X-Cache: MISS
X-Cache-Hits: 0                                                                              
X-Timer: S1441116485.884315,VS0,VE3822                                                       
Vary: Accept-Encoding                                                                        
                                                                                             
<!DOCTYPE html>                                                                              
<html lang="en">                                                                             
[...]
</html>
~~~~


Pour illustrer l'importance de l'en-tête de requête `Host`, vous pouvez essayer en remplaçant `Host: tcoupin.github.io` par `Host: dduportal.github.io` pour atterrir chez [@damienduportal](https://www.twitter.com/damienduportal).

Pour plus de détails, vous pouvez consulter la page wikipédia [Hypertext Transfer Protocol][1].

## HTTP(s) et proxy  {#proxy}


Aller, on passe aux choses intéressantes !

Ici j'ai mon proxy installé sur la machine 192.168.90.90, port 3128. C'est le port le plus souvent utilisé.

En temps normal, pour consulter la page <http://tcoupin.github.io>, votre navigateur préféré, détermine son adresse IP, ouvre une connexion sur le port 80 et envoie un requête HTTP :

~~~~
$ telnet 23.235.43.133 80
GET / HTTP/1.1
Host: tcoupin.github.io
Connection: keep-alive
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8
User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36
Accept-Encoding: gzip, deflate, sdch
Accept-Language: fr,en-US;q=0.8,en;q=0.6
~~~~

Si le navigateur est paramétré pour utiliser le proxy, il n'ouvre pas de connexion sur le serveur hébergeant le site mais sur le proxy, ici 192.168.90.90 port 3128 et lui demande la page demandée :

~~~~
$ telnet 192.168.90.90 3128
GET http://tcoupin.github.io/ HTTP/1.1
Host: tcoupin.github.io
Connection: keep-alive
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8
User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36
Accept-Encoding: gzip, deflate, sdch
Accept-Language: fr,en-US;q=0.8,en;q=0.6
~~~~

La différence est dans la définition de la ressource demandée : elle contient l'URL complète. Le reste ne change pas car il est potentiellement transmis lorsque le proxy enverra la requête directement au serveur hébergeant tcoupin.github.io.


Lorsque qu'on navigue en mode sécurisé, il faut maintenir la sécurisation mise en place par HTTPS tout en permettant un certain filtrage mis en place par l'administrateur réseau.

Le navigateur n'envoie donc pas la requête sans chiffrement, il envoie une demande de connexion sécurisée à un serveur. Cette demande est la seule chose qui transitera en clair sur le réseau. Un canal sécurisé s'ouvre alors entre le navigateur et le serveur en passant par le proxy et les échanges sécurisés ont lieu.

Concrètement avec `telnet`, ça ressemble à ça :

~~~~
$ telnet 192.168.90.90 3128
CONNECT tcoupin.github.io:443 HTTP/1.1

HTTP/1.0 200 Connection established

[partie SSL]
~~~~



[1]: https://fr.wikipedia.org/wiki/Hypertext_Transfer_Protocol
