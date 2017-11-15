---
title: Rangez vos images !
tags:
- article
- docker
subtitle: Et vous serez utilisé !
---

Fournir des images docker c'est bien, fournir des images bien rangées c'est mieux. Et oui, qui téléchargera votre image si on ne trouve pas la version voulue avec la distrib de base voulue ?

Pour les images officielles, Docker résout ce problème grâce à un système de tags et une organisation stricte de leurs repositories. Le plus simple est d'aller jeter un oeil à l'image [php](https://hub.docker.com/r/_/php) dont les variantes sont toutes les combinaisons des paramètres suivants :

- **version** : 7.2.0RC6, *7.1.11*, 7.0.25, 5.6.32
- **distribution** : *jessie*, alpine (version 3.4 ou 3.6 selon la version de php)
- **variante** : *cli*, apache, fpm, zts

Pour chaque paramètre, une valeur par défaut est choisi (en italique dans la liste). Dans le cas du paramètre version, la valeur par défaut change au fur et à mesure des nouvelles versions... logique !

# Organisation du dépôt

# Tag
