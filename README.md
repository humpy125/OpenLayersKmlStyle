# OpenLayersKmlStyle
Adds styles to the OpenLayers 2 kml export.
The write method adds a Document node after the kml node that encapsulates the rest of the KML output. A new Style node is added directly under the Document node using the styles passed in on creation

Usage
Add KmlStyle.js to the page
Create a new kml format object as per the OpenLayers documentation however, there is also a styleDef property available eg:

        styleDef:{
            styleId: <style name>,
            icon:{colour: <icon colour>,scale:<scale>, href:<href>},
            label:{colour: <label colour>,scale:<scale>},
            line:{colour: <line colour>, width: <width>},
            poly: {colour: <poly colour>, mode: <mode>}
        }
        
Example Usage:

    var kmlFmt = new KmlStyle({
        foldersName: "Kml Export",
        styleDef:{
            styleId: "myStyleDef",
            icon:{colour: "7fffaaff",scale:0.5, href:"http://localhost:8080/BrmModule/assets/img/busstop.png"},
            label:{colour: "7fffaaff",scale:0.5},
            line:{colour: "ffffff00", width: 5},
            poly: {colour: "ffffff00", mode: "random"}
        }
    });
    
Note: the icon href will need to be available to the system using the resultant KML file.
