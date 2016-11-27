var setActivity = function(activity, dontstop) {
	if (dontstop !== true){
		$(".pure-menu-item").removeClass("pure-menu-selected");
		var old_activity = localStorage.getItem("activity");
		if (old_activity != null) {
			ACTIVITY[old_activity].stop();

		}
	}
	$(".pure-menu-item:has(a[href='#"+activity+"'])").addClass("pure-menu-selected");
	localStorage.setItem("activity", activity);
	ACTIVITY[activity].start();
	$(".activity").removeClass("active").removeClass("activity-collapsed");
	$(".activity-"+activity).addClass("active");
};

var ACTIVITY = {
	direct: {
		start: function() {
			console.log("start direct");
		},
		stop: function() {
			console.log("stop direct");
		}
	},
	reverse: {
		start: function() {
			console.log("start reverse");
		},
		stop: function() {
			console.log("stop reverse");
		}
	},
	completion: {
		start: function() {
			console.log("start completion");
		},
		stop: function() {
			console.log("stop completion");
		}
	},
	routing: {
		start: function() {
			console.log("start routing");
		},
		stop: function() {
			console.log("stop routing");
		}
	},
	isocurve: {
		start: function() {
			console.log("start isocurve");
		},
		stop: function() {
			console.log("stop isocurve");
		}
	}
}

var toogleActivityForm = function(){
	var parent = $(".activity.active");
	if (parent.hasClass("activity-collapsed")){
		parent.removeClass("activity-collapsed")
	} else {
		parent.addClass("activity-collapsed")
	}
};
