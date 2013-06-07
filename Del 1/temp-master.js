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

		    var fileContent = GetFileContent(pathToTemplate);


//            while(IncludesLeft(fileContent)){
  //              fileContent = IncludeTemplate(fileContent);
    //        }
            fileContent = IncludeATemplate(fileContent);
            //fileContent = fileContent.replace(text_to_get, "bahh");            

		   $(this).append(fileContent);
		   
        });
    };
    
    function IncludesLeft (text) {
        return text.indexOf("{include") >= 0;
    }

    function IncludeTemplate (text, pathExtention) {

       
        
        

        
        if(IncludesLeft(fileContent)){
            var pathToFolder = pathToTemplate.substring(0, pathToTemplate.lastIndexOf("/"));
            return IncludeTemplate(fileContent, pathToFolder);
        }
        else{
            return fileContent;
        }
            
    }

    function IncludeATemplate(text){
        IncludeATemplateRec("",text);
    }

    function IncludeATemplateRec (path, text) {
        
        if(!IncludesLeft(text)){
            return text;
        }else{
            //Get position of eg {include animals/animals.html}
            var includeIndex = text.indexOf("{include");
            var endPos = text.indexOf('}',includeIndex);
            var includeSyntaxToReplace = text.substring(includeIndex, endPos+1);

            //Check if other path needs to be prepended
            var pathToTemplate = text.substring(includeIndex+9,endPos);
            if(path != "" ){
                pathToTemplate = path +"/"+ pathToTemplate;
            }


            //Get the file content
            var fileContent = text.replace(includeSyntaxToReplace, GetFileContent(pathToTemplate));

            IncludeATemplateRec(pathToTemplate.substring(0, pathToTemplate.lastIndexOf("/")), fileContent)
        }
    }

    function GetFileContent (pahtToFile) {
        xmlhttp = new XMLHttpRequest();
        xmlhttp.overrideMimeType('text/plain');
        xmlhttp.open("GET",pahtToFile,false);
        xmlhttp.send(null); 
        return xmlhttp.responseText;
    }
})(jQuery);