(function(){

	var command2Attr = function(command){
		var attributes = [];
		command = command.replace(/§[^:]*:/,'').replace("§;","").trim();
		var elems = command.split(/\s+/);
		for (var i in elems){
			var elem = elems[i];
			var key=elem.split("=")[0];
			var val=elem.split("=")[1];
			attributes.push({key:key, val:val});
		}
		return attributes;
	};

	var handleElement = function(node){
		var children = node.childNodes;
		for (var i = 0;i<children.length;i++){
			if (children[i].nodeValue == null){
				handleElement(children[i]);
			} else {
				var elemAttr = children[i].nodeValue.match(/§element:[^§]*§;/g);
				if (elemAttr !== null){
					for (var j = 0; j<elemAttr.length;j++){
						var attributes = command2Attr(elemAttr[j]);
						for (var k in attributes){
							if (attributes[k].key=="class"){
								node.className = node.className + " "+ attributes[k].val;
							} else {
								node.setAttribute(attributes[k].key, attributes[k].val);
							}
						}
					}
				}
			}
		}
	};

	var sections = document.querySelectorAll("section > section");
	for (var i = 0; i < sections.length; i++){
		var section = sections[i];

		/*
		 * alias 
		 */
		// Replace $id:ID§; to §slide:id=ID§;
		section.innerHTML = section.innerHTML.replace(/§id:([^§]*)§;/g,"§slide:id=$1§;");
		// Replace $fragment:4§; to §element:class=fragment data-fragment-index=4§;
		section.innerHTML = section.innerHTML.replace(/§fragment:([^§]*)§;/g,"§element:class=fragment data-fragment-index=$1§;");
		// Replace $fragment to §element:class=fragment§;
		section.innerHTML = section.innerHTML.replace(/§fragment/g,"§element:class=fragment§;");

		/*
		 *  Handle §side tag
		 *  $slide:ATTR§;
		 */

		var slidesAttr = section.innerHTML.match(/§slide:[^§]*§;/g);
		if (slidesAttr !== null){
			for (var j = 0; j<slidesAttr.length; j++){
				var attributes = command2Attr(slidesAttr[j]);
				for (var k in attributes){
					section.setAttribute(attributes[k].key, attributes[k].val);
				}
			}
		}
		//Finaly remove
		section.innerHTML = section.innerHTML.replace(/§slide:[^§]*§;/g,'');

		/*
		 *  Handle §element tag
		 *  §element:ATTR§;
		 */
		
		handleElement(section);
		//Finaly remove
		section.innerHTML = section.innerHTML.replace(/§element:[^§]*§;/g,'');

		// Usefull for writing paragraph command on slide
		section.innerHTML = section.innerHTML.replace(/PARAGRAPH/g,'§');
		
	}


	
})();
