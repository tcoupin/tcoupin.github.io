---
title: "Docker : comment personnaliser le réseau docker_gwbridge ?"
subtitle: "J'ai eu du mal, alors je partage ;)"
comments: true
thumbnail: http://logo-logos.com/wp-content/uploads/2016/10/Docker_logo_logotype.png
tags: docker
---

Depuis sa version 1.12, docker engine intègre nativement SwarmKit qui rend extremement facile la mise en place d'un cluster de noeuds docker.
Dès qu'une machine rejoint un cluster swarm, 2 réseaux sont créés : `ingress` et `docker_gwbridge`.

* `ingress` est un réseau de type overlay, c'est à dire qu'il est présent sur tous les noeuds du cluster et simule un réseau en s'appuyant sur le réseau physique existant ;
* `docker_gwbridge` est un réseau de type bridge donc uniquement présent sur le noeud physique courant (il est donc dupliqué sur tous les noeuds).

`ingress` est un réseau liant les *containers* exposant un port et `docker_gwbridge` permet le lien entre le réseau `ingress` et l'extérieur. C'est grâce à ce doublon qu'un service est accessible sur tous les noeuds d'un cluster même s'il n'y a qu'une seule *task* sur un noeud.

Pour comprendre l'overlay, je vous recommande de lire l'article [Demystifying Docker overlay networking](http://blog.nigelpoulton.com/demystifying-docker-overlay-networking/) de [Nigel Poulton ](https://twitter.com/nigelpoulton).

Enfin bref, revenons à nos moutons. Le `docker_gwbridge` utilise par défaut la plage 172.18.0.0/16 et parfois c'est vraiment pas pratique (en entreprise par exemple).
Déjà que le réseau `docker0` m'avait embété, l'utilisation de l'option `--bip CIDR` de docker-containerd avait facilement résolu le problème.
Mais pour le moment il n'y a pas de moyen simple de choisir la plage utilisé par `docker_gwbridge`.

Il faut recréer `docker_gwbridge` à la main... Voici les étapes :

* arrêter tous les *containers*
```
docker ps -q | xargs docker stop
```
* supprimer le lien entre `docker_gwbridge` et `ingress` 
```
docker network disconnect -f docker_gwbridge gateway_ingress-sbox
```
* supprimer le réseau `docker_gwbridge`
```
docker network rm docker_gwbridge
```
* recréer le réseau `docker_gwbridge`
```
docker network create --subnet 192.168.241.0/24 --gateway 192.168.241.1 \
	-o com.docker.network.bridge.enable_icc=false \
	-o com.docker.network.bridge.name=docker_gwbridge \
	-o com.docker.network.bridge.enable_ip_masquerade=true \
	docker_gwbridge
```
* redémarrer le démon pour refaire le lien `docker_gwbridge`/`ingress` (je n'ai pas trouvé mieux comme méthode...)
```
sudo systemctl restart docker.service
```

