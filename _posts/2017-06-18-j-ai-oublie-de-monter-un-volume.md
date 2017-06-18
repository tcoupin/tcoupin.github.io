---
layout: post
title: J'ai oublié de monter un volume sur mon conteneur
subtitle: Et je voudrais quand même récupérer des données
comments: true
---

Quand je veux écrire un *dockerfile*, j'ai toujours un conteneur ouvert avec un bash ou un sh d'un côté de l'écran et sublime text de l'autre pour écrire mon *dockerfile*.  Comme ce matin sauf que je n'ai pas beaucoup dormi et j'ai oublié de monter un volume hôte pour récupérer ensuite mes fichiers de configuration longuement modifiés.

### Mais comment je vais récupérer tout ça ??

L'astuce consiste à utiliser le seul canal de communication ouvert entre l'hôte et le conteneur : le réseau !

Sur l'hôte :

```
nc -l -p 1234 | tar -x
```

Dans le conteneur (`docker exec -it CONTAINER_NAME sh`) :

```
tar -c CHEMIN | nc HOTE 1234 
```

Le contenu du **CHEMIN** est archivé au format *tar* puis envoyé par paquets tcp sur le port 1234 vers la machine autre qui extrait l'archive.

Voilà.
