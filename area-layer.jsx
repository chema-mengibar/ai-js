
var layer = prompt("Enter the name of the layer with the elements");



//--------------------------------------------------------------------------------------------------

var doc                    = app.activeDocument;
var docPath                = doc.path + "/";
var docSettings         = {};
var file = layer+".txt";

docSettings.html_output_path      = "/";




var outputHtml = function(htmlText,fileDestination) {
	var htmlFile = new File( fileDestination );
	htmlFile.open( "w", "TEXT", "TEXT" );
		htmlFile.lineFeed = "Unix";
		htmlFile.encoding = "UTF-8";
		htmlFile.writeln(htmlText);
	htmlFile.close;
};



if (app.documents.length > 0) {

        var txt ="";
        
        var docH = app.activeDocument.height;
        var docW = app.activeDocument.width;

        var docA = docH * docW;  
      
      
        var area=0;
        
        var objs =app.activeDocument.layers[layer].pathItems; 
        var objsLen = objs.length;  

for (var e=0; e<  objsLen ; e++) {       
   

                var p = objs[e].pathPoints;
                var pLeng = objs[e].pathPoints.length;

                var rPoint =0;
                
                var actP = 0;
                    var nextP = 0;

                for (var i=0; i<  pLeng ; i++) {

                    var actP = i;
                    var nextP;
                    
                    if( actP < pLeng-1){  nextP = i+1; }
                    else{  nextP = 0;  }
                
                    var x1 = Math.round( p[actP].anchor[0] );
                    var y1 = Math.round( p[actP].anchor[1] );
                    var x2 = Math.round( p[nextP].anchor[0] );
                    var y2 = Math.round( p[nextP].anchor[1] );
                   
                   rPoint += ( x1*y2) - (y1*x2);

                }
                
                area +=  Math.abs( rPoint/2 );  

} 




    var pc = (area*100)/docA;
  
    txt = Math.round(pc*100)/100  + ' % \n'; 

    var htmlFileDestination= docPath + docSettings.html_output_path + file;

    outputHtml( txt ,htmlFileDestination);   
    alert(".txt file output in the project folder");



}





