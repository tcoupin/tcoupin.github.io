
§break

### SOA : concepts

L'application globale est découpée en sous-éléments communiquant entre eux.

- couplage faible pour réduire les dépendances (matérielles et d'environnement)
- rationalisation des services
- découverte des services

§break


### SOA : variante WOA

- chaque service est une application web
- le web joue le rôle de bus (DNS+TCP/IP)
- interopérable
- SPOFs limités, couplage faible

§break

### SOA : variante WOA

REST :

- **URL** : Uniform Resource Locator
- **HTTP** : GET, POST, PUT, DELETE... + fonctionnalité d'en-tête
- Stateless

§break

### Les apports des offres cloud

* virtualisation généralisée et accessible
* aaS : self-service, API
* facturation à l'utilisation 
* outils de déploiement automatisé

§break

### Nouveau but

Rendre les infrastructures les plus modulaires possibles pour optimiser le dimensionnement des briques les plus fines possible. 


§break

### Architecture micro-services

Du WOA avec un découpage beaucoup plus fin :

- une seule fonction par service
- le projet doit être proprement mené : automatisation, déploiement et tests
- service "élastique"

§break

### Architecture micro-services

Avantages :

- scalabilité facilitée§fragment:1§;
- isolation des développements§fragment:1§;
- rapidité des cycles de release§fragment:1§;

Inconvénients : 

- complexes§fragment:2§;
- explosion du nombre de composants§fragment:2§;

§break

### Architecture *serverless*

![Serverless](https://www.commitstrip.com/wp-content/uploads/2017/04/Strip-Severless-650-finalV2.jpg)
§pelement:style=max-height:45vh§;

*CommitStrip*

§break

### Architecture *serverless*

Nouvelles offres :

- abstraction totale de la fonction de serveur
- on ne déploie plus une application, mais le code d'une fonction

§break

### Exemple


![Serverless](/data/serverless.png)
§pelement:style=max-height:45vh§;

§break

### Architecture *serverless*

Avantages :

- plus de gestion de la scalabitlité§fragment:1§;
- facturation à l'appel/temps d’exécution  et non à la VM/container§fragment:1§;

Inconvénients :

- jeunesse de la technologie§fragment:2§;
- peu d'acteur proposant cette fonctionnalité§fragment:2§;
- l'efficacité du code influe sur le coût§fragment:2§;
