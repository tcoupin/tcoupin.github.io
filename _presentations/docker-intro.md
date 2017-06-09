---
title: "Intro à docker"
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

### Qu'est ce que c'est ?

> Docker est un outil qui peut empaqueter une application et ses dépendances dans un conteneur isolé, qui pourra être exécuté sur n'importe quel serveur Linux.

451 Research


§break

### Qu'est ce que c'est ?

- Un système d'isolation de processus, de système de fichier et de réseau **: on peut exécuter des processus comme s'ils étaient tout seuls et contrôler ce qu'ils voient§fragment.**§fragment 
- Un système d'image pour facilement transporter une application et ses dépendances **: un super "zip".§fragment**§fragment

§break

### Presque comme la virtualisation, mais non.

<iframe width="560" height="315" src="https://www.youtube.com/embed/L2nBaOj4qRg" frameborder="0" allowfullscreen></iframe>

§break 

### C'est quoi la virtualisation ?

Simuler un système "invité" sur un système "hôte".


On simule le disque dur, la carte mère, les processeurs...§fragment

*C'est un peu lourd §fragment*

§break

### C'est quoi la para-virtualisation ?

Limiter la simulation logiciel du matériel, en simulant un matériel similaire au matériel réel et passer directement les instructions au matériel.

*C'est un peu moins lourd §fragment*

§break 

### C'est pas encore ça ...

```
$ ps aux 
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

Docker ne lance qu'un seule processus**, c'est plus simple !§fragment**


```
$ docker run --rm alpine ps aux
PID   USER     TIME   COMMAND
    1 root       0:00 ps aux
§fragment
```

§break

### Petit historique

- dotCloud, Inc., société française développe Docker principalement par Solomon Hykes
- Docker open source à partir de mars 2013 : c'est la nouvelle tendance
- octobre 2013 : dotCloud, Inc. devient docker, Inc. basé à San Francisco
- 2015 : docker for Mac et docker for Windows
- 2016 : orchestration multi-hôte intégrée

§break

### Terminologie

Pour démarrer une application de façon isolée, on lance un **conteneur§fragment** basé sur une **image§fragment**.

Pour stocker des données on peut associer le conteneur à un ou plusieurs **volumes§fragment**.§fragment

Le conteneur peut être associé à un ou plusieurs **réseaux§fragment** pour communiquer avec d'autres conteneurs ou avec l'extérieur.§fragment

§break

### La ligne de commande

La suite de cette présentation liste les commandes utiles.

La liste complète est disponible :

- sur la [documentation web](https://docs.docker.com/engine/reference/commandline/)
- en ligne de commande `docker help`

§break

### En pratique

Pour tester les exemples de commandes qui suivent, il faut :

- se rendre sur [play-with-docker.com](http://play-with-docker.com)
- ou installer docker sur une machine x86 (pas ARM) (voir [doc](https://docs.docker.com/engine/installation/))

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

L'image est le "disque dur"* figée sur lequel va se baser le conteneur.

Elle contient le système d'exploitation, l'application et des métadonnées.

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

### Nomenclature des images sur le hub

- Les images fonctionnent comme des repo
- Les images sans / sont des images officielles
- Les images USER/NOM sont des images personnelles ou d'organisation
- Le nom de la distribution est dans le nom de l'image ou le tag.
- Idem pour les images destinées aux archi ARM

```
hypriot/rpi-traefik:raclette
```

§break

### Les commandes utiles

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

§notes
On peut voir la présence d'un TAG qui vaut par défaut latest. Il peut servir à préciser une version ou un variante (arm/x86, fastcgi/http...)

§break

### Les commandes utiles

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

### Les commandes utiles

Télécharger une image depuis hub.docker.com

```
$ docker pull hello-world
```

<small>*Le hub offre aussi la possibilité d'héberger vos images avec les commandes `docker login` et `docker push`*</small>

§break

### Les commandes utiles

Supprimer une image locale

```
$ docker rmi hello-world
```

<i class="fa fa-warning" aria-hidden="true"></i> Ne pas confondre avec *rm* qui supprime un conteneur.

§break

### Les commandes utiles

Construire une image avec un Dockerfile

```
$ docker build DOCKERFILE_PATH
```

- *DOCKERFILE_PATH* est le chemin du dossier contenant le Dockerfile.

Plus de détails dans le chapitre [Dockerfile](#dockerfile).

§break

### Les commandes utiles

Nommer/tagguer une image

```
$ docker tag IMAGE:TAG IMAGE:TAG
```

§break 


### Les commandes utiles

Voir les métadonnées d'une image

```
$ docker inspect hello-world
```

Beaucoup de chose !§fragment

<i class="fa fa-warning" aria-hidden="true"></i> Ne pas confondre avec *rm* qui supprime un conteneur.

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

- Un conteneur est une instance d'image.
- Le conteneur permet d'isoler un processus (et ses enfants)
- Le conteneur ne peut pas vivre si le processus se termine.
- Chaque conteneur a son propre stockage même s'ils sont basés sur la même image.

§break

### Démarrer un conteneur

```
$ docker run OPTIONS IMAGE[:TAG] COMMANDE 
```

- *OPTIONS* : diverses options sont possibles
- *IMAGE* : le nom de l'image ou son identifiant. On peut préciser une version avec le *TAG*
- *COMMANDE* : la commande à lancer dans le conteneur. L'image peut être associée à une commande par défaut

§break

### Démarrer un conteneur

Exemple :

```
$ docker run debian:jessie cat /etc/hostname
```

Le conteneur affiche le contenu du fichier `/etc/hostname` et s'arrête.

§break

### Démarrer un conteneur

Exemple :

```
$ docker run -it debian:jessie /bin/bash
```

Démarre un terminal bash dans le conteneur.

*Comme si on était dans une VM.*

§notes
df -h pour voir le montage des volumes
ifconfig pour voir la config réseau

§break

### Lister les conteneurs

```
$ docker ps
CONTAINER ID        IMAGE                               COMMAND                  CREATED             STATUS              PORTS                                      NAMES
```

Mais pourquoi on ne voit pas les conteneurs d'avant ? §fragment

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

Il en existe beaucoup d'autres : gestion des ressources, environnement d’exécution...

§break


### Le stockage dans un conteneur

Les modifications dans le système de fichier sont stockées dans une surcouche de l'image.

![Couches de conteneurs](https://docs.docker.com/engine/userguide/storagedriver/images/container-layers.jpg)

§notes
Partage des couches images pour tous les conteneurs basés sur la même image.
Une image est un assemblage de couche.
Commiter un conteneur revient à ajouter une couche à une image.

§break

### Commiter un conteneur

Les modifications de l'image apportées par le conteneur peuvent être utilisées pour créer une nouvelle image.

```
$ docker commit CONTAINER_NAME IMAGE[:TAG]
```

On peut également ajouter un auteur, un message de commit...

§notes
C'est le mal... La création manuelle rend l'image difficile à maintenir.

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

L'isolation porte aussi sur le réseau.


- On contrôle les liens réseaux associés au conteneur **: réseaux virtuels§fragment** §fragment
- On contrôle les liens entre ces réseaux virtuels et les réseaux physiques de l'hôte.§fragment

§break

### L'option `--net`

La commande *run* offre l'option `--net`

Les 3 valeurs les plus répandues : 

- `none` : pas de réseau
- `host` : les réseaux de l'hôte
- `bridge` (par défaut) : un réseau isolé avec un mécanisme de *bridge*

§break 

### Pas de réseau

```
$ docker run --rm --net none debian:jessie ip a
```

Seulement l'interface *loopback*.§fragment

§break

### Réseau de l'hôte

```
$ docker run --rm --net host debian:jessie ip a
```

Toutes les interfaces de la machine hôte (eth0, wlan0...).§fragment

§break

### Réseau isolé

- Les conteneurs sont sur un réseau séparé
- Ils peuvent communiquer avec l'extérieur et entre eux
- L'extérieur ne peut pas communiquer avec le conteneur, sauf si explicitement demandé (option `-p`).

§break

### Exposer un port avec l'option `-p`

```
$ docker run --rm -p 8080:80 httpd:alpine
```

[http://127.0.0.1:8080](http://127.0.0.1:8080)

Le port 8080 de la machine hôte est redirigé vers le port 80 du conteneur.§fragment

§break

### Communication inter-conteneurs

- Les conteneurs peuvent communiquer avec les autres sur le même réseau, mais il faut connaître l'IP.
- Le DNS peut être modifié localement dans le conteneur avec 2 options :
  - `--link` : on déclare le lien entre 2 conteneurs : `--link CONTAINER_NAME:ALIAS`
  - `--add-host` : on ajoute manuellement une entrée DNS dans le conteneur : `--add-host NAME:IP`

§break

### Gestion avancée des réseaux

On peut gérer plus finement les réseaux avec des commandes : 

```
$ docker network create ...
$ docker network connect ...
$ docker network ls ...
$ docker network disconnect ...
$ docker network rm ...
```

§break

### To be continued...

Docker inclut d'autres fonctionnalités, notamment pour la mise en cluster.

A voir plus tard dans une autre présentation.

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

Lorsqu'on détruit un conteneur, on supprime aussi les modifications apportées au système de fichier.

Les conteneurs ne partagent pas leur système de fichiers entre-eux.

**Les volumes apportent une solution à cela.§fragment**

§break

### Les volumes

- permettent la persistance des données au delà du conteneur
- permettent le partage de données entre plusieurs conteneurs

§break

### Types

- un dossier de la machine hôte
- un volume géré par docker

§break

### Volume hôte

On utilise l'option `-v LOCAL_PATH:PATH_ON_CONTAINER:MODE`

- *LOCAL_PATH* : le chemin absolu sur l'hôte
- *PATH_ON_CONTAINER* : où brancher ce dossier dans le conteneur ?
- *MODE* (optionnel) : mode d'accès, principalement *rw* (par défaut) et *ro*

```
$ docker run --rm -it -v /:/monhote:ro debian:jessie /bin/bash
```

§break

### Volume docker

- Gestion des volumes avec un workflow dédié **: create, ls, rm§fragment**
- Abtraction du backend de stockage **: local, partage réseau, baie de stockage...§fragment**

§break

### Volume docker

Lister les volumes 

```
$ docker volume ls
DRIVER              VOLUME NAME
local               2bd7394a7adebb03f073bd82048048124578e0b506adea3064fda5d38ef7b678
local               data-telegraf
local               e0c1ad4b13ed61067082a3511feaae14dbdcacd19632594c129548e241575e0c
local               minidlna
local               mongodb
...
```

Quand un volume est créé sans nom, docker le nomme un peu étrangement...§fragment

§break

### Volume docker

Créer un volume 

```
$ docker volume create --name NAME [OPTS]
```

On peut préciser le *driver* à utiliser (dépend du backend, par défaut local).

§break

### Volume docker

Créer un volume lors de la création d'un conteneur

```
$ docker run -v [NAME]:[PATH_ON_CONTAINER]:[OPTS]
```

§fragmentUn peu comme pour un volume hôte, mais avec un nom au lieu d'un chemin.

§break

### Volume docker

Les métadonnées d'une image peuvent forcer la création d'un volume :

```
docker inspect rok4/data-bdortho-d075                                            
[{...
    "Config": {...
        "Volumes": {
            "/rok4/config/pyramids/ORTHO_JPG_PM_D075": {}
        }
    },
...]
```

§break

### Volume docker

Supprimer un volume

```
$ docker volume rm NAME
```

§break

### Volume docker

Supprimer un volume lors de la suppression d'un conteneur

```
$ docker rm -v CONTAINER_NAME
```

<i class="fa fa-warning" aria-hidden="true"></i> Ne concerne que les volumes créés automatiquement par les métadonnées d'une image.


§break

### Gestion des données à la création d'un volume

- un volume hôte remplace totalement un chemin du conteneur.
- un volume docker utilisé pour la première fois est initialisé avec le contenu du chemin de montage dans le conteneur.

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

Script de création d'image.

[Documentation officielle sur le site de docker](https://docs.docker.com/engine/reference/builder/)

§break

### Dockerfile

- automatiser la création des images grâce à un jeu d'instructions §fragment
- un environnement d’exécution propre lors des mises à jours §fragment
- pouvoir reconstruire : mouvance IaC, paradigme cloud§fragment

§break

### Dockerfile

1. On part d'une image existante
2. Chaque ligne équivaut à lancer un conteneur et à le commiter
3. L'image est créée avec le nom spécifié

§break

### La commande utile

Construire une image avec un Dockerfile

```
$ docker build DOCKERFILE_PATH
```

- *DOCKERFILE_PATH* est le chemin du dossier contenant le Dockerfile.

§notes
C'est mieux d'utilise un dossier léger car tout est envoyer dans le contexte lors de la création. Gros fichier = lent.

§break

### Instructions
§slide:data-transition=fade§;

Spécifier l'image de base
```
FROM debian:jessie
```

§break

### Instructions
§slide:data-transition=fade§;

Modifier les métadonnées

```
MAINTAINER Thibault Coupin <thibault.coupin@ign.fr>
LABEL mon_tag="ma valeur"
```

§break

### Instructions
§slide:data-transition=fade§;

Paramétriser le Dockerfile

```
ARG <name>[=<default value>]
```

Utilisation : `${name:-default_value}`

§break

### Instructions
§slide:data-transition=fade§;

Paramétriser le Dockerfile

```
docker build --build-arg name=value .
```

§break

### Instructions
§slide:data-transition=fade§;

Lancer une instruction

```
RUN command
```

§break

### Instructions
§slide:data-transition=fade§;

Ajouter des fichiers

```
ADD <src> <dest>
COPY <src> <dest>
```

Globalement identiques mais :§fragment

- `ADD` supporte les URL§fragment
- gestion du cache de build différente§fragment

§break

### Instructions
§slide:data-transition=fade§;

Modifier l'environnement d'exécution

```
ENV     #Variable d'environnement
USER    #Changement d'utilisateur
WORKDIR #Changement du dossier de travail
```

§notes
User : c'est conseiller de ne pas utiliser le user root pour des raisons de sécurité.

§break

### Instructions
§slide:data-transition=fade§;

Modifier l’exécution

```
CMD    #Commande par défaut
EXPOSE #Ajout d'un port ouvert
VOLUME #Ajout d'un volume
```

§break

### Bonnes pratiques de conceptions

- un conteneur est éphémère **: utilisation de volumes§fragment**
- juste ce qu'il faut§fragment
- un seul processus par conteneur§fragment
- minimiser le nombre de couche du système de fichiers **en minimisant les commandes RUN et en utilisant beaucoup de `&&`§fragment**§fragment
- optimiser l'utilisation du cache de build :§fragment
  - les commandes qui changent le moins en premiers (`MAINTAINER`, `EXPOSE` ...)§fragment
  - les commandes ADD plutôt vers la fin§fragment


§break

[<i class="fa fa-arrow-left" aria-hidden="true"></i> Retour sommaire](#sommaire)

§new                                                                                     

<i class="fa fa-copyright" aria-hiden="true"></i> N. De Loof & 
<i class="fa fa-copyright" aria-hiden="true"></i> Docker, Inc.

§slide: data-background-image=http://1.bp.blogspot.com/-uW4MDLVVJxw/WFA35g_80-I/AAAAAAAATWs/aVMGBGKrcKYzQrYJ8oswJxDcVJ70yRnjQCK4B/s1600/that%2527s%2Ball%2Bfolks.png §;
