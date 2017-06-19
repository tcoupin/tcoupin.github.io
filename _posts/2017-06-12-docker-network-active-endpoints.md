---
layout: post
title: Suppression impossible de réseau docker
subtitle: Mon réseau a encore un endpoint actif, mais où ça ?
comments: true
---

## Message d'erreur

```
$ docker network rm jenkins_default 
Error response from daemon: network jenkins_default id rga81fxo5vpxc74v29cue3djg has active endpoints
```

J'essaye de trouver le fameux endpoint qui m'embête

```
$ docker inspect jenkins_default
...
        "Containers": {
            "8f832a3941c05829e6689462e9ef1e49af91be779ebbc524040c4a74b67a445e": {
                "Name": "jenkins_agent.owuhcm5ia6fke5mo1i2hiedes.53v6rfgjf6yaig5nabikoh0g0",
                "EndpointID": "1aa3c9ac46742954f05700bf3244a267d8be75416d46449a9804ed6f14399b83",
                "MacAddress": "02:42:0a:00:02:04",
                "IPv4Address": "10.0.2.4/24",
                "IPv6Address": ""
            }
        },
...
```

Sauf qu'il n'existe pas !

```
$ docker container inspect  8f832
[]
Error: No such container: 8f832
```


Je ne sais pas pourquoi j'en suis arrivé à cette situation (peut-être parce que j'utilise une version *edge* de docker ^^) mais ce qui m'importe, c'est de dégager ce foutu réseau !

## Solution

```
$ docker network disconnect --force jenkins_default jenkins_agent.owuhcm5ia6fke5mo1i2hiedes.53v6rfgjf6yaig5nabikoh0g0
$ docker network rm jenkins_default
```

Voilà.
