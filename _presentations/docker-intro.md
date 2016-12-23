---
title: "Intro à docker"
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
- disponible sur [https://tcoupin.github.io/presentations/docker-intro](https://tcoupin.github.io/presentations/docker-intro)
- propulsé fièrement par [reveal.js](https://github.com/hakimel/reveal.js) via [Gh-reveal](https://github.com/tcoupin/gh-reveal)


§break

## Sommaire

§id:sommaire§;

- [Intro](#intro)
- [Images](#images)
- [Conteneurs](#containers)
- [Réseaux (base)](#networks)
- [Volumes](#volumes)
- [Dockerfile](#dockerfile)

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

## Terminologie

Pour démarrer une application de façon isolée, on lance un **conteneur§fragment** basé sur une **image§fragment**.

Pour stocker des données on peut associer le conteneur à un ou plusieurs **volumes§fragment**.§fragment

Le conteneur peut être associé à un ou plusieurs **réseaux§fragment** pour communiquer avec d'autres conteneurs ou avec l'extérieur.§fragment

§break

## La ligne de commande

La suite de cette présentation liste les commandes utiles.

La liste complète est disponible sur la [documentation](https://docs.docker.com/engine/reference/commandline/)

§break
[<i class="fa fa-arrow-left" aria-hidden="true"></i> Retour sommaire](#sommaire)
§new

<!--  _____                                  -->
<!-- |_   _|                                 -->
<!--   | |  _ __ ___   __ _  __ _  ___  ___  -->
<!--   | | | '_ ` _ \ / _` |/ _` |/ _ \/ __| -->
<!--  _| |_| | | | | | (_| | (_| |  __/\__ \ -->
<!-- |_____|_| |_| |_|\__,_|\__, |\___||___/ -->
<!--                         __/ |           -->
<!--                        |___/            -->

## Les images
§id:images§;

L'image est le "disque dur"* du conteneur.

Elle contient le système d'exploitation et l'application.

<small>*Le terme "disque dur" n'est pas parfait, à voir juste après dans le chapitre [conteneurs](#containers)</small>

§notes
"Disque dur" n'est pas le bon terme : les modifications du système de fichiers n'affecte pas l'image. A voir juste après dans la partie conteneurs.

§break

### Où on les trouve ? 

- [hub.docker.com](https://hub.docker.com) : des images officielles ou communautaires 
- à construire soi-même 
  - *from sracth* ou basée sur des images de base (ubuntu, centOs, alpine)
  - à partir d'un *Dockerfile*
  - en *commitant* un conteneur

§break

### Les comandes utiles

Lister les images locales

```
$ docker images 
REPOSITORY                          TAG                 IMAGE ID            CREATED             SIZE
forumi0721/alpine-armv7h-minidlna   latest              8418d491e218        2 weeks ago         44.34 MB
hypriot/rpi-traefik                 latest              a1350c91b51e        3 weeks ago         37.91 MB
portainer/portainer                 arm                 dc7e0ee82da9        6 weeks ago         10.27 MB
tcoupin/rpi-gpass                   latest              f8bfd0e5c152        6 weeks ago         193.8 MB
...
```
§break

### Les comandes utiles

Chercher une image sur hub.docker.com

```
$ docker search hello-world
NAME                                      DESCRIPTION                                     STARS     OFFICIAL   AUTOMATED
hello-world                               Hello World! (an example of minimal Docker...   225       [OK]       
tutum/hello-world                         Image to test docker deployments. Has Apac...   29                   [OK]
dockercloud/hello-world                   Hello World!                                    9                    [OK]
marcells/aspnet-hello-world               ASP.NET vNext - Hello World                     4                    [OK]
...
```
§break

### Les comandes utiles

Télécharger une image

```
$ docker pull hypriot/rpi-busybox-httpd
```
§break

### Les comandes utiles

Supprimer une image locale

```
$ docker rmi hypriot/rpi-busybox-httpd
```

<i class="fa fa-warning" aria-hidden="true"></i> Ne pas confondre avec *rm* qui supprime un conteneur.

§break

### Les comandes utiles

Construire une image avec un Dockerfile

```
$ docker build DOCKERFILE_PATH
```

- *DOCKERFILE_PATH* est le chemin du dossier contenant le Dockerfile.

Plus de détails dans le chapitre [Dockerfile](#dockerfile).

§break
[<i class="fa fa-arrow-left" aria-hidden="true"></i> Retour sommaire](#sommaire)
§new


<!--   _____            _                                  -->
<!--  / ____|          | |                                 -->
<!-- | |     ___  _ __ | |_ ___ _ __   ___ _   _ _ __ ___  -->
<!-- | |    / _ \| '_ \| __/ _ \ '_ \ / _ \ | | | '__/ __| -->
<!-- | |___| (_) | | | | ||  __/ | | |  __/ |_| | |  \__ \ -->
<!--  \_____\___/|_| |_|\__\___|_| |_|\___|\__,_|_|  |___/ -->

## Les conteneurs
§id:containers§;
Un conteneur est une instance d'une image avec ses propres réglages.

Le conteneur permet d'isoler un processus (et ses enfants) et ne peut pas vivre si le processus se termine.

Chaque conteneur a son propre stockage même s'ils sont basés sur la même image.

§break

### Démarrer un conteneur

```
docker run OPTIONS IMAGE[:TAG] COMMANDE 
```

- *OPTIONS* : diverses options sont possibles
- *IMAGE* : le nom de l'image ou son identifiant. On peut préciser une version avec le *TAG*
- *COMMANDE* : la commande à lancer dans le conteneur. L'image peut être associée à une commande par défaut

§break

### Démarrer un conteneur

Exemple :

```
docker run debian:jessie cat /etc/hostname
```

Le conteneur affiche le contenu du fichier `/etc/hostname` et s'arrête.

§break

### Lister les conteneurs

```
$ docker ps
CONTAINER ID        IMAGE                               COMMAND                  CREATED             STATUS              PORTS                                      NAMES
```

Mais pourquoi on ne voit pas le conteneur d'avant ? §fragment

```
$ docker ps -a §fragment
CONTAINER ID        IMAGE                    COMMAND                  CREATED             STATUS                     PORTS                               NAMES
a5b74e24da65        debian:jessie            "cat /etc/hostname"      9 seconds ago       Exited (0) 6 seconds ago                                       happy_cori
```

§break

### Supprimer les conteneurs

```
$ docker rm NOM
```

§break

### Gérer les conteneurs

- `stop` et `start`
- `retart`
- `pause` et `unpause`

§break

### Options utiles

- *--name* :  donner un nom au conteneur
- *-i* : interactif§fragment
- *-t* : forcer l'allocation d'un TTY§fragment
- *--rm* : supprimer le conteneur à la fin de son exécution§fragment
- *-d* : démarrer le conteneur en arrière-plan§fragment


§break
[<i class="fa fa-arrow-left" aria-hidden="true"></i> Retour sommaire](#sommaire)
§new

<!--  _____   __                             -->
<!-- |  __ \ /_/                             -->
<!-- | |__) |___  ___  ___  __ _ _   ___  __ -->
<!-- |  _  // _ \/ __|/ _ \/ _` | | | \ \/ / -->
<!-- | | \ \  __/\__ \  __/ (_| | |_| |>  <  -->
<!-- |_|  \_\___||___/\___|\__,_|\__,_/_/\_\ -->
## Les réseaux
§id:networks§;
§break
[<i class="fa fa-arrow-left" aria-hidden="true"></i> Retour sommaire](#sommaire)
§new

<!-- __      __   _                            -->
<!-- \ \    / /  | |                           -->
<!--  \ \  / /__ | |_   _ _ __ ___   ___  ___  -->
<!--   \ \/ / _ \| | | | | '_ ` _ \ / _ \/ __| -->
<!--    \  / (_) | | |_| | | | | | |  __/\__ \ -->
<!--     \/ \___/|_|\__,_|_| |_| |_|\___||___/ -->
                                          
## Les volumes
§id:volumes§;
§break
[<i class="fa fa-arrow-left" aria-hidden="true"></i> Retour sommaire](#sommaire)

§new                                      

<!--  _____             _              __ _ _       -->
<!-- |  __ \           | |            / _(_) |      -->
<!-- | |  | | ___   ___| | _____ _ __| |_ _| | ___  -->
<!-- | |  | |/ _ \ / __| |/ / _ \ '__|  _| | |/ _ \ -->
<!-- | |__| | (_) | (__|   <  __/ |  | | | | |  __/ -->
<!-- |_____/ \___/ \___|_|\_\___|_|  |_| |_|_|\___| -->
                                               
## Dockerfile
§id:dockerfile§;
§break
[<i class="fa fa-arrow-left" aria-hidden="true"></i> Retour sommaire](#sommaire)

§new                                                                                     
