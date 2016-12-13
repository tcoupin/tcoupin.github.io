---
title: "[En cours] Le protocole WMS"
subtitle: Web Map Service
---

Portage en cours depuis [http://tcoupin.github.io/wms-cours](http://tcoupin.github.io/wms-cours)...
§new

## Plan

1. Le protocole
2. Des exemples à la main
3. Dans OpenLayers 3
4. Dans Leaflet
5. Serveurs

§break

## Moi

Thibault Coupin

- <i class="fa fa-building-o"></i> Institut National de l'Information Géographique et Forestière [IGN](www.ign.fr)
- <i class="fa fa-link"></i> Ingénieur dans l'équipe [Géoportail](http://www.geoportail.gouv.fr)
- <i class="fa fa-envelope-o" aria-hidden="true"></i> thibault.coupin<i class="fa fa-at" aria-hidden="true"></i>ign.fr
- <i class="fa fa-github" aria-hidden="true"></i> [tcoupin](https://github.com/tcoupin)
- <i class="fa fa-twitter" aria-hidden="true"></i> [@thibbojunior](https://twitter.com/thibbojunior)

§break

## Ce cours

est

- super intéressant
- open-source sous licence GNU GPL
- disponible sur [https://tcoupin.github.io/presentations/cours-wms](https://tcoupin.github.io/presentations/cours-wms)
- propulsé fièrement par [reveal.js](https://github.com/hakimel/reveal.js) via [Gh-reveal](https://github.com/tcoupin/gh-reveal)

§new

## What's this ?!

- Standard de l'OGC pour accéder à de la donnée cartographiée (donc image) §fragment
- Versions actuelles : 1.1.1 et 1.3.0 §fragment
- Définit : §fragment
  - comment interroger le serveur §fragment
  - comment le serveur doit répondre (exceptions comprises) §fragment
- C'est une surcharge du protocole HTTP §fragment
- Tous les documents sont sur le site de l'[OGC](http://www.opengeospatial.org/standards/wms) §fragment

§break

## What's this ?!

### Standard corrollaire à WMS :

- Style Layer Descriptor (SLD) / Symbology Encoding (SE) §fragment:1§;
  - Pour la défnition de style : quelle légende utiliser ? Règles de symbolisation §fragment:1§;
- Filter Encoding (FE) : §fragment:2§;
  - Pour la définition des règles de symbolisation : comment appliquer la légende ? Règles de sélection §fragment:2§;

§break 

## Les opérations

- **GetCapabilities** : découvrir le service §fragment
  - identité de la personne physique/morale getionnaire du service
  - fonctionnalités du service : opérations, crs, format d'image, liste des couches
  - réponse en XML, le schéma est définit dans le standard
- **GetMap** : utiliser le service §fragment
  - l'utilisateur (le client carto) définit format d'image, crs, emprise, couches
  - la réponse est une image
- **GetFeatureInfo** <small>(optionnel)</small> : obtenir des informations supplémentaires §fragment
  - une fois le morceau de carte générée par l'opération GetMap, l'utilisateur veut de l'information sur les éléments qui la composent
  - il faut fournir la requête GetMap et les coordonnées des pixels cliqués

§new

