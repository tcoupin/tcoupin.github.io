---
title: Construction d'image non x86 à base d'image officielle
date: 2017-12-31 00:00:00 Z
tags:
- docker
- truc&astuce
subtitle: Grâce à qemu
comments: true
thumbnail: http://logo-logos.com/wp-content/uploads/2016/10/Docker_logo_logotype.png
---

De nombreux sites abordent la construction d'image pour des systèmes non x86. On pourra citer :

- [La documentation offcielle](https://github.com/docker-library/official-images/blob/master/README.md#multiple-architectures)
- [un article sur l'excellente image multiarch/qemu-user-static](https://eyskens.me/multiarch-docker-images/)
- [un article très fourni sur le cross-building et les images multiarch](http://www.ecliptik.com/Cross-Building-and-Running-Multi-Arch-Docker-Images/)

Le constat est sans appel, il faut utiliser une image de base contenant les binaires qemu-*-static pour pouvoir la construire sur une plate-forme x86.
Il y a de nombreuses images disponibles sur le hub.docker.com pour architecture arm (par exemple totalement au hasard...) contenant le `qemu-arm-static` mais pas les images officielles.

### Commment faire alors ?

Grâce aux multi-stages builds indroduits dans la version 17.05 : https://docs.docker.com/engine/userguide/eng-image/multistage-build/.


Le dockerfile change un chouilla et on garde l'étape d'enregistrement des binaires qemu dans [Binfmt_misc](https://en.wikipedia.org/wiki/Binfmt_misc) :

<script src="https://gist.github.com/tcoupin/576012b01836e1a6d237ef1886b80294.js"></script>


