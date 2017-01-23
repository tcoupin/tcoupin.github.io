---
title: "Docker-compose"
subtitle: ENSG, février 2017
draft: true
theme: night
initialization:
  transition: convex
  slideNumber: c/t
---

## Moi

Thibault Coupin

- §fragment<i class="fa fa-briefcase" aria-hidden="true"></i> ingénieur au pôle [Géoportail](https://www.geoportail.gouv.fr) de l'IGN
- §fragment<i class="fa fa-gear" aria-hidden="true"></i> Chef division Services&CDA & DevOps
- §fragment<i class="fa fa-envelope-o" aria-hidden="true"></i> thibault.coupin<i class="fa fa-at" aria-hidden="true"></i>ign.fr
- §fragment<i class="fa fa-github" aria-hidden="true"></i> [tcoupin](https://github.com/tcoupin)
- §fragment<i class="fa fa-twitter" aria-hidden="true"></i> [@thibbojunior](https://twitter.com/thibbojunior)

§break

### Ce cours est :

- super intéressant
- open-source sous licence GNU GPL
- disponible sur [https://tcoupin.github.io/presentations/docker-compose](https://tcoupin.github.io/presentations/docker-compose)
- propulsé fièrement par [reveal.js](https://github.com/hakimel/reveal.js) via [Gh-reveal](https://github.com/tcoupin/gh-reveal)


§break

## Sommaire

§id:sommaire§;

- [Rappels de docker engine CLI](#/rappels)
- [Concepts](#/concepts)
- [Le docker-compose.yml](#/yaml)
- [Les commandes docker-compose](#/cli)


§new

## Rappels de docker engine CLI

§id:rappels§;

§break

### Rappels

On lance les conteneurs avec la commande

```
$ docker run [OPTS] IMAGE [CMD]
```

§break

### Rappels : les options

- définir des ports d'écoute
- gestion des volumes
- gestion des réseaux
- options d'exécution

§break

### Rappels : les volumes

On gère les volumes aves les commandes

```
$ docker volume create [OPTS]
$ docker volume ls
$ docker volume rm VOLUME_NAME
```

§break

### Rappels : les réseaux

On gère les réseaux avec les commandes

```
$ docker network create ...
$ docker network connect ...
$ docker network ls ...
$ docker network disconnect ...
$ docker network rm ...
```

§break

### Rappels : bilan

- Un commande par conteneurs
- Toutes les options à écrire
- Gestion fine des conteneurs, réseaux et volumes

§break

### Rappels : limite

Imaginez la complexité pour déployer un CMS comprenant :

- un CMS (Wordpress)  §fragment
- une base de données §fragment
- un FTP pour déposer des fichiers à publier §fragment
- un système de cache pour soulager la BDD §fragment
- un proxy inverse pour gérer le reste du cache §fragment

§break

![Déploiement wordpress en docker](/data/docker-wordpress.png)

§break
[<i class="fa fa-arrow-left" aria-hidden="true"></i> Retour sommaire](#/sommaire)
§new

## Concepts

§id:concepts§;

§break
[<i class="fa fa-arrow-left" aria-hidden="true"></i> Retour sommaire](#/sommaire)
§new

## Le docker-compose.yml

§id:yaml§;

§break
[<i class="fa fa-arrow-left" aria-hidden="true"></i> Retour sommaire](#/sommaire)
§new

## Les commandes docker-compose

§id:cli§;

§break
[<i class="fa fa-arrow-left" aria-hidden="true"></i> Retour sommaire](#/sommaire)
§new

## C'est déjà fini

[<i class="fa fa-arrow-left" aria-hidden="true"></i> Retour sommaire](#/sommaire)
