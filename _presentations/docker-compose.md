---
title: Docker-compose
subtitle: Pour le développeur
theme: sky
initialization:
  transition: convex
  slideNumber: c/t
---

## Moi

Thibault Coupin

- §fragment<i class="fa fa-briefcase" aria-hidden="true"></i> Ingé Sys DevOps à l'[IRD](http://www.ird.fr)
- §fragment<i class="fa fa-gear" aria-hidden="true"></i> Anciennement Chef division WebServices & DevOps au [Géoportail](https://www.geoportail.gouv.fr)
- §fragment<i class="fa fa-envelope-o" aria-hidden="true"></i> thibault.coupin<i class="fa fa-at" aria-hidden="true"></i>gmail.com
- §fragment<i class="fa fa-github" aria-hidden="true"></i> [tcoupin](https://github.com/tcoupin)
- §fragment<i class="fa fa-twitter" aria-hidden="true"></i> [@thibbojunior](https://twitter.com/thibbojunior)

§break

### Ce cours est :

- super intéressant
- open-source sous licence GNU GPL
- disponible sur <a id="link"></a>
- propulsé fièrement par [reveal.js](https://github.com/hakimel/reveal.js) via [Gh-reveal](https://github.com/tcoupin/gh-reveal)

<script>
var url = location.protocol+"//"+location.host+location.pathname;
var a = document.getElementById("link");
a.href=url
a.innerHTML=url
</script>

§break

## Sommaire

§id:sommaire§;

- [Rappels de docker engine CLI](#/rappels)
- [Concepts](#/concepts)
- [Le docker-compose.yml](#/yaml)
- [Les commandes](#/cli)


§new

## Rappels de docker engine CLI

§id:rappels§;

§break

### Rappels

On lance les conteneurs avec la commande ?

```
$ docker container run [OPTS] IMAGE [CMD] §fragment
```

§break

### Rappels : les options

- définir des ports d'écoute
- gestion des volumes
- gestion des réseaux
- options d'exécution

§break

### Rappels : les volumes

On gère les volumes aves les commandes ?

```
$ docker volume create [OPTS] §fragment
$ docker volume ls
$ docker volume rm VOLUME_NAME
```

§break

### Rappels : les réseaux

On gère les réseaux avec les commandes ?

```
$ docker network create ... §fragment
$ docker network connect ...
$ docker network ls ...
$ docker network disconnect ...
$ docker network rm ...
```

§break

### Bilan

- Un commande par conteneurs
- Toutes les options à écrire
- Gestion fine des conteneurs, réseaux et volumes

§break

### Limites

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

## Définition

> Docker-compose permet de définir tous les éléments nécessaires pour faire tourner une application multi-conteneurs.

§break

## Comment ?

- Un fichier définit les composants :
  - image
  - réseau
  - volume
  - relation/dépendance
- Compose pilote directement le daemon docker
- *Compose permet de scaler un conteneur en particulier*


§break 

## Le fichier de définition

L'application est définie dans un fichier au format YAML avec 3 sections principales :

- les services (les conteneurs)
- les volumes
- les réseaux

Plus de détails dans la partie [docker-compose.yml](#/yaml)

§break

[<i class="fa fa-arrow-left" aria-hidden="true"></i> Retour sommaire](#/sommaire)
§new

## Le docker-compose.yml

§id:yaml§;

§break

### Un format yaml

>YAML Ain't Markup Language

Un langage facilement lisible reprenant les concepts de XML ou JSON

§break

### Un format yaml

```
services:
  some-service:
    networks:
      some-network:
        aliases:
         - alias1
         - alias3
      other-network:
        aliases:
         - alias2
```

<i class="fa fa-warning" aria-hidden="true"></i> aux espaces !

§break

### Le contenu

Plusieurs sections :

- la version du format
- les services
- les volumes
- les réseaux
- *des configs (pour une utilisation swarmkit)*
- *des secrets (pour une utilisation swarmkit)*

§icon:warning§; Pas de section dans la v1.0 §fragment

§notes
Version : si absent, v1.

§break

### Les versions

Le modèle du docker-compose.yml a plusieurs versions possibles.

| Compose file format | Docker Engine |
| ------------------- | ------------- |
| 3.7                 | 18.06.0+      |
| 3.6                 | 18.02.0+      |
| 3.5                 | 17.12.0+      |
| 3.4                 | 17.09.0+      |
| 3.3                 | 17.06.0+      |
| 3.2                 | 17.04.0+      |
| 3.1                 | 1.13.1+       |
| 3.0                 | 1.13.0+       |
| 2.3                 | 17.06.0+      |
| 2.2                 | 1.13.0+       |
| 2.1                 | 1.12.0+       |
| 2.0                 | 1.10.0+       |
| 1.0                 | 1.9.1.+       |

§pelement:style=background-color:white§;

§break




### Les services

Permet de définir les éléments composant l'application :

- image ou *Dockerfile*
- utilisation de volumes
- utilisation de réseaux
- port d'écoute
- ...

Tous les détails sur la [doc](https://docs.docker.com/compose/compose-file/#/service-configuration-reference).

§break

### Services : images ou build

Quelle est la base du conteneur ?

- une image

```
image: httpd:alpine
```

- un *DockerFile*

```
build: ./path
# ou
build:
  context: ./path
  dockerfile: monDockerFile
  args:
    ...
```

§break

### Services : volumes

Montage des volumes Docker ou host

```
volumes:
  # Just specify a path and let the Engine create a volume
  - /var/lib/mysql
  
  # Specify an absolute path mapping
  - /opt/data:/var/lib/mysql
  
  # Path on the host, relative to the Compose file
  - ./cache:/tmp/cache
  
  # User-relative path
  - ~/configs:/etc/configs/:ro
  
  # Named volume
  - datavolume:/var/lib/mysql
```

§break

### Services : réseau

Branchement des réseaux et exposition de ports sur la machine hôte

```
services:
  some-service:
    networks:
     - some-network
     - other-network
    ports:
     - "80:80" #Bien mettre les guillemets
```

§break


### Services : dépendances inter-conteneurs

Docker-compose démarre les conteneurs dans le bon ordre à condition qu'il le connaisse...

- on peut déclarer des dépendances avec **depends_on**

```
depends_on:
  - service1
  - service2
```

§break

### Services : command

Pour surcharger la commande par défaut, on utilise le paramètre **command**

```
command: some command && some other
```

§break

### Les volumes

- Permet de définir des volumes (driver, options)
- Tout volume utilisé par un service doit être déclaré, même s'il est externe (*external*)
- Les montages host->container ne sont pas concernés

Tous les détails sur la [doc](https://docs.docker.com/compose/compose-file/#volume-configuration-reference).
§break


### Les volumes

#### Exemple

```
volumes:
  monvolume:
  monsecondvolume:
    driver: toto
```

§break

### Les réseaux

- Permet de définir des réseaux (driver, options)
- Par défaut, un réseau est créé par projet
- Gestion de l'IPAM
- Tout réseau utilisé par un service doit être déclaré, même s'il est externe (*external*)

Tous les détails sur la [doc](https://docs.docker.com/compose/compose-file/#/network-configuration-reference).
§break

### Les réseaux

#### Exemple : driver par défaut (bridge)

```
networks:
  monreseau:
    ipam:
      config:
        - subnet: 192.168.91.1/24
          ip_range: 192.168.91.0/25
          gateway: 192.168.91.1
```

§break

[<i class="fa fa-arrow-left" aria-hidden="true"></i> Retour sommaire](#/sommaire)
§new


## La commande docker-compose

§id:cli§;

§break

## Commandes

On lance l'application avec la commande

```
$ docker-compose up [SERVICE]
```

L'option `-d` permet de lancer les conteneurs en arrière-plan.

§break

## Commandes

Gestion des conteneurs

```
$ docker-compose stop [SERVICE]
$ docker-compose kill [SERVICE]
$ docker-compose scale SERVICE=NB
```

§break

## Commandes

Nettoyage des conteneurs stoppés

```
$ docker-compose rm
```

Nettoyage des éléments

```
$ docker-compose down
```

§break

## Documentation

`docker-compose help`

ou

[Compose command-line reference](https://docs.docker.com/compose/reference/)

§new



## C'est déjà fini

[<i class="fa fa-arrow-left" aria-hidden="true"></i> Retour sommaire](#/sommaire)
