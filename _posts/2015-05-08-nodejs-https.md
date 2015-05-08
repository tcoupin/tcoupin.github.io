---
layout:     post
title:      "NodeJS et les certificats"
subtitle:   "Https, certif serveur et client"
header-img: "img/post-cadenas.jpg"
---

J'ai été récemment confronté au problème de la sécurisation du lien entre 2 instances NodeJS dans un projet personnel.
L'idée est d'avoir une instance centrale (central) sur un réseau privé et des instances déportées sur internet (sondes). Le central doit pouvoir communiquer avec les sondes mais rien n'empêche que les sondes soient également utilisées par plusieurs centrals.

Evidement, j'ai pensé HTTPS avec certificat client et avec NodeJS ça se fait assez simplement [comme expliqué sur ce blog][1].

Le gros soucis c'est que je suis un gros fainéant et je veux pouvoir lancer les sondes en une seule ligne de commande type `nodejs app.js`. Il fallait donc que la création des certificats soit incluse dans l'appli NodeJS. Au miracle, j'ai trouvé la librairie [pem][2] qui est simple d'utilisation.

## La création des clés et certificats

Pour faire le moins moche possible, le démarrage de la sonde se fait en 3 étapes :

- création d'un certificat d'autorité (CA)
- création d'un certificat pour le serveur signé par le CA
- création d'un certificat client signé par le CA

La signature du certificat serveur par mon CA n'est vraiment pas utile. Idéalement le certificat serveur devrait être signé par une vraie autorité de certification mais bon... ça n'a pas vocation a être utilisé dans un navigateur mais seulement dans une appli nodeJS.

Avec [pem][2], la création d'un certificat est ultra simple.

Pour le CA :

~~~ javascript
var https = require('https'),
      pem = require('pem');
//Stockage de la clé et du certificat CA
var SSLcaCert, SSLcaKey;
pem.createCertificate({
      days:365,
      selfSigned:true,
      commonName: "Probe authority"
    },
    function(err,keys){
      //Le certificat
      SSLcaCert = keys.certificate;
      //La clé privée
      SSLcaKey = keys.clientKey;
    });
~~~ 

C'est quand même plus simple qu'en ligne de commande avec openssl, non ?? 

Et pour le certificat client : 

~~~ javascript
var SSLClientCert, SSLClientKey;
pem.createCertificate({
      days:365,
      serviceKey: SSLcaKey,
      serviceCertificate: SSLcaCert,
      serial: 2,
      commonName: "Probe client"
    },
    function(err,keys){
   	  //Le certificat
      SSLClientCert = keys.certificate;

      //La clé privée
      SSLClientKey = keys.clientKey;

    });
~~~ 
Pour le serveur c'est la même chose.

## L'utilisation des clés et certificats

On utilise le package https pour communiquer du central à la sonde avec [https.request()][3] ou [https.get()][4].

L'exemple fourni sur nodejs.org est assez parlant :

~~~ javascript
var options = {
  hostname: 'encrypted.google.com',
  port: 443,
  path: '/',
  method: 'GET',
  key: fs.readFileSync('test/fixtures/keys/agent2-key.pem'),
  cert: fs.readFileSync('test/fixtures/keys/agent2-cert.pem'),
  rejectUnauthorized: false
};
options.agent = new https.Agent(options);

var req = https.request(options, function(res) {
  ...
}
~~~ 

On aura juste pris soin de stocker la valeur de *SSLClientKey* dans *test/fixtures/keys/agent2-key.pem* et *SSLClientCert* dans *test/fixtures/keys/agent2-cert.pem*.

L'option rejectUnauthorized est nécessaire car notre certificat serveur n'est pas signé par un vrai CA (Trusted CA).


[1]: http://nategood.com/nodejs-ssl-client-cert-auth-api-rest]
[2]: https://github.com/andris9/pem
[3]: https://nodejs.org/api/https.html#https_https_request_options_callback
[4]: https://nodejs.org/api/https.html#https_https_get_options_callback