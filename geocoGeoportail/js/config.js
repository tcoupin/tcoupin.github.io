var CONFIG;
var toogleConfig = function(){
	$("div.config").css("opacity", function(i,val){
		if (val=="0"){
			$("div.config").css("opacity", 0.95);
			$("div.config").css("visibility","visible");
		} else {
			$("div.config").css("opacity", 0);
			$("div.config").css("visibility","hidden");
		}
	});
	
}
var resetConfig = function(callback){
	$.getJSON("./config.json",function(data){
		localStorage.setItem("config", JSON.stringify(data));
		CONFIG = data;
		if (callback){
			callback();
		}
	})
	.fail(function(){
		alert("Un problème pendant le chargement de la configuration.");
	});
}
var initConfig = function(callback){
	var config = localStorage.getItem("config");
	if (config == null || config === undefined){
		resetConfig(callback);
	} else {
		CONFIG = JSON.parse(config);
		callback();
	}
	
}
