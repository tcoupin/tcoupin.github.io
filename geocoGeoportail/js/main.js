var map;
window.onload = function() {
	initConfig(function(){
		var old_activity = (location.hash!=''?location.hash.replace('#',''):null) || localStorage.getItem("activity") || 'direct';
		setActivity(old_activity,true);
	
		$("a.activity-link").click(function(){
			setActivity($(this).attr('href').replace('#',''));
		});
	
		$("a.config").click(toogleConfig);
		$(".activity-title").click(toogleActivityForm);
		
		Gp.Services.getConfig({
    		apiKey: CONFIG.api_key,
    		onSuccess: function (response) {
    		    // votre utilisation de l'extension Géoportail pour Leaflet
				map = L.map('map',{zoomControl: false}).setView([48.845,2.424], 10);

				L.control.zoom({position:'topright'}).addTo(map);

				var lyr = L.geoportalLayer.WMTS(
					{
						layer  : "GEOGRAPHICALGRIDSYSTEMS.MAPS"
					},
					{
						opacity:0.5
					}
				) ;

				lyr.addTo(map); 
				var layerSwitcher = L.geoportalControl.LayerSwitcher({position:"topright"});
				map.addControl(layerSwitcher);

				var search = L.geoportalControl.SearchEngine({
					position:"topright",
					resources:["StreetAddress","PositionOfInterest"],
					displayInfo: false,
					displayAdvancedSearch: false
				});
				map.addControl(search);
    		}
		});


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