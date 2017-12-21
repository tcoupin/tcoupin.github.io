---
title: Supprimer certaine metadonnée des images docker
date: 2017-12-21 00:00:00 Z
tags:
- docker
- truc&astuce
subtitle: comme les volumes, ports exposés...
comments: true
thumbnail: http://logo-logos.com/wp-content/uploads/2016/10/Docker_logo_logotype.png
---

Lorsqu'on écrit un Dockerfile basé sur une image existante, l'image créée hérite des métadonnées de l'image de base.
On peut effacer des fichiers présents (même si au final ils restent présents dans l'historique, tout ça est une histoire de pelure d'oignion...), ajouter des métadonnées comme des volumes, des ports... mais pas moyen de suprimer des métadonnées !

Même Solomon Hykes trouve qu'il faudrait pouvoir le faire : [moby/moby#3465 Reset properties inherited from parent image](https://github.com/moby/moby/issues/3465). Bon le ticket date du 6 janvier 2014 (mon anniv ;) ) et est toujours ouvert...

Plusieurs solutions : 

- Ctrl+C, Ctrl+V du dockerfile de base et ajouter la personnalisation voulue au bon endroit
- Supprimer l'ensemble des métadonnées mais pas le système de fichier

Je m'intéresse ici plutôt à la seconde.

## Cas pratique : supprimer l'`expose 80` de l'image php

Même si on de duplique pas totalement le [Dockerfile de l'image de base](https://github.com/docker-library/php/blob/master/7.2/stretch/apache/Dockerfile), il faut quand même y jeter un coup d'oeil car cette methode supprime toutes les métadonnées. Il faudra donc rajouter celles que l'on voulait garder.

```Dockerfile
FROM 7.2.0-apache-stretch AS base

FROM debian:stretch-slim
COPY --from=base / /
# Re-set missing metadata du to scratch copy
ENV PHPIZE_DEPS \
		autoconf \
		dpkg-dev \
		file \
		g++ \
		gcc \
		libc-dev \
		make \
		pkg-config \
		re2c
ENV PHP_INI_DIR /usr/local/etc/php
ENV APACHE_CONFDIR /etc/apache2
ENV APACHE_ENVVARS $APACHE_CONFDIR/envvars
ENV PHP_EXTRA_BUILD_DEPS apache2-dev
ENV PHP_EXTRA_CONFIGURE_ARGS --with-apxs2
ENV PHP_CFLAGS="-fstack-protector-strong -fpic -fpie -O2"
ENV PHP_CPPFLAGS="$PHP_CFLAGS"
ENV PHP_LDFLAGS="-Wl,-O1 -Wl,--hash-style=both -pie"
ENV GPG_KEYS 1729F83938DA44E27BA0F4D3DBDB397470D12172 B1B44D8F021E4E2D6021E995DC9FF8D3EE5AF27F
ENV PHP_VERSION 7.2.0
ENV PHP_URL="https://secure.php.net/get/php-7.2.0.tar.xz/from/this/mirror" PHP_ASC_URL="https://secure.php.net/get/php-7.2.0.tar.xz.asc/from/this/mirror"
ENV PHP_SHA256="87572a6b924670a5d4aac276aaa4a94321936283df391d702c845ffc112db095" PHP_MD5=""
ENTRYPOINT ["docker-php-entrypoint"]
WORKDIR /var/www/html
CMD ["apache2-foreground"]

# Now custom the image !
```

