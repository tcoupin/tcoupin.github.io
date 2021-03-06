---
title: Architecture des systèmes d'informations
subtitle: Concepts clés
theme: solarized
initialization:
  transition: slide
  slideNumber: c/t
---

## Historique de la présentation

Version précédente : [ENSG, 2017](../2017-asi-esg)
- ENSG, février 2018
- ENSG, novembre 2018
- ENSG, octobre 2019

§break

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

### Sources :

- *Chapitre : Informatisation du Système d’Information* - **Guillaume Rivière** (ESTIA)
- *Architecture des Systèmes d'Informations* - **Damien Duportal** [http://dduportal.github.io/cours/ensg-asi-2015/](http://dduportal.github.io/cours/ensg-asi-2015/)
- Wikipédia :)

§break

## Sommaire

§id:sommaire§;

- [Définitions](#/definitions)
- [Concepts de base](#/concepts)
- [Architecture distribuée](#/loadbalancing)
- [Architecture service et cloud](#/cloud)

§new

## Ch.1 : Définitions
§id:definitions§;

{% include_relative asi-ensg/ch1-definitions.md %}

§new

## Ch.2 : Concepts de base
§id:concepts§;

{% include_relative asi-ensg/ch2-concepts.md %}


§new

## Ch.3 : Architecture distribuée
§id:loadbalancing§;

{% include_relative asi-ensg/ch3-distribuee.md %}

§new


## Ch.4 : Architecture service et cloud
§id:cloud§;

{% include_relative asi-ensg/ch5-cloud.md %}

§new

### C'est déjà fini

[§icon:arrow-left§; Retour sommaire](#/sommaire)

