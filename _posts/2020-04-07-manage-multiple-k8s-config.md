---
title: Gérer les accès à plusieurs clusters kunernetes
date: 2018-10-30 00:00:00 Z
tags:
- docker
- truc&astuce
- k8s
subtitle: plusieurs fichiers de config ? un fichier de config
comments: true
thumbnail: https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Kubernetes_logo_without_workmark.svg/1200px-Kubernetes_logo_without_workmark.svg.png
---

## Fusion de configuration

1. Enregistrer tous les fichiers de config dans `~/.kube/` dans des fichiers nommés `config.ENV`
2. Fusionner les configs : `KUBECONFIG=$(find ~/.kube -maxdepth 1 -type f -name "*config*" ! -name config | tr '\n' ':') kubectl config view --flatten > ~/.kube/config`

## Outils pratiques

- [kubectx](https://kubectx.dev/) : changer facilement de cluster
- [kubens](https://kubectx.dev/) : changer facilement de namespace
