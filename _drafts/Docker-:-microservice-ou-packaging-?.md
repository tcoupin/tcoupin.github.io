---
layout: post
title: Docker : microservice ou packaging ?
---

Docker révolutionne la vie des applications. Sa force est d'avoir mis à disposition des dev et des ops un outils commun pour que chacun puisse se focaliser sur son cœur de travail tout en prenant en compte les besoins et impératifs de l'autre. 

Aujourd'hui je m'intéresse au cas de la diffusion d'une application via docker.

Il y a plusieurs façon d'aborder ce problème : doit-on faciliter la mise en place par un utilisateur ou mettre sa connaissance du produit dans une image prod-ready sans soucis et donc complexe ? Quel est le public visé ? On remarquera que c'est un peu la ségrégation dev / ops encore une fois. Heureusement qu'on a inventé la bière pour les réconcilier ces 2 là !

Ce post est un mini retour d'expérience sur des projets pro et perso.

## Rok4

1er cas rencontré, la dockerisation du serveur rok4 pour le diffuser et le faire connaître. Ce serveur, je le connais bien (et c'est sûrement ça le problème) : on s'en se
