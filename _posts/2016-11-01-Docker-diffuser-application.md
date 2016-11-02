---
layout: post
title: "Docker : comment bien diffuser son application ?"
subtitle: "Retours de ma petite expérience"
comments: true
---

Docker révolutionne la vie des applications. Sa force est d'avoir mis à disposition des dev et des ops un outil commun pour que chacun puisse se focaliser sur son cœur de travail tout en prenant en compte les besoins et impératifs de l'autre. 

Aujourd'hui je m'intéresse au cas de la diffusion d'une application via docker.

Il y a plusieurs façons d'aborder ce problème : doit-on faciliter la mise en place par un utilisateur ou mettre sa connaissance du produit dans une image prod-ready sans soucis et donc complexe ? Quel est le public visé ? On remarquera que c'est un peu la ségrégation dev / ops encore une fois. Heureusement qu'on a inventé la bière pour les réconcilier ces 2 là !

Ce post est un mini retour d'expérience sur des projets pro et perso.

## Vécu

### Rok4

1er cas rencontré, la dockerisation du serveur rok4 pour le diffuser et le faire connaître. Ce serveur, je le connais bien (et c'est sûrement ça le problème) : on s'en sert au Géoportail pour la diffusion des cartes et photos aériennes. L'image docker que j'en ai fait est minimale : un serveur avec une configuration par défaut (mais personnalisable) sans donnée.

Cette image est à mes yeux prod-ready car totalement le deployeur peut jouer sur tous les paramètres et l'image est indépendante de la donnée. Le souci c'est que Rok4 ne peut fonctionner sans un serveur web type nginx ou apache car il expose uniquement une interface fastcgi. Pour le déployer facilement en mode test/exemple, un docker-compose est donc présent dans le projet avec un jeu de données d'exemple.

### Owncloud

Sur mes RaspberryPi, j'ai un reverse proxy nginx qui est le seul point d'entrée chez moi pour les ports http et https. Pour déployer mon propre owncloud, j'ai utilisé l'image docker compatible RaspberryPi la plus documentée et téléchargée. Cette image embarque un serveur php-fpm avec l'application owncloud et un serveur nginx. Celui-ci expose un port http 80 qui renvoie sur le port https 443 avec un certificat auto-signé.

Comprenez mon début d'énervement : j'ai déjà un reverse proxy qui s'occupe du SSL avec un vrai certificat en plus. Pourquoi devoir démarrer un nginx supplémentaire pour rien ? Surtout que je suis obligé de changer sa conf pour éviter le https...

### KavaRok4

Dernier projet en date et en cours, KavaRok4 est un orchestrateur d'instances et de jeux de données rok4 sur docker via docker. En gros, on démarre un conteneur docker qui contient un docker-compose. Celui-ci pilote le docker qui l'héberge pour créer un ensemble de conteneurs pour faire tourner des instances rok4, des nginx et télécharge les jeux de données demandés.

Cette solution permet de faciliter un déploiement dynamique en fonction des attentes utilisateurs, en lui masquant toute cette complexité.

### Bilan

Pour le serveur Rok4, l'image était basique et il était nécessaire de déployer manuellement ou via un docker-compose les éléments nécessaires à son bon fonctionnement.
Pour ownCloud, le déploiement est très simple mais pas customisable. On prend tout ou rien.
Enfin la KavaRok4 peut répondre au besoin de déploiement customisable mais les développeurs du serveur doivent passer un temps considérable pour mettre en place ce projet.

Au final il n'y a pas de bonne ou de mauvaise solution : chacune vise un public bien précis.

## Des bonnes pratiques ?

Je ne veux pas être prétentieux en définissant des bonnes pratiques, voici juste ce que je conçois pour la dockerisation des applications afin que chaque public soit comblé : 

- une image de base customisable pour le déploiement en production. C'est la brique de base, juste l'application ;
- si nécessaire, un autre tag sur cette image avec les dépendances nécessaires pour être utilisable en un seul `docker run`. Par exemple dans le cas de rok4, créer en plus du tag VERSION, un tag VERSION-nginx avec un nginx connecté au rok4.
- la cerise sur le gâteau, un orchestrateur de déploiement comme la KavaRok4 ou encore le CloudBees Jenkins Operation Center

<hr>
<blockquote class="twitter-tweet" data-lang="fr"><p lang="fr" dir="ltr">Docker comment diffuser une application ? Retours appréciés :)<a href="https://t.co/2FezIybHmm">https://t.co/2FezIybHmm</a></p>&mdash; Thibault Coupin (@thibbojunior) <a href="https://twitter.com/thibbojunior/status/793473925019738112">1 novembre 2016</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>
