
En anglais *SOA*.
§break

### SOA : concepts

L'application globale est découpée en sous-éléments communiquant entre eux.

- couplage faible pour réduire les dépendances (matérielles et d'environnement)
- rationalisation des services
- découverte des services

§break

### SOA : communication entre éléments

- interface publiée sur le réseau avec un protocole (ex: SOAP)
- interopérabilité, langage (ex: WSDL)
- annuaire de service

§break

### SOA : intégration des services

Comment intégrer les services dans mon SI ?

![](/data/integration.png)
§pelement:height=60%§;


§break

### SOA : intégration des services

Comment intégrer les services dans mon SI ?

- **E**nterprise **A**pplication **I**ntegration
- **E**nterprise **S**ervice **B**us
- **W**eb-**O**riented **A**rchitecture

§break

### SOA : variante EAI

- l'EAI est un intermédiaire de communication
- l'EAI centralise la communication
- connecteurs entre l'EAI et les applications
- scrutation d'événements / réception de message
- l'EAI réceptionne/transmet les OMS des/aux connecteurs (ang. : *ASBO*)
- l'EAI transforme les OMS en OM pour son mapping interne (ang. : *BO*)
- pas d'annuaire externe, l'EAI connaît les services

§notes
OM : objet de métier (*BO : business object*)
OMS : objet de métier spécifique (*ASBO : application specific business objects*)

§break

### SOA : variante EAI

![](/data/eai.png)
§pelement:height=70%§;

§break

### SOA : variante EAI

- §icon:check§; interfaces : rationalisation grâce aux OM
- §icon:times§; Coût initial élevé mais §icon:check§; rentabilisation
- §icon:check§; Centralisation : métier + mais §icon:times§; SPOF

§break

### SOA : variante ESB

- MoM webservice : échange de message asynchrone avec un système de file d'attente
- pas d'OMS => travail de traduction
- routage intelligent qui découple l'expéditeur du message de son destinataire
- découverte des services
- forte scalabilité

§break

### SOA : variante ESB

![](/data/esb.png)
§pelement:height=60%§;


§break

### SOA : variante ESB

- §icon:check§; Pas de SPOFs
- §icon:check§; Même avantages que l'EAI (hub, interfaces, etc.)
- §icon:times§; Coût initial + complexité du messaging

§break

### SOA : variante WOA

- chaque service est une application web
- le web joue le rôle de bus (DNS+TCP/IP)
- interopérable
- SPOFs limités, couplage faible

§break

### SOA : variante WOA

Le service web :

- old school : SOAP, WSDL...
- REST : Representational State Transfer

§break

### SOA : variante WOA

REST :

- **URL** : Uniform Resource Locator
- **HTTP** : GET, POST, PUT, DELETE... + fonctionnalité d'en-tête
- Stateless


§break

[§icon:arrow-left§; Retour sommaire](#/sommaire)
