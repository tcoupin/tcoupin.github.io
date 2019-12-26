---
title: Docker en cluster
subtitle: Initiation à Swarm
theme: sky
initialization:
  transition: convex
  slideNumber: c/t
---

## Historique de la présentation

- ENSG, février 2018
- IRD, juin 2018
- ENSG, février 2019

§break

## Moi

Thibault Coupin

- §fragment§icon:briefcase§; IngSys DevOps à l'[IRD](http://www.ird.fr)
- §fragment§icon:gear§; Anciennement Chef division WebServices & DevOps au [Géoportail](https://www.geoportail.gouv.fr)
- §fragment§icon:envelope-o§; thibault.coupin§icon:at§;gmail.com / §icon:at§;ird.fr
- §fragment§icon:github§; [tcoupin](https://github.com/tcoupin)
- §fragment§icon:twitter§; [@thibbojunior](https://twitter.com/thibbojunior)

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

Des outils pour déployer facilement un cluster swarm sur des VM sont dispo sur mon github : [https://github.com/tcoupin/swarm-playground](https://github.com/tcoupin/swarm-playground)

§break


## Sommaire
§id:sommaire§;

- [Intro](#/intro)
- [Les noeuds](#/nodes)
- [Les services](#/service)
- [Les stacks](#/stack)
- [Les volumes](#/volumes)
- [Les réseaux](#/network)
- [Config & secret](#/configsecret)

§new

## Intro
§id:intro§;

§break

### Pourquoi un cluster ?

Docker et docker-compose contrôle *un seul* daemon/machine.

§fragmentPour avoir plus de ressources, 2 possibilités :

- §fragmentUne grosse machine
- §fragmentbeaucoup de machines normales

§break

### Pourquoi un cluster ?

![Computer food chain](http://player.slideplayer.com/13/4070747/data/images/img13.png)
§pelement: style=background:rgba(255,255,255,1)§;

§break 

### Pourquoi un cluster ?

Nouvelles contraintes :

- connaître la localisation des applications sur les différents noeuds
- répartir la charge
- gérer les pannes
- ...

§break

### Comment ?

Contrôler un ensemble de machines en faisant abstraction des machines, elles forment un tout, le **cluster**.

§break

### Fonction d'orchestration

* Commander et surveiller les noeuds
* Répartir au mieux les applications
* Gérer les réseaux, les données, les logs*

<small>* non abordé ici</small>

§break


### Historique du clustering dans docker

* **Swarm standalone** : un proxy qui réparti les commandes sur les noeuds.
* **Swarmkit/swarm mode** : natif depuis Docker 1.12 (été 2016), fonction intégrée à Engine, nouveaux concepts de services/stack... 

§break

### Autres façon

Docker Engine peut aussi être géré en mode cluster par d'autres solutions :

* **kubernetes (K8s)** : solution Google de gestion d'applications conteneurisées
* **OpenStack** : solution open-source de gestion de Cloud, gère majoritairement des VM, peut aussi gérer des containers
* **Amazon ECS** : Elastic Container Service, basé sur des instances Amazon EC2 + docker
* **Rancher** v1 ...
* ...

§break

### et donc ?

* **Swarm** : simple, pas très riche <br>(trop peu pour la production)
* **K8s** : complexe mais très riche <br>(car pensé pour la production)

<small>Un peu de lecture : <a href="https://blog.octo.com/docker-en-production-la-bataille-sanglante-des-orchestrateurs-de-conteneurs/" target="_blank">Blog Octo.com : Docker en production : la bataille sanglante des orchestrateurs de conteneurs</a></small>

§break


[<i class="fa fa-arrow-left" aria-hidden="true"></i> Retour sommaire](#sommaire)
§new

## Les noeuds
§id:nodes§;

§break

### 2+1 typologies

* **Worker**
  * Héberge des containers : exécute les ordres donnés par les managers
  * Accepte le trafic réseau et le réparti sur les noeuds hébergeant la ressource demandée (ingress)

§break

### 2+1 typologies

* **Manager**
  * Héberge des containers (ou pas)
  * Surveille l'ensemble des noeuds (état+containers)
  * Accepte le trafic réseau et le réparti sur les noeuds hébergeant la ressource demandée

§break

### 2+1 typologies

* **Leader**
  * Un manager en particulier
  * Réparti les demandes en service de l'utilisateur sur les noeuds

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


### Contrainte sur les drivers réseaux et de volumes

Le réseau et les volumes doivent être disponibles sur l'**ensemble** des noeuds pour que les containers aient le même comportement quelque soit la machine où ils se trouvent.


**Réseau** : l'overlay network, macvlan... (voir [Les réseaux](#/network))§fragment

**Volume** : Infinit, GlusterFS, NFS, HPE 3par, NetApp...(voir [Les volumes](#/volumes))§fragment

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


## Les services
§id:service§;
§break

### Les services

Une couche d'abstraction par rapport au container.

Un service est la définition de l'état désiré :

- image, ports, volumes...
- nombre d'instances
- préférence de placement sur les noeuds du cluster
- détection de l'état applicatif
- secret et configuration...

§break

### Les tasks

Les tasks permettent la réalisation du service

*Ce sont les containers sur les noeuds*

§break

### Service : création

```
docker service create --name web -p 80:80 emilevauge/whoami
```


- nom du service : *web*
- publication du port 80 sur l'*ingress*
- utilisation de l'image *emilevauge/whoami*
- un seul container

§break



### Service : création

Travail du leader :

1. Liste des noeuds répondant aux contraintes de placement
2. Choix d'un noeud (le moins chargé tant qu'à faire...)
3. Ordre de création d'un container sur ce noeud

En plus de ces étapes, l'état du cluster est mis à jour sur l'ensemble des managers.

§break

### Service : options utiles

| `--bind/--mount`                 | gestion des volumes                          |
| `-p/--publish`                   | gestion des ouvertures réseau                |
| `--replicas`                     | nombre d'instances                            |
| `--reserve-cpu/--reserve-memory` | besoin en CPU/RAM                            |
| `--health-*`                     | configurer le health-check applicatif        |
| `--update-*/--rollback-*`        | gestion des phases de mise à jour du service |

§pelement:style=font-size:80%;§;

§break

### Service et tasks


```
$ docker service ls
ID                  NAME                MODE                REPLICAS            IMAGE                             PORTS
hs40g5qxj3wy        ui                  replicated          2/2                 dockersamples/visualizer:latest   *:8080->8080/tcp
```

```
$ docker service ps ui
ID                  NAME                IMAGE                             NODE                DESIRED STATE       CURRENT STATE            ERROR               PORTS
ticx39oiptf3        ui.1                dockersamples/visualizer:latest   nodeAZ1N1           Running             Running 8 minutes ago                        
l7m1coye9jfy        ui.2                dockersamples/visualizer:latest   nodeAZ2N1           Running             Running 38 seconds ago
```

§break

### Service : réplication

2 modes de déploiement :

- `replicated` : autant d'instances que demandé (par défaut)
- `global` : une instance par noeud répondant aux contraintes de placement

§break

### Service : mise à jour

```
docker service update ...
```

Quoi ?§fragment:1§;

- changement de la configuration§fragment:2§;
- changement de l'image (mise à jour applicative)§fragment:2§;

Comment ?§fragment:1§;

- mise à jour instance après instance§fragment:3§;
- les règles d'update définissent le déroulement§fragment:3§; 


§break

### Service : mise à jour
### ... qui a tout cassé !§fragment:1§;

```
docker service rollback ...§fragment:2§;
```

En cas de soucis, on revient dans l'état précédent avec un *rollback*.§fragment:3§;


Il y a aussi des règles de rollback, comme pour l'update.§fragment:3§;

§break

### Service : placement constraint
§id:placement§;

Permet de restreindre la liste des machines où peut être déployé le service.

```
docker service create --constraint 'node.labels.arch == ARM' ...§fragment
```

§break

### Service : placement constraint

| node.id       | Node ID                  | node.id==2ivku8v2gvtg4                      |
| node.hostname | Node hostname            | node.hostname!=node-2                       |
| node.role     | Node role                | node.role==manager                          |
| node.labels   | user defined node labels | node.labels.security==high                  |
| engine.labels | Docker Engine's labels   | engine.labels.operatingsystem==ubuntu 14.04 |

§pelement:style=font-size:80%;§;


§break

### Service : placement preferences

Permet d'influer sur la méthode de répartition utilisée.

Une seule stratégie disponible : *spread* §fragment:1§;


```
docker service create --placement-pref 'spread=node.labels.datacenter' \§fragment:1§;
                      --placement-pref 'spread=node.labels.rack' ...
```

§break

### Service : placement preference

Ex : Répartir 12 instances sur les différents datacenters et racks.

![Placement preference](https://docs.docker.com/engine/swarm/images/placement_prefs.png)
§pelement:width=70%§;

*Source : [Documentation Docker](https://docs.docker.com/engine/swarm/services/#placement-preferences)*
§break

[<i class="fa fa-arrow-left" aria-hidden="true"></i> Retour sommaire](#sommaire)
§new

## Les stacks
§id:stack§;

§break

### Stack

| Docker monoposte | Docker en swarm |
| ---              |                 |
| Container        | Service         |
| docker-compose   | Stack           |

§break

### Une pile...

De services seulement !§fragment

Une stack n'est pas l'équivalent d'un docker-compose.yml. §fragment

Une stack est un ensemble de service. §fragment

§notes

Bien précisé qu'une stack est un objet docker et pas un fichier.

§break

### Déployer une stack

```
docker stack deploy ...
```

Nécessite un fichier de définition de stack :

- DAB : Distributed Application Bundle file§fragment
- docker-compose.yml... §fragment

§break

### Utilisation d'un docker-compose.yml

- L'applicatif docker-compose n'est pas utilisé
- Certaines options sont nouvelles/différentes/inutilisables
- De nouveaux éléments : config, secret (voir les sections TODO)

§break

### Docker-compose.yml : les nouveautés


* nouvelles sections : `config` et `secret` pour les déclarer
* nouvelle option `deploy` pour un service :
  * nombre de réplicas
  * préférences de placement
  * labels sur les services et bien d'autres...
* lien entre service et config/secret

§break

### Docker-compose.yml : les non compatibles

* La liste des options non compatibles avec le mode swarm [sur la documentation](https://docs.docker.com/compose/compose-file/#not-supported-for-docker-stack-deploy)
* Notamment : 
  * link (voir la section réseau TODO)
  * build
  * restart

§break

[<i class="fa fa-arrow-left" aria-hidden="true"></i> Retour sommaire](#sommaire)

§new


## Les volumes
§id:volumes§;

§break

### Volume plugin

Une interface entre la logique des volumes de docker et le backend utilisé.

* create/remove
* mount/unmount
* path
* capabilities
...

[Documentation](https://docs.docker.com/engine/extend/plugins_volume/)

§break

### Volume local : sous le capot


Stockage physique : `/var/lib/docker/volumes/NOM_VOLUME/_data`

<br>


| **Méthode**   | **Action**                                           |
| create/remove | mkdir, rmdir                                         |
| mount/unmount | pas grand chose                                      |
| path          | retourne  `/var/lib/docker/volumes/NOM_VOLUME/_data` |
| capabilities  | indique un *scope* local                             |


§break

### Volume en cluster

* Backend accessible depuis tous les noeuds : stockage réseau
* Montage/Démontage des volumes réseau lors des créations/suppresion de conteneur
* Le *path* est le point de montage sur le noeud
* *scope = swarm*


![Network volume](/data/network-volume.png)
§pelement:width=20%§;


§break
[<i class="fa fa-arrow-left" aria-hidden="true"></i> Retour sommaire](#sommaire)

§new


## Réseau
§id:network§;

- Réseau interne §fragment §element:class=grow§;
- Réseau externe

§break

### Un engine seul

![](https://www.kaitoy.xyz/images/docker_network.jpg)
§pelement:width=40%§;

*Source: [www.kaitoy.xyz](www.kaitoy.xyz)*

§break

### Un engine seul

- 3 réseaux de base : *none, host, bridge*
- possibilité de créer de nouveaux réseaux de type *bridge*§fragment
- Lien inter-conteneurs :§fragment
  - sur le même réseau donc lien IP ok§fragment
  - résolution DNS :§fragment
    - native sur les réseaux créés
    - option `--link` pour le bridge par défaut

§notes
Résolution native par l'engine, modification du etc/hosts pour le bridge par défaut

§break

### Dans un cluster

* Lien entre les tasks des services liés
* Abstraction de l'emplacement des tasks sur les noeuds

§break

### L'overlay network

![L'overlay](https://img1.wsimg.com/isteam/ip/ada6c322-5e3c-4a32-af67-7ac2e8fbc7ba/3.jpg/:/cr=t:0%25,l:0%25,w:100%25,h:100%25/rs=w:1280)
§pelement:width=40%§;

* Un réseau présent sur tous les noeuds
* Un réseau non dupliqué mais distribué
* Créé lors de l'initialisation du swarm


Source : [Article Demystifying Docker overlay networking](https://nigelpoulton.com/blog/f/demystifying-docker-overlay-networking)
§break

### L'overlay : un tunnel


![L'overlay vue physique](https://img1.wsimg.com/isteam/ip/ada6c322-5e3c-4a32-af67-7ac2e8fbc7ba/8.jpg/:/cr=t:0%25,l:0%25,w:100%25,h:100%25/rs=w:1280)
§pelement:width=40%§;

* Utilise un techonologie de VLAN (ici *VXLAN*)


Source : [Article Demystifying Docker overlay networking](https://nigelpoulton.com/blog/f/demystifying-docker-overlay-networking)
§break

### L'overlay : d'autres méthodes

* D'autres méthodes incluses dans l'engine : *IPVLAN, MACVLAN*
* L'engine est extensible avec des *network plugins*
  * une interface entre l'engine et le backend de réseau
  * ex : Contiv (by Cisco)... (voir [plus](https://store.docker.com/search?category=network&q=&type=plugin))


§break

### DNS

Lorsqu'un service est connecté à un réseau, il bénéficie du service DNS.

<br>

| `SERVICE` | VIP du service (voir LB juste après) |
| `tasks.SERVICE` | liste de toutes les ips des tasks |

§break

### DNS : exemple

```
# dig httpd

;; ANSWER SECTION:
httpd.      600 IN  A 10.0.1.6
```

```
# dig tasks.httpd

;; ANSWER SECTION:
tasks.httpd.    600 IN  A 10.0.1.8
tasks.httpd.    600 IN  A 10.0.1.10
tasks.httpd.    600 IN  A 10.0.1.11
tasks.httpd.    600 IN  A 10.0.1.12
tasks.httpd.    600 IN  A 10.0.1.9
tasks.httpd.    600 IN  A 10.0.1.7
```


§break


## Réseau

- Réseau interne
- Réseau externe §fragment §element:class=grow§;

§break

### Le réseau ingress

- Est sur tous les noeuds (overlay)
- Gère les relations entre le cluster et le monde extérieur
  - bound des ports publiés
  - load-balancing IPVS

![](https://docs.docker.com/engine/swarm/images/ingress-routing-mesh.png)
§pelement:width=40%§;

Source : [docker.com](https://docker.com/)
§break

### Load balancing

- Tous les noeuds (manager ou worker) du cluster exposent les ports publiés par les services
- La requête est transférée vers l'IPVS puis vers une des tasks du service
- Possibilité d'utiliser un LB externe

![LB](https://i.stack.imgur.com/Hyxbk.png)
§pelement:width=40%§;

Source : [docs.docker.com](https://docs.docker.com/engine/swarm/ingress/)

§break 

[§icon:arrow-left§; Retour sommaire](#/sommaire)

§new

## Config & secret
§id:configsecret§;

§break

### Dissocier l'appication de la configuration

- Gestion globale des configurations, en dehors des images
- En parallèle//complément de la configuration par variables d'environnement
- En finir avec les volumes "config" initialisés à la main...

§break

### Les configs

- Objet de l'engine avec un workflow (create, inspect, rm, ls)
- Encodé en base64 (texte, image, ...) dans le swarm
  - disponibilité par réplication
  - cohérence grâce à l'algo raft du swarm
- Monté dans les containers

§break

### Les secrets

Comme une config +

- Encodage (non lisible avec la commande inspect)
- Déployé dans l'espace mémoire du container et non dans l'espace stockage

Pour les données sensibles : mot de passe, clé SSL, certificat...

§break

### CLI 

```
docker config create NOM FILE
ou
echo "ma config" | docker config create NOM -
```

```
docker config ls
```


```
docker config rm NOM
```

De même pour les secrets...

§break

### Utilisation dans un service

```
docker service create --config NAME IMAGE
# Sera accessible à /NAME
```

```
docker service create --config src=NAME,target=/path/to/file IMAGE
# Sera accessible à /path/to/file
```

Par défault un secret est accessible dans `/run/secrets/NAME`

§break

### Config et docker-compose.yml

```
version: "3.3"
services:
  redis:
    image: redis:latest
    deploy:
      replicas: 1
    configs:
      - my_config
      - my_other_config
configs:
  my_config:
    file: ./my_config.txt
  my_other_config:
    external: true
```

§break

### Config et docker-compose.yml

```
version: "3.3"
services:
  redis:
    image: redis:latest
    deploy:
      replicas: 1
    configs:
      - source: my_config
        target: /redis_config
        uid: '103'
        gid: '103'
        mode: 0440
configs:
  my_config:
    file: ./my_config.txt
  my_other_config:
    external: true
```

§break

### Secret et docker-compose.yml

```
version: "3.1"
services:
  redis:
    image: redis:latest
    deploy:
      replicas: 1
    secrets:
      - my_secret
      - my_other_secret
secrets:
  my_secret:
    file: ./my_secret.txt
  my_other_secret:
    external: true
```

§break

### Secret et docker-compose.yml

```
version: "3.1"
services:
  redis:
    image: redis:latest
    deploy:
      replicas: 1
    secrets:
      - source: my_secret
        target: redis_secret
        uid: '103'
        gid: '103'
        mode: 0440
secrets:
  my_secret:
    file: ./my_secret.txt
  my_other_secret:
    external: true
```

§new


## C'est déjà fini

[§icon:arrow-left§; Retour sommaire](#/sommaire)
