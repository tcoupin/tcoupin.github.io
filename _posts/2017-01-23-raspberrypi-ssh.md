---
layout: post
title: Raspberry Pi et SSH
subtitle: Ajouter sa clé publique avant de flasher la carte SD
comments: true
---

J'aime préparer mes Raspberry PI à gros coups de playbook *ansible*. Il faut avant tout que j'installe ma clé publique sur les RPi pour qu'ansible puisse les piloter en SSH.

Facilement, on peut ajouter sa clé publique avec la commande :

```
ssh-copy-id -i LA_CLE_PUBLIQUE USER@IP
```

Mais je suis un incroyable fainéant, et j'aime n'avoir à lancer qu'ansible et attendre. J'ajoute donc la clé publique avant même de flasher mes cartes SD en modifiant l'image.

Il est possible de monter une image avec une simple commande *mount* à condition que cette image soit une image de partition et non de disque entier comme c'est le cas pour les distributions pour Raspberry Pi.
L'outils `kpartx` permet d'accéder à chacune des partitions de l'image.

L'exemple est donné pour HypriotOS mais reste valable pour Raspbian avec l'utilisateur pi

- Créer les devices représentant les partitions

```
$ sudo kpartx -a -v hypriotos-rpi-v1.2.0.img
add map loop0p1 (252:5): 0 131072 linear 7:0 2048
add map loop0p2 (252:6): 0 1914879 linear 7:0 133120
```

*Kpartx* a détecté 2 partitions de tailles différentes : une petite qui est la partition de *boot* et une grosse qui est la racine du système de fichiers. C'est cette dernière qu'il faut monter.

- Créer le point de montage et monter

```
$ sudo mkdir /mnt/RPI
$ sudo mount /dev/mapper/loop0p2 /mnt/RPI
```

- Ajouter sa clé publique

```
$ mkdir /mnt/RPI/home/pirate/.ssh
$ cp ~/id_rsa.pub /mnt/RPI/home/pirate/.ssh/authorized_keys
```

- Démonter et nettoyer

```
$ sudo umount /mnt/RPI 
$ sudo rmdir /mnt/RPI
```

Voilà, l'image est prête à être flasher ! A chaque fois que vous flasherez votre carte, la clé sera déjà déposée.
