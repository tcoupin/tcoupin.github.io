---
layout: post
title: Un mois de fail2ban
subtitle:   D'où viennent les attaques ?
---

Voilà un mois que j'ai (enfin) installé *fail2ban* sur mon serveur pour sécuriser le ssh et le ftp. Il est temps de faire un petit point : **72 ip bloquées**.

Après un petit traitement avec *GeoIp Lite City Edition Rev 1* voilà le résultat :

1- Carte dynamique
------------------

<div id="map" style="height: 400px"></div>

<script src="/public/js/jquery.min.js"></script>
<script src="/public/js/leaflet-0.7.7.js"></script>
<script src="/public/js/leaflet.markercluster-src.js"></script>
<script src='https://api.mapbox.com/mapbox.js/plugins/leaflet-fullscreen/v1.0.1/Leaflet.fullscreen.min.js'></script>


<script type="text/javascript">
	window.onload = function(){
		$('head').append('<link rel="stylesheet" type="text/css" href="/public/css/leaflet.css">');
		$('head').append('<link rel="stylesheet" type="text/css" href="/public/css/MarkerCluster.css">');
		$('head').append('<link rel="stylesheet" type="text/css" href="/public/css/MarkerCluster.Default.css">');
		$('head').append("<link href='https://api.mapbox.com/mapbox.js/plugins/leaflet-fullscreen/v1.0.1/leaflet.fullscreen.css' rel='stylesheet' />");

	
		var map = L.map('map').setView([0,0], 1);


		L.tileLayer(window.location.protocol+'//wxs.ign.fr/q9zuax52wm45kvk0bro186p8/wmts?service=WMTS&request=GetTile&version=1.0.0&layer={id}&style=normal&tilematrixSet=PM&format=image%2Fjpeg&height=256&width=256&tilematrix={z}&tilerow={y}&tilecol={x}', {
			maxZoom: 8,
			minZoom: 1,
			attribution: '<a href="http://www.ign.fr">IGN</a>',
			id: 'GEOGRAPHICALGRIDSYSTEMS.MAPS.OVERVIEW'
		}).addTo(map);


		

		$.get("/public/data/fail2ban.geojson",function(data){
			var markers = L.markerClusterGroup();
			markers.addLayer(L.geoJson(data, {
    			style: function (feature) {
        			return {color: feature.properties.color};
    			},
    			onEachFeature: function (feature, layer) {
        			layer.bindPopup("<b>"+feature.properties.field_1+"</b><br>Country: "+feature.properties.field_2+"<br>Sub.: "+feature.properties.field_3+"<br>City: "+feature.properties.field_4);
    			}
			}));
			map.addLayer(markers);
		})
		
	}
</script>


2- Carte de répartition par pays :
----------------------------------

<div class="row">
	<img src="/public/img/fail2ban-country.jpeg" class="col-md-9">
	<div class="col-md-3"><img src="/public/img/fail3ban-country-legend.jpeg"></div>
</div>


3- Carte de chaleur :
---------------------

![](/public/img/post-fail2ban.jpg)


Références :
============

- fond de carte [Géoportail](http://www.geoportail.gouv.fr)
- contours pays trouvés sur [thematicmapping.org](http://thematicmapping.org/downloads/world_borders.php)
- [Leaflet.js](http://leafletjs.com/)
- [QGIS 2.12 Lyon](http://qgis.org/fr/site/)
