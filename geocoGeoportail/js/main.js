var map;
window.onload = function() {
	initConfig(function(){
		var old_activity = (location.hash!=''?location.hash.replace('#',''):null) || localStorage.getItem("activity") || 'direct';
		setActivity(old_activity,true);
	
		$("a.activity-link").click(function(){
			setActivity($(this).attr('href').replace('#',''));
		});
	
		$("a.config").click(function(){
			toogleConfig();
		});
		
		map = L.map('map',{zoomControl: false}).setView([48.845,2.424], 10);

		L.control.zoom({position:'topright'}).addTo(map);

		L.tileLayer('https://wxs.ign.fr/'+CONFIG.api_key+'/wmts?service=WMTS&request=GetTile&version=1.0.0&layer={id}&style=normal&tilematrixSet=PM&format=image%2Fjpeg&height=256&width=256&tilematrix={z}&tilerow={y}&tilecol={x}', {
			maxZoom: 18,
			minZoom: 0,
			attribution: '<a href="http://www.ign.fr">IGN</a>',
			id: 'GEOGRAPHICALGRIDSYSTEMS.MAPS',
			opacity:0.5
		}).addTo(map);
	});
}

var toogleMapData = function(){
	$("#map").css("margin-left", function(i,val){
		if (val == "0px"){
			$("#map").css("margin-left","-100%");
			$("#data").css("margin-left","0px");
		} else {
			$("#map").css("margin-left","0px");
			$("#data").css("margin-left","100%");
		}
	});
}