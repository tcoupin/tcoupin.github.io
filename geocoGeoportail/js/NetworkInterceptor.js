if (window.XMLHttpRequest){
	XMLHttpRequest.prototype.realopen = XMLHttpRequest.prototype.open;
	XMLHttpRequest.prototype.open = function(method, url, async, user, pwd){
		this.custom_method = method;
		this.custom_url = url;
		this.realopen(method, url, async, user, pwd);
	};
	

	XMLHttpRequest.prototype.realsetRequestHeader = XMLHttpRequest.prototype.setRequestHeader;
	XMLHttpRequest.prototype.setRequestHeader = function(key,value){
		if (this.custom_header === undefined){
			this.custom_header = [];
		}
		this.custom_header.push({key:key,value:value});
		this.realsetRequestHeader(key,value);
	};

	XMLHttpRequest.prototype.realsend = XMLHttpRequest.prototype.send;
	XMLHttpRequest.prototype.send = function(data){
		var oldonreadystatechange = this.onreadystatechange;
		this.onreadystatechange = function(){
			console.log(this);
			oldonreadystatechange();
		}
		this.realsend(data);
	};
	
}