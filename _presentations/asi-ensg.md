---
title: "Architecture des systèmes d'informations"
subtitle: ENSG, février 2017
draft: true
theme: night
initialization:
  transition: convex
  slideNumber: c/t
---
<!--http://patorjk.com/software/taag/#p=display&f=Big&t=Definitions -->

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
- disponible sur [https://tcoupin.github.io/presentations/asi-ensg](https://tcoupin.github.io/presentations/asi-ensg)
- propulsé fièrement par [reveal.js](https://github.com/hakimel/reveal.js) via [Gh-reveal](https://github.com/tcoupin/gh-reveal)


§break

### Sources :

- *Chapitre : Informatisation du Système d’Information* - **Guillaume Rivière** (ESTIA)
- *Architecture des Systèmes d'Informations* - **Damien Duportal** [http://dduportal.github.io/cours/ensg-asi-2015/](http://dduportal.github.io/cours/ensg-asi-2015/)
- Wikipédia :)

§break

## Sommaire

§id:sommaire§;

- [Définitions](#definitions)
- [Pourquoi et comment ?](#why)
- [Les principes d'architectures](#principes)

§new




<!--  _____        __ _       _ _   _                  -->
<!-- |  __ \      / _(_)     (_) | (_)                 -->
<!-- | |  | | ___| |_ _ _ __  _| |_ _  ___  _ __  ___  -->
<!-- | |  | |/ _ \  _| | '_ \| | __| |/ _ \| '_ \/ __| -->
<!-- | |__| |  __/ | | | | | | | |_| | (_) | | | \__ \ -->
<!-- |_____/ \___|_| |_|_| |_|_|\__|_|\___/|_| |_|___/ -->
<!--                                                   -->
          
## Définitions
§id:definitions§;

<span>architecture§fragment:3§; des </span><span>systèmes§fragment:2§; d'</span><span>informations§fragment:1§;</span>

§break

### Information

> Élément de connaissance susceptible d'être représenté à l'aide de conventions pour être conservé, traité ou communiqué.

D'après le Larousse.

§notes
Toute information peut être qualifiée sur sa cohérence (notion obsolue, ex support de l'info) et sa validité selon un context (notion relative)

§break

### Système

> Un système est un ensemble d'éléments interagissant entre eux selon certains principes ou règles.

D'après Wikipédia.

§break

### Système

Un système est déterminé par :

 - la nature de ses éléments constitutifs ;§fragment
 - les interactions entre ces derniers ;§fragment
 - sa frontière, c'est-à-dire le critère d'appartenance au système (déterminant si une entité appartient au système ou fait au contraire partie de son environnement) ;§fragment
 - ses interactions avec son environnement. §fragment

§notes

L'analyse systémique est une démarche globale qui modélise quelque chose en système.

§break

### Système

![http://wikimeca.org/images/e/eb/SADT.PNG](http://wikimeca.org/images/e/eb/SADT.PNG)

§break

### Système

Le système peut-être découpé en **sous-systèmes** autonomes mais pas indépendants : ils **communiquent**.

Au fur et à mesure du découpage en sous-système, des biais peuvent apparaître car la perception du contexte par le sous-système est de plus en plus limitée.

§notes

Ex: le DG a une connaissance globale des services de l'organisation : missions, interactions ; le développeur (niveau DG-4) connait son département, un peu son service mais beaucoup moins le reste. Visibilité.

§break

### Système d'information

> Ensemble des flux d’information circulant dans l’organisation associé aux moyens mis en œuvre pour les gérer.

- **Flux** : collecter, stocker, traiter et distribuer de l'information
- **Moyens** : humains, matériel (réseau, serveurs, postes) et logiciel (sgbd, logiciel métier...)

§notes 

La limite du SI est assez floue puisqu'il ne se limite pas au matériel mais aussi aux RH et procédures.
L'informatisation des SI permet d'améliorer la qualité de l'information, le traitement automatisé limite les erreurs de traitement.

§break

### Architecture

> L'architecture est l'art majeur de concevoir des espaces et de bâtir des édifices, en respectant des règles de construction empiriques ou scientifiques, ainsi que des concepts esthétiques, classiques ou nouveaux, de forme et d'agencement d'espace, en y incluant les aspects sociaux et environnementaux.

D'après Wikipédia.

§notes

Notion d'agencement, de contexte, d'humain.

§break

### Architecture des systèmes d'informations

Conception et structure du SI selon plusieurs axes :

- **l'organisation** : procédure (humaine et informatique), politique... §fragment
- **la structuration de l'information** : quel modèle de données ?§fragment
- **les logiciels** : découpage en couches et modules§fragment
- **le matériel et la technique** : quel serveur, quel réseau, quelle baie...§fragment

§break

[<i class="fa fa-arrow-left" aria-hidden="true"></i> Retour sommaire](#sommaire)

§new




<!--  _____                                  _   ___  -->
<!-- |  __ \                                (_) |__ \ -->
<!-- | |__) |__  _   _ _ __ __ _ _   _  ___  _     ) |-->
<!-- |  ___/ _ \| | | | '__/ _` | | | |/ _ \| |   / / -->
<!-- | |  | (_) | |_| | | | (_| | |_| | (_) | |  |_|  -->
<!-- |_|   \___/ \__,_|_|  \__, |\__,_|\___/|_|  (_)  -->
<!--                          | |                     -->
<!--                          |_|                     -->

## Pourquoi et comment ?
§id:why§;

- [Le SI informatique des entreprises](#entreprise)
- [Les enjeux](#enjeux)
- [Les acteurs](#acteurs)

§break

§id:entreprise§;

## Le SI informatique des entreprises

* **70s** : 3e révolution industrielle "révolution informatique" : Arpanet (1969), microprocesseur (1971), ordinateur de bureau (1977) ; §fragment
* **70s-80s** : informatisation de l'entreprise et de son SI, sentiment de modernité. Le changement peut se faire par partie, p2p ou au hasard ;§fragment
* **2000s** : explosion d'internet avec plusieurs impacts : §fragment
  - internet est un nouveau réseau en plus de celui de l'entreprise. §fragment
  - internet impose TCP/IP §fragment
  - internet est un nouveau moyen de se faire du $€£ §fragment
* **Aujourd'hui** : urbanisation du SI : diminution des coûts, rationalisation, optimisation (retour sur investissement). §fragment

§break
§id:enjeux§;

## Les enjeux

L'organisation de l'information dans l'entreprise est un pré-requis pour faire des profits et être efficace.

§break

## Les enjeux
Nature très variée de l'information selon les activités de l'organisation :

- commande
- stock
- annuaire
- info géographique... 

§break

## Les enjeux

Données "business" et "méta-données"

- rapport
- RH
- comptabilité analytique...

§break

## Le découpage classique de l'entreprise
On peut découper l'entreprise en 3 sous-sytèmes :

- le système de pilotage §fragment §element:class=grow§;
- le SI §fragment §element:class=grow§;
- le systéme opérant §fragment §element:class=grow§;

§break

## Le système de pilotage

- Exploite les informations qui circulent §fragment
- Organise le fonctionnement du système §fragment
- Décide des actions à conduire sur le système opérant §fragment
- Raisonne en fonction des objectifs et des politiques de l’entreprise §fragment

§break

## Le système opérant

- Reçoit les informations émises par le système de pilotage  §fragment
- Se charge de réaliser les tâches qui lui sont confiées  §fragment
- Génère à son tour des informations en direction du système de pilotage  §fragment
  - Qui peut ainsi contrôler les écarts et agir en conséquence  §fragment
- Il englobe toutes les fonctions liées à l’activité propre de l’entreprise :  §fragment
  - Facturer les clients, régler les salaires, gérer les stocks, ...  §fragment

§break

## Le SI

- Pour organiser son fonctionnement, le système a besoin de mémoriser des informations : pour comparer, prévoir, ... §fragment
- Diffuser l’information §fragment
- Réaliser tous les traitements nécessaires au fonctionnement du système §fragment

§break

![Schéma d'organisation des systèmes d'une entreprise](/data/asi_entreprise.png)

<i class="fa fa-copyright" aria-hidden="true"></i> G. Rivière

§break
§id:acteurs§;

## Les acteurs
§slide:data-transition=fade§;
**Direction du SI** : Piloter, décider en ayant une vision stratégique.
<small><i class="fa fa-copyright" aria-hidden="true"></i> D. Duportal</small>
§break

## Les acteurs
§slide:data-transition=fade§;
**Maitrise d'ouvrage (MOA)** : Entitée porteuse du besoin. Elle établit les objectifs, le calendrier et le budget. Son objectif est la réalisation des oeuvres (==ouvrage)
<small><i class="fa fa-copyright" aria-hidden="true"></i> D. Duportal</small>
§break

## Les acteurs
§slide:data-transition=fade§;
**Maitrise d'ouvrage (MOE)** : Entitée, chargée par la MOA, d'effectuer la réalisation de l'oeuvre. Assiste et conseille la MOA, dirige l'exécution de l'oeuvre.
<small><i class="fa fa-copyright" aria-hidden="true"></i> D. Duportal</small>
§break

## Les acteurs
§slide:data-transition=fade§;
**Etudes et dévelopement** : Entité qui conçoit et produit l'oeuvre. Dirigée par la MOE. (Ce sont les dévelopeurs...)
<small><i class="fa fa-copyright" aria-hidden="true"></i> D. Duportal</small>
§break

## Les acteurs
§slide:data-transition=fade§;
**Production et exploitation** : Entité chargée de faire fonctionner les oeuvres, ainsi que les maintenir en conditions opérationnelles. (Ce sont les ops...)
<small><i class="fa fa-copyright" aria-hidden="true"></i> D. Duportal</small>
§break

## Les acteurs
§slide:data-transition=fade§;
**Support** : Entité assurant le suivi des utilisateurs des ouvrages. Niveaux 1 / 2 / 3
<small><i class="fa fa-copyright" aria-hidden="true"></i> D. Duportal</small>
§break
[<i class="fa fa-arrow-left" aria-hidden="true"></i> Retour sommaire](#sommaire)
§new




<!--  _____      _            _                 -->
<!-- |  __ \    (_)          (_)                -->
<!-- | |__) | __ _ _ __   ___ _ _ __   ___  ___ -->
<!-- |  ___/ '__| | '_ \ / __| | '_ \ / _ \/ __|-->
<!-- | |   | |  | | | | | (__| | |_) |  __/\__ \-->
<!-- |_|   |_|  |_|_| |_|\___|_| .__/ \___||___/-->
<!--                           | |              -->
<!--                           |_|              -->


## Les principes d'architectures
§id:principes§;

§break

### UML

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

### Principes de conception

La brique de base est appelée *tiers*.

Un acteur, un élément du déploiement, un applicatif qui a une fonction particulière.§fragment

§break

### 1 tiers

Un peu seul au monde§fragment
![Seul au monde](http://cdn.cinemur.fr/posts/cache/cast7-1024x550.jpg)

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
- le serveur est un middleware§fragment

§break

### Middleware : intergicielle

> Un middleware est une couche logicielle qui permet la diffusion de la donnée.

§break

### Middleware

4 familles :
- §fragment**Message-oriented Middleware** : échange de message (pas des emails <i class="fa fa-smile-o" aria-hidden="true"></i>)
- §fragment**Remote procedure call** : demande de traitement
- §fragment**Objects request broker** : manipulation d'objet (attributs et méthodes)
- §fragment**Transactional monitors** : une transaction est une suite d'opérations indissociables - qui doivent être réalisées entièrement ou pas du tout (rollback)


§notes
MOM : faible couplage, concept de file
RPC : appel asynchrone (exemple en geomatique : WPS)
ORB : les traitements de l'objet sont faites sur le serveur
TM  : SGCB ACID

§break

### 2 tiers : répartition des rôles

![Répartition dans le modèle 2 tiers](http://dduportal.github.io/cours/ensg-asi-2015/images/arch_2_tiers_2_types.png)
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

§break

### 3 tiers

![Modèle 3 tiers](/data/modele3tiers.png)

- Présentation§fragment
- Traitement métier§fragment
- Accès aux données§fragment

§break

### Répartition

§element: style=background-color:white§;
![Répartition en 3 tiers](http://dduportal.github.io/cours/ensg-asi-2015/images/pld_gartner_classification.gif)

§break

### Généralisation : N tiers

Diviser la couche **métier** pour simplifier.

§break

### Architecture distribuée

- Plusieurs référentiels de données
- Plusieurs traitements métiers
- Plusieurs présentations

§break
### Architecture distribuée

![Archi distribuée](http://dduportal.github.io/cours/ensg-asi-2015/images/arch_distribuee.png)

§break
### Architecture distribuée

- Rationalisation et rentabilisation des composants
- Distribution des données et des traitements
- Découpage par unité métier

§break
### Problèmes inhérents à la distribution

- Cohérence de l'information
- Concurrence des actions
- Complexité de l'architecture

§break
### Problèmes inhérents à la distribution
#### Cohérence de l'information

Quelque soit le chemin emprunté, la donnée doit rester cohérente.

§break
### Problèmes inhérents à la distribution
#### Concurrence des actions

Plusieurs éléments manipulent en même temps la même donnée.

Qui gagne ?

§break
### Problèmes inhérents à la distribution
#### Complexité de l'architecture

Multiplication des éléments de l'architecture.

§break

### Pourquoi distribuer ?

Distribution = scalabilité horizontale

VS

Scalabilité verticale = grossir les machines


*Damien Duportal : [Notions de répartition des ressources](http://dduportal.github.io/cours/ensg-asi-2015/repartition-ressources.html)*§fragment:1§;

§break

### Pourquoi distribuer ?

Mise en place de la Haute Disponibilité (HA)

*Damien Duportal : [Notions de HA](http://dduportal.github.io/cours/ensg-asi-2015/ha.html)*§fragment:1§;

§break
[<i class="fa fa-arrow-left" aria-hidden="true"></i> Retour sommaire](#sommaire)

