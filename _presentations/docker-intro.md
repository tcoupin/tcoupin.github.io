---
title: "[En cours] Intro à docker"
subtitle: ENSG, février 2017
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
- disponible sur [https://tcoupin.github.io/presentations/docker-intro](https://tcoupin.github.io/presentations/docker-intro)
- propulsé fièrement par [reveal.js](https://github.com/hakimel/reveal.js) via [Gh-reveal](https://github.com/tcoupin/gh-reveal)


§break

## Sommaire

§id:sommaire§;

- [Intro](#intro)
- [Concepts](#concepts)
- [Docker engine](#engine)
- [Docker compose](#compose)

§new

<!--  _____       _             -->
<!-- |_   _|     | |            -->
<!--   | |  _ __ | |_ _ __ ___  -->
<!--   | | | '_ \| __| '__/ _ \ -->
<!--  _| |_| | | | |_| | | (_) |-->
<!-- |_____|_| |_|\__|_|  \___/ -->
<!--                            -->
<!--                            -->

## Intro
§id:intro§;

§break

## Qu'est ce que c'est ?

> Docker est un outil qui peut empaqueter une application et ses dépendances dans un conteneur isolé, qui pourra être exécuté sur n'importe quel serveur Linux.

451 Research


§break

## Qu'est ce que c'est ?

- Un système d'isolation de processus, de système de fichier et de réseau **: on peut exécuter des processus comme s'ils étaient tout seuls et contrôler ce qu'ils voient§fragment.**§fragment 
- Un système d'image pour facilement transporter une application et ses dépendances **: un super "zip".§fragment**§fragment

§break

## Presque comme la virtualisation, mais non.

<iframe width="560" height="315" src="https://www.youtube.com/embed/L2nBaOj4qRg" frameborder="0" allowfullscreen></iframe>

§break 

## C'est quoi la virtualisation ?

Simuler un système "invité" sur un système "hôte".


On simule le disque dur, la carte mère, les processeurs...§fragment

*C'est un peu lourd §fragment*

§break

## C'est quoi la para-virtualisation ?

Limiter la simulation logiciel du matériel, en simulant un matériel similaire au matériel réel et passer directement les instructions au matériel.

*C'est un peu moins lourd §fragment*

§break 

## C'est pas encore ça ...

```
# ps aux 
USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
root         1  0.0  0.0  30108  5812 ?        Ss   15:26   0:02 /sbin/init
root         2  0.0  0.0      0     0 ?        S    15:26   0:00 [kthreadd]
root         3  0.0  0.0      0     0 ?        S    15:26   0:00 [ksoftirqd/0]
root         5  0.0  0.0      0     0 ?        S<   15:26   0:00 [kworker/0:0H]
root         7  0.0  0.0      0     0 ?        S    15:26   0:05 [rcu_sched]
root         8  0.0  0.0      0     0 ?        S    15:26   0:00 [rcu_bh]
root         9  0.0  0.0      0     0 ?        S    15:26   0:00 [migration/0]
root        12  0.0  0.0      0     0 ?        S    15:26   0:00 [migration/1]
root        13  0.0  0.0      0     0 ?        S    15:26   0:00 [ksoftirqd/1]
...
```

Environ 200 processus actifs...

ça fait beaucoup pour une seule application utile.

§break

## Comment c'est avec docker ?

Docker ne lance qu'un seule processus**, c'est plus rapide !§fragment**

§break
[<i class="fa fa-arrow-left" aria-hidden="true"></i> Retour sommaire](#sommaire)
§new

<!--   _____                           _        -->
<!--  / ____|                         | |       -->
<!-- | |     ___  _ __   ___ ___ _ __ | |_ ___  -->
<!-- | |    / _ \| '_ \ / __/ _ \ '_ \| __/ __| -->
<!-- | |___| (_) | | | | (_|  __/ |_) | |_\__ \ -->
<!--  \_____\___/|_| |_|\___\___| .__/ \__|___/ -->
<!--                            | |             -->
<!--                            |_|             -->

## Concepts
§id:concepts§;

§break

## Images

Les applications sont diffusées dans des *images*. 

Où on les trouve ? 

- hub.docker.com : des images officielles ou communautaires 
- à construire soi-même 
  - from sracth, images totalement vide
  - sur des images de base (ubuntu, centOs, alpine)

§break

## Conteneurs 

Une application tourne dans un *conteneurs*.
 
Un conteneur se base sur une image.


§break
[<i class="fa fa-arrow-left" aria-hidden="true"></i> Retour sommaire](#sommaire)
§new

<!--  ______             _             -->
<!-- |  ____|           (_)            -->
<!-- | |__   _ __   __ _ _ _ __   ___  -->
<!-- |  __| | '_ \ / _` | | '_ \ / _ \ -->
<!-- | |____| | | | (_| | | | | |  __/ -->
<!-- |______|_| |_|\__, |_|_| |_|\___| -->
<!--                __/ |              -->
<!--               |___/               -->

## Docker Engine
§id:engine§;
§break
[<i class="fa fa-arrow-left" aria-hidden="true"></i> Retour sommaire](#sommaire)
§new

<!--   _____                                      -->
<!--  / ____|                                     -->
<!-- | |     ___  _ __ ___  _ __   ___  ___  ___  -->
<!-- | |    / _ \| '_ ` _ \| '_ \ / _ \/ __|/ _ \ -->
<!-- | |___| (_) | | | | | | |_) | (_) \__ \  __/ -->
<!--  \_____\___/|_| |_| |_| .__/ \___/|___/\___| -->
<!--                       | |                    -->
<!--                       |_|                    -->

## Docker Compose
§id:compose§;
§break
[<i class="fa fa-arrow-left" aria-hidden="true"></i> Retour sommaire](#sommaire)
§new