
<!--  _____      _            _                 -->
<!-- |  __ \    (_)          (_)                -->
<!-- | |__) | __ _ _ __   ___ _ _ __   ___  ___ -->
<!-- |  ___/ '__| | '_ \ / __| | '_ \ / _ \/ __|-->
<!-- | |   | |  | | | | | (__| | |_) |  __/\__ \-->
<!-- |_|   |_|  |_|_| |_|\___|_| .__/ \___||___/-->
<!--                           | |              -->
<!--                           |_|              -->

- [UML](#/uml)
- [Conception par tiers](#/tiers)


[§icon:arrow-left§; Retour sommaire](#/sommaire)


§new

### UML
§id:uml§;

L'UML pour aider à architecturer un système d'information ?

§break

### Rappel : Architecture des systèmes d'informations

Conception et structure du SI selon plusieurs axes :

- **l'organisation** : procédure (humaine et informatique), politique... §fragment
- **la structuration de l'information** : quel modèle de données ?§fragment
- **les logiciels** : découpage en couches et modules§fragment
- **le matériel et la technique** : quel serveur, quel réseau, quelle baie...§fragment

§break

### UML : les 5 vues
§slide:data-transition=fade§;
![Les 5 vues UML](https://upload.wikimedia.org/wikipedia/commons/a/aa/UML_Vues.png)

*Source : wikipédia*

§break

### UML : les 5 vues
§slide:data-transition=fade§;

![Les 5 vues UML](https://upload.wikimedia.org/wikipedia/commons/a/aa/UML_Vues.png)

- **l'organisation** : procédure (humaine et informatique), politique... 

Vue des procedure et des cas d'utilisation : acteurs, séquences...§fragment
§break

### UML : les 5 vues
§slide:data-transition=fade§;

![Les 5 vues UML](https://upload.wikimedia.org/wikipedia/commons/a/aa/UML_Vues.png)

- **la structuration de l'information** : quel modèle de données ?

Vue logique : modèle de données§fragment
§break

### UML : les 5 vues
§slide:data-transition=fade§;

![Les 5 vues UML](https://upload.wikimedia.org/wikipedia/commons/a/aa/UML_Vues.png)

- **les logiciels** : découpage en couches et modules

Vue d'implémentation§fragment

§break

### UML : les 5 vues
§slide:data-transition=fade§;

![Les 5 vues UML](https://upload.wikimedia.org/wikipedia/commons/a/aa/UML_Vues.png)

- **le matériel et la technique** : quel serveur, quel réseau, quelle baie...

Vue du déploiement§fragment

§break

[§icon:arrow-left§; Retour Ch.2](#/concepts)


§new

## Conception par tiers
§id:tiers§;
La brique de base est appelée *tiers*.

Un acteur, un élément du déploiement, un applicatif qui a une fonction particulière.§fragment

§break


### 2 tiers : client-serveur

![Modèle client-serveur](/data/modele2tiers.png)


1. Le serveur est en attente§fragment:1§;
2. Le client initie la connection§fragment:1§;
3. Le serveur répond à la requête du client§fragment:1§;

§break

### 2 tiers : client-serveur

- relation maître-esclave
- même protocole de communication (HTTP ?)
- le serveur a l'information

§break

### 2 tiers : répartition des rôles


§element: style=background-color:white§;
![Répartition dans le modèle 2 tiers](http://dduportal.github.io/cours/ensg-asi-2015/images/arch_2_tiers_2_types.png)
§pelement:style=max-height:45vh;§;

*Source : Damien Duportal*

§notes
Exemple en Géomatique :

- WMS : sélection des données et rendu coté serveur
- WFS : sélection des données côté serveur et rendu côté client

§break

### 2 tiers : couplage fort

*Pas bien.*§fragment

§notes
Avant de passer à la suite : réfléchir à ce qui n'est "pas bien"
Evolutivité, panne...

§break

### 3 tiers

![Modèle 3 tiers](/data/modele3tiers.png)

- Présentation§fragment
- Traitement métier§fragment
- Accès aux données§fragment

§break

### 3 tiers : répartition des rôles

§element: style=background-color:white§;
![Répartition en 3 tiers](http://dduportal.github.io/cours/ensg-asi-2015/images/pld_gartner_classification.gif)

§break

### Généralisation : N tiers

Diviser la couche **métier** pour simplifier.


§break

[§icon:arrow-left§; Retour Ch.2](#/concepts)
