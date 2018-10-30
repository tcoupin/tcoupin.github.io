---
title: Mon utilisation de Traefik
tags:
- docker
- truc&astuce
- article
subtitle: Pour un déploiement facile sur mon Raspberry Pi
comments: true
thumbnail: https://docs.traefik.io/img/traefik.logo.png
---

*Dans cet article, je parle de [Traefik](https://traefik.io), une reverse proxy des temps modernes. Je vous parlerai de son utilisation chez moi sur mon Raspberry Pi pour le déploiement facile d'applications.*


Quand je veux déployer des applications chez moi (sur mon Rpi), il y a des choses qui me gâchent un peu le plaisir du *docker run* :

- configuration des réseaux docker
- configuration d'un reverse proxy
- certificat SSL

Autant de chose qui donne presque envie de regarder l'amour est dans le près avec madame plutôt que de s'amuser sur mon ordi. Heureusement Traefik est là pour sauver mes soirées et il s'occupe de tous ces points, à condition bien entendu de prendre le temps de préparer un peu le terrain.

## Quelques préparatifs

### DuckDNS

DuckDNS est mon DNS dynamique. Je vous le recommande car il est très simple à utiliser, fournit une API et ne demande pas toutes les semaines de revalider votre compte. D'autre part, il faut préciser que tous les sous-domaines seront résolus avec la même IP que votre domaine :

```
$ dig +short thibbo.duckdns.org 
90.113.115.112
$ dig +short cloud.thibbo.duckdns.org
90.113.115.112
```

Cette caractéristique est très importante, elle va nous permette d'utiliser des sous-domaines pour les applications plutôt que des chemins sur le domaine principal. Ceci pourrait un un frein, notamment s'il faut mettre en place un certificat DNS pour chaque sous-domaine mais Traefik est magique, il est capable de mettre en place des certificats *Let's Encrypt* tout seul comme un grand sans qu'on ait à lui demander. *Le rêve*.

### Traefik et un réseau de base

Dans une `docker-compose.yml` principal (nom de projet : *main*), on définit le service traefik, exposant les ports 80 et 443. Il est relié au réseau *middle* qui permettra de relier les applications à Traefik par la suite.

Au niveau de la configuration dans le fichier `traefik.toml`, on lui précise principalement le nom de domaine. On peut aussi ajouter des règles manuelles pour pouvoir atteindre des ressources externes au réseau Docker.

Voici à quoi ressemblent ces 2 fichiers :

<script src="https://gist.github.com/tcoupin/9559d0b73abae83ec76344c0614423ef.js"></script>


## On déploie

Nous voici prêts à déployer nos applications. Pour les brancher à Traefik, il suffit de bien les attacher au réseau *middle* et d'ajouter les labels définissant les règles de routage. 

Le réseau *middle* du `docker-compose.yml` principal se nomme *main_middle* et est à déclaré en *external* car créer en dehors du `docker-compose.yml` de l'application. Pour indiquer à Traefik d'utiliser ce réseau, on utilisera le label *traefik.docker.network*.

Exemple pour Nextcloud :

<script src="https://gist.github.com/tcoupin/34558e6e2e31e0ebd080110356d73880.js"></script>


## Liens utiles

- [Site Traefik](https://traefik.io)
- [Docs Traefik](https://docs.traefik.io)
- [Slack Traefik](https://traefik.slack.com/)
- [DuckDNS](https://www.duckdns.org/)