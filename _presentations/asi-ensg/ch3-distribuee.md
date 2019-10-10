
- [Répartitions des ressources](#/scale)
- [Haute disponibilité](#/ha)



[§icon:arrow-left§; Retour sommaire](#/sommaire)


§break

### Architecture distribuée

- Plusieurs référentiels de données
- Plusieurs traitements métiers
- Plusieurs présentations

§break

### Architecture distribuée

§element: style=background-color:white§;
![Archi distribuée](http://dduportal.github.io/cours/ensg-asi-2015/images/arch_distribuee.png)
§pelement:style=max-height:45vh;§;

*Source : Damien Duportal*

§break

### Architecture distribuée

- Rationalisation et rentabilisation des composants
- Distribution des données et des traitements
- Découpage par unité métier

§notes
Ne plus avoir des composants spécifiques, transférer cette spécificité dans la composition des modules


§break

### Problèmes inhérents à la distribution

- Cohérence de l'information
- Concurrence des actions
- Complexité de l'architecture
§notes
Cohérence de l'information : Quelque soit le chemin emprunté, la donnée doit rester cohérente.
Concurrence des actions : Plusieurs éléments manipulent en même temps la même donnée. Qui gagne ?
Complexité de l'architecture : Multiplication des éléments de l'architecture.


§break

### Pourquoi distribuer ?

Distribution = scalabilité horizontale

VS

Scalabilité verticale = grossir les machines


[Notions de répartition des ressources](#/scale), *dans un instant...*§fragment:1§;

§break

### Pourquoi distribuer ?

Mise en place de la Haute Disponibilité (HA)

[Notions de haute disponibilité](#/ha), *dans un instant aussi...*§fragment:1§;

§break 

### Exemple de système distribué

### Le Géoportail

- des serveurs web exposés sur Internet §fragment
- selon la requête, on transfert vers : §fragment
  - des serveurs WMS Raster
  - des serveurs WMS Vecteur
  - des serveurs de géocodage
  - ...
- les données sont stockées selon leur nature dans : §fragment
  - une base de données Postgis
  - baie de stockage de données raster


§break

### Exemple de système distribué

### Stockage distribué

- Le stockage objet (Amazon S3, OS Swift, Ceph...)
- Le stockage bloc (OS Cinder, Ceph RBD, Infinit...)

Les capacités de stockage d'un pool de machine sont mises en commun pour assurer la disponibilité de la donnée (disponibilité, cohérence).

§break


### Exemple de système distribué

### Calcul distribué

Le principe du *map-reduce*.

- Be4 : création de pyramide de donnée raster pour diffusion WMTS
- Boinc : utiliser les ressources de particuliers pour la recherche

§break

[§icon:arrow-left§; Retour Ch.3](#/loadbalancing)


§new

## Notions de répartition des ressources
§id:scale§;

> CPU, RAM, stockage et réseau, nécessaires pour le fonctionnement des OS et applications.

§break

### Besoin de plus de puissance ?

2 solutions : §fragment:1§;

* utiliser des équipements plus puissants§fragment:2§;
  * §icon:check§; puissance§fragment:3§;
  * §icon:times§; coût : besoin de rentabiliser/optimiser l'usage§fragment:3§;
  * §icon:times§; effet de bord entre les différents usages§fragment:3§;
* multiplier les équipements§fragment:2§;
  * §icon:check§; indépendance des usages (isolation)§fragment:4§;
  * §icon:check§; sécurisation (mise en place de HA)§fragment:4§;
  * §icon:times§; coût hébergement : énergie, surface...§fragment:4§;

§break

### Besoin de plus de puissance ?

Mix des 2 solutions :

utiliser des équipements puissants

ET

multiplier les équipements **<span>virtuels§fragment</span>**

§notes
les gros équipements physiques hébergent de multiples équipements virt
Avantage : optimisation de l'utilisation des ressources, réduction NRJ, isolation (reprise sur erreur), flexibilité
Inconvénient : complexification, dégradation des perfs possibles, par de norme, SPOFs pour plusieurs équipements virtualisés

§break


### Virtualisation

Simuler un système “invité” sur un système “hôte”.

On simule le disque dur, la carte mère, les processeurs, le réseau...

§notes
La virtualisation est une couche APPLICATIVE.

§break

### Virtualisation

Un même matériel physique est utilisé pour simuler plusieurs matériels, qui n'ont aucune conscience de cette relation...

§break

### Virtualisation des serveurs

Machine virtuelle : VMWare, VirtualBox,...

![](http://dduportal.github.io/cours/ensg-asi-2015/images/virtu_srv.png)
§pelement:style=max-height:40vh;§;

*Damien Duportal*

§break

### Virtualisation des serveurs

Para-virtualisation 

*Limiter la simulation logiciel du matériel, en simulant un matériel similaire au matériel réel et passer directement les instructions au matériel.*

§notes
On ne peut simuler que le matériel qu'on a déjà, il s'agit surtout d'isolation.

§break



### Virtualisation des serveurs

Containeurs : LXC, Docker, Jails
![](http://dduportal.github.io/cours/ensg-asi-2015/images/containers.png)§pelement:style=max-height:45vh;§;

*Damien Duportal*

§break

### Virtualisation du stockage

![](http://dduportal.github.io/cours/ensg-asi-2015/images/virtu_storage.png)§pelement:style=max-height:45vh;§;

*Damien Duportal*

§notes

concept des partitions de disque dur, d’agrégation RAID, ajout/remplacement de disque à chaud, mix de type
§break

### Virtualisation du réseau

![](http://dduportal.github.io/cours/ensg-asi-2015/images/virtu_net.png)§pelement:height=60%§;

*Damien Duportal*

§break

### La vie sur du matériel physique

* **Avantages**
  * Accès à 100 % des capacités des composants
  * Pas de complexité d'une couche d'abstraction
* **Limites**
  * Coût
  * Ressources perdues
  * Déploiement long : installation, rackage, câblage
  * Migragration complexe

§break

### La vie sur des VMs

* **Avantages**
  * Un serveur physique héberge plusieurs VMs
  * Disponibilité des VMs
  * Possible modèle cloud : paiement à la consommation sans actions humaines
* **Limites**
  * Plusieurs OS sur une machine physique (conso de RAM, CPU...)
  * Performances inférieures par rapport à du physique

§break


### Indépendance d'un matériel physique

Nouvelles possibilités :

* élément déplaçable en un clic
* configuration facilitée (ajout de RAM, CPU, routeur...)
* sauvegarde possible
* clonage, partage...

Et surtout, répartition des éléments virtualisés sur les éléments physiques pour utiliser au mieux les ressources et distribuer la charge.§fragment

§break


[§icon:arrow-left§; Retour Ch.3](#/loadbalancing)

§new

## Notions de disponibilité
§id:ha§;


> Capacité d'un système à rendre le service pour lequel il est conçu.

Quel degrés de confiance **justifiée** accorder au système ? §fragment

§notes
Rappel : système = humain+moyen !

§break

### Rendre le service

* fonctionnement nominal
* performance normale

Critères à définir lors de la création du système (tolérance ?)

§break

### Les mesures de la disponibilité

* **MTTF** : Mean Time To Failure
* **MTTD** : Mean Time To Detect
* **MTTD** : Mean Time To Diagnose
* **MTTR** : Mean Time To Repair
* **MTBF** : Mean Time Between Failure

§notes

A ne pas confondre avec le plan de reprise d'activité ou le plan de reconstruction qui sont des notions de RECREATION du système et non de fonctionnement.

§break

### Les mesures de la disponibilité

![Mesure de la disponibilité](/data/Haute-dispo.png)

Dispo = OK/(OK+KO) = MTTF/MTBF §fragment

§break

### La règle des 9

| Classe | Dispo.     | Type                      | Indispo (/an) |
| ---    |            |                           |               |
| 1      | 90 %       | Non géré                  | 36,5 jours    |
| 2      | 99 %       | Géré                      | 3,65 jours    |
| 3      | 99,9 %     | Bien géré                 | 8,76 heures   |
| 4      | 99,99 %    | Tolérant aux fautes       | 52,56 minutes |
| 5      | 99,999 %   | Haute disponibilité       | 5,26 minutes  |
| 6      | 99,9999 %  | Très haute disponibilité  | 31,5 secondes |
| 7      | 99,99999 % | Ultra haute disponibilité | 3,15 secondes |

§pelement:style=font-size:80%;§;

§break

### Comment choisir ?

* coût d'une indisponibilité
* coût de la disponibilité

Il faut faire un choix **raisonnable** et **justifiée**. §fragment

§notes

Le coût de l'indispo :  perte des profits,  coût du personnel inactif, image marketing ... le nombre de vie en jeu pour les systèmes de secours ?

Ex : qq M/h dans la finance (courtage, CB) à quelques dizaines de milliers d'euros (vente en ligne, voyages) ou rien (mon blog).

§break

### Comment faire ?

* design adapté §fragment
  * Benchmark §fragment
  * identification des SPOFs §fragment
  * tests automatiques §fragment
  * infrastructure adaptée §fragment
* méthodes d'exploitation adaptées §fragment
  * surveillance, fonctionnement & performance : état du système §fragment
  * organisation des équipes : astreinte, mobilisation des équipes, escalade des incidents §fragment

§notes
Tests : c'est bien aussi pour le CI/CD

§break

### Etats du système

![Etats du système](http://dduportal.github.io/cours/ensg-asi-2015/images/etats.png)
§pelement:style=max-height:45vh;§;

*Source : Damien Duportal*

§break

### Infrastructure adaptée

* Redondance
* Clustering
* Loadbalancing
* CGU de l'offre cloud

§break

### Infrastructure adaptée
#### Redondance

Disque, CPU, RAM...

§break

### Infrastructure adaptée
#### Clustering

Ensemble de noeuds qui peuvent se remplacer l'un l'autre à la demande.

§break

### Infrastructure adaptée
#### Loadbalancing

Lisser la charge sur l'ensemble du cluster

Détecter les noeuds défaillants pour ne pas les inclure dans l'algorithme de répartition.

§break

### Infrastructure adaptée
#### Offre cloud

* Classe du datacenter (alim, réseau, sécurité)
* Garantie de rétablissement
* Garantie de capacité 
* Capacité à l'instanciation, au déplacement...

§break

### En pratique 
#### Datacenter

* Alimentation : combien ? capacité ?
* Réseau : combien d'attachement ? redondance du coeur de réseau ?
* Matériel de secours

![](https://www.scalair.fr/hubfs/photos/blog/classifications-datacenter/data-center-tiers.png)
§pelement:style=max-height:10vh;§;
§break

### En pratique 
#### Stockage RAID

RAID 0 : agrégation par bande, pas HA

![](https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/RAID_0.svg/325px-RAID_0.svg.png)
§pelement:style=max-height:40vh;§;

*Source : wikipédia*

§break

### En pratique 
#### Stockage RAID

RAID 1 : disque miroir

![](https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/RAID_1.svg/325px-RAID_1.svg.png)
§pelement:style=max-height:40vh;§;

*Source : wikipédia*

§break

### En pratique 
#### Stockage RAID

RAID 5 : agrégation par bande à parité répartie

![](https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/RAID_5.svg/675px-RAID_5.svg.png)
§pelement:style=max-height:40vh;§;

*Source : wikipédia*

§break

### En pratique 
#### Stockage RAID

RAID 6 : agrégation par bande à double parité répartie

![](https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/RAID_6.svg/850px-RAID_6.svg.png)
§pelement:style=max-height:40vh;§;

*Source : wikipédia*
§break

### En pratique 
#### Stockage RAID

RAID combiné :

0+1, 1+0, 0+5, 1+5, 5+0, 5+1

§break

### En pratique 
#### Stockage distribué logiciel

GlusterFS, Ceph, Swift...

§break

[§icon:arrow-left§; Retour Ch.3](#/loadbalancing)
