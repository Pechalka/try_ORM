$.ajaxSetup({ 
		cache: false ,
		contentType: "application/json; charset=utf-8",
		dataType:"json"
	});


var http = {
	get : function(url, q){
		return $.get(url, q);
	},
	post : function(url, data){
		return $.post(url, JSON.stringify(data))
	},
	del : function(url){
		return $.ajax({
			url : url,
			type : 'DELETE'
		})
	},
	put : function(url ,data){
		return $.ajax({
				url : url,
				type : 'PUT',
				contentType: "application/json; charset=utf-8",
				data : JSON.stringify(data)
			})
	}
}

var Site = function(data){
	var self = this;
	self.id = data.id;
	self.title = ko.observable(data.title);
	self.title.subscribe(function(title){
		http.put('/api/sites/' + data.id, { title : self.title() })
	})
}

var Sites = function(){
	var self = this;

	self.sites = ko.observableArray([]);
	self.siteTtle = ko.observable();


	self.activate = function(){
		http.get('/api/sites', function(json){
			var _sites = ko.utils.arrayMap(json, function(d){ 
				return new Site(d)
			});
			self.sites(_sites)
		})
	}

	self.removeSite = function(site){
		http.del('/api/sites/' + site.id)
			.then(function(){
				self.sites.remove(site);
			})
	}

	self.updateSite = function(e){

	}

	self.addSite = function(){
		http.post('/api/sites', { title : self.siteTtle() })
			.then(function(json){
				self.sites.push(new Site(json))
			})
			.then(function(){
				self.siteTtle('')
			})
	}
}



$(function() {
	var view = new Sites();
	ko.applyBindings(view)
	view.activate();
})