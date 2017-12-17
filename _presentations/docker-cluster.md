---
title: Docker en cluster
subtitle: ENSG, février 2018
theme: sky
draft: true
initialization:
  transition: convex
  slideNumber: c/t
---

## Moi

Thibault Coupin


- §fragment§icon:briefcase§; Admin SIG à l'[IRD](http://www.ird.fr)
- §fragment§icon:gear§; Anciennement Chef division WebServices & DevOps au [Géoportail](https://www.geoportail.gouv.fr)
- §fragment§icon:envelope-o§; thibault.coupin§icon:at§;gmail.com
- §fragment§icon:github§; [tcoupin](https://github.com/tcoupin)
- §fragment§icon:twitter§; [@thibbojunior](https://twitter.com/thibbojunior)

§break

### Ce cours est :

- super intéressant
- open-source sous licence GNU GPL
- disponible sur [https://tcoupin.github.io/presentations/docker-cluster](https://tcoupin.github.io/presentations/docker-cluster)
- propulsé fièrement par [reveal.js](https://github.com/hakimel/reveal.js) via [Gh-reveal](https://github.com/tcoupin/gh-reveal)


§break


## Sommaire
§id:sommaire§;

- [Intro](#/intro)
- [Noeuds](#/nodes)
- [Service](#/service)
- [Stack](#/stack)

§new

## Intro
§id:intro§;

§break

### Pourquoi un cluster ?

Docker et docker-compose contrôle *un seul* daemon/machine.

=> plusieurs machines

- connaître la localisation des applications sur les différents noeuds
- répartir la charge
- gérer les pannes
- ...

§break

**NON**, on a inventé le cluster ! 

![Computer food chain](http://player.slideplayer.com/13/4070747/data/images/img13.png)
§pelement: style=background:rgba(255,255,255,1)§;

§break

### Comment ?

Contrôler un ensemble de machines en faisant abstraction des machines, elles forment un tout, le cluster.

§break

### Historique du clustering dans docker

* **Swarm standalone** : un proxy qui répartie les commandes sur les noeuds.
* **Swarmkit/swarm mode** : natif depuis Docker 1.12 (été 2016), fonction intégrée à Engine, nouveaux concepts de services/stack...

§break

### Autres façon

Docker Engine peut aussi être géré en mode cluster par d'autres solutions :

* **kubernetes (K8s)** : solution Google de gestion d'applications conteneurisées
* **OpenStack** : solution open-source de gestion de Cloud, gère majoritairement des VM, peut aussi gérer des containers
* **Amazon ECS** : Elastic Container Service, basé sur des instances Amazon EC2

§break
[<i class="fa fa-arrow-left" aria-hidden="true"></i> Retour sommaire](#sommaire)
§new

## Les noeuds
§id:nodes§;

§break

### 2+1 typologies

* **Worker**
  * Héberge des containers
  * Exécute les ordres donnés par les managers

* **Manager**
  * Héberge des containers
  * Surveille l'ensemble des noeuds (état+containers)
  * Accepte le trafic réseau et le réparti sur les noeuds hébergeant la ressource demandée

* **Leader**
  * Un manager en particulier
  * Répartie les demandes en service de l'utilisateur sur les noeuds

§break

### Worker

Juste un porte-conteneur...

§break

### Manager

* Accepte les commandes de gestion
  * du cluster
  * des réseaux
  * des volumes
  * des services

§break

### Manager

* Accepte le trafic réseau et le réparti

Exemple avec un service Httpd scalé à 4 :

![Réseau et swarm](/data/swarm.png)
§pelement: width=40%§;

§break


### Contrainte sur les drivers réseaux et de volumes

Le réseau et les volumes doivent être disponibles sur l'**ensemble** des noeuds pour que les containers aient le même comportement quelque soit la machine où ils se trouvent.

Solutions logiciels et/ou matériel...

**Réseau** : l'overlay network, macvlan... §fragment

**Volume** : Infinit, GlusterFS, NFS, HPE 3par, NetApp...§fragment

§break

### Labels

Chaque noeud peut être associé à des labels.

Utile pour faire des placements de service en fonction :

- de l'architecture matériel
- de la salle serveur
- du rack
- de la zone réseau...

Voir [Service/Placement](#/placement)

§break
[<i class="fa fa-arrow-left" aria-hidden="true"></i> Retour sommaire](#sommaire)
§new

## Service
§id:service§;
§break

### Service

Une couche d'abstraction par rapport au container.

Un service est la définition de l'état désiré :

- image, ports, volumes...
- nombre d'instances
- préférence de placement sur les noeuds du cluster
- détection de l'état applicatif
- secret et configuration...

§break

### Service : création

```
docker service create --name web -p 80:80 emilevauge/whoami
```

Etat voulu :

- nom du service : *web*
- publication du port 80 sur les noeuds manager
- utilisation de l'image *emilevauge/whoami*
- un seul container

§break


### Service : création

```
docker service create --name web -p 80:80 emilevauge/whoami
```

Etapes :

1. Liste des noeuds répondant aux contraintes de placement
2. Choix d'un noeud (le moins chargé tant qu'à faire...)
3. Ordre de création d'un container sur ce noeud

En plus de ces étapes, l'état du cluster est mis à jour sur l'ensemble des managers.

§break

### Service : options utiles

| `--bind/--mount`                 | gestion des volumes                          |
| `-p/--publish`                   | gestion des ouvertures réseau                |
| `--replicas`                     | nombre d'instance                            |
| `--reserve-cpu/--reserve-memory` | besoin en CPU/RAM                            |
| `--health-*`                     | configurer le health-check applicatif        |
| `--update-*/--rollback-*`        | gestion des phases de mise à jour du service |

§pelement:style=font-size:80%;§;

§break

### Service : mise à jour

```
docker service update ...
```

- changement de la configuration
- changement de l'image (mise à jour applicative)

Mise à jour instance après instance (règles d'update)

En cas de soucis, pour revenir dans l'état précédent

```
docker service rollback ...
```

§break

### Service : placement constraint
§id:placement§;

```
docker service create --constraint 'node.labels.arch == ARM' ...
```

| node.id       | Node ID                  | node.id==2ivku8v2gvtg4                      |
| node.hostname | Node hostname            | node.hostname!=node-2                       |
| node.role     | Node role                | node.role==manager                          |
| node.labels   | user defined node labels | node.labels.security==high                  |
| engine.labels | Docker Engine's labels   | engine.labels.operatingsystem==ubuntu 14.04 |

§pelement:style=font-size:80%;§;


§break

### Service : placement preferences

Une seule stratégie disponible : *spread*


```
docker service create --placement-pref 'spread=node.labels.datacenter' \
                      --placement-pref 'spread=node.labels.rack' ...
```

Répartie au mieux sur les différents datacenter et rack.
§break

[<i class="fa fa-arrow-left" aria-hidden="true"></i> Retour sommaire](#sommaire)
§new

## Stack
§id:stack§;


§new


§break
[<i class="fa fa-arrow-left" aria-hidden="true"></i> Retour sommaire](#sommaire)

§new
## C'est déjà fini

[§icon:arrow-left§; Retour sommaire](#/sommaire)
