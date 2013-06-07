(function($){
    $.tempMaster = function(el, pathToTemplate, options){
        var base = this;
        
        base.$el = $(el);
        base.el = el;
        
        base.$el.data("tempMaster", base);
        
        base.init = function(){
            if( typeof( pathToTemplate ) === "undefined" || pathToTemplate === null ) pathToTemplate = "main.html";
            
            base.pathToTemplate = pathToTemplate;
            
            base.options = $.extend({},$.tempMaster.defaultOptions, options);
            
        };
        
        base.init();
    };
    
    $.tempMaster.defaultOptions = {
        pathToTemplate: "main.html"
    };
    
    $.fn.tempMaster = function(pathToTemplate, options){
        return this.each(function(){
            (new $.tempMaster(this, pathToTemplate, options));

		    xmlhttp = new XMLHttpRequest();
            xmlhttp.overrideMimeType('text/plain');
            xmlhttp.open("GET",pathToTemplate,false);
            xmlhttp.send(null); 
            var fileContent = xmlhttp.responseText;


		   $(this).append(fileContent);
		   
        });
    };
    
})(jQuery);