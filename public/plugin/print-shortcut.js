(function(){

	if (window.location.search.match( /print-pdf/gi )) {
		window.print();
	} else {
		document.addEventListener(
			"keydown",
			function(e){
			    if(e.ctrlKey && e.keyCode == 80){
			    	window.location.search="?print-pdf"
    	    		e.preventDefault();
    			}
			}
		);
		
	}

})();