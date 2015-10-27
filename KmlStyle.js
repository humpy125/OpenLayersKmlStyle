/**
 * Modified by g-humphries on 27/10/2015.
 */
/* ======================================================================
 OpenLayers/Format/KML.js
 ====================================================================== */

/* Copyright (c) 2006-2013 by OpenLayers Contributors (see authors.txt for
 * full list of contributors). Published under the 2-clause BSD license.
 * See license.txt in the OpenLayers distribution or repository for the
 * full text of the license. */

/**
 * @requires OpenLayers/Format/KML.js
 */

/**
 * Class: OpenLayers.Format.KMLSTYLE
 * Write KML. Create a new instance with the <OpenLayers.Format.KMLSTYLE>
 *     constructor.
 *
 * Inherits from:
 *  - <OpenLayers.Format.KML>
 */
KmlStyle = OpenLayers.Class(OpenLayers.Format.KML, {


/**
 * APIMethod: write
 * Accept Feature Collection, and return a string.
 *
 * Parameters:
 * features - {Array(<OpenLayers.Feature.Vector>)} An array of features.
 *
 * Returns:
 * {String} A KML string.
 */
write: function(features) {
    if(!(OpenLayers.Util.isArray(features))) {
        features = [features];
    }
    var kml = this.createElementNS(this.kmlns, "kml");
    var document = this.createElementNS(this.kmlns, "Document");
    if (this.styleDef) {
        var style = this.createStyleXML();
        document.appendChild(style);
    }
    var folder = this.createFolderXML();
    for(var i=0, len=features.length; i<len; ++i) {
        folder.appendChild(this.createPlacemarkXML(features[i]));
    }
    document.appendChild(folder);
    kml.appendChild(document);
    return OpenLayers.Format.XML.prototype.write.apply(this, [kml]);
},

    /**
     * Method: createStyleXML
     * Creates and returns a KML style node
     *
     * Returns:
     * {DOMElement}
     */
    createStyleXML: function() {
        // Style
        var style = this.createElementNS(this.kmlns, "Style");

        // Style name
        if (this.styleDef) {
            var styleId = this.createElementNS(this.kmlns, "id");
            var styleIdText = this.createTextNode(this.styleDef.styleId);
            styleId.appendChild(styleIdText);
            style.appendChild(styleId);
            if (this.styleDef.icon){
                var iconStyle = this.createElementNS(this.kmlns, "IconStyle");
                var colour = this.createElementNS(this.kmlns, "color");
                var colourVal = this.createTextNode(this.styleDef.icon.colour);
                colour.appendChild(colourVal);
                var scale = this.createElementNS(this.kmlns, "scale");
                var scaleVal = this.createTextNode(this.styleDef.icon.scale);
                scale.appendChild(scaleVal);
                var icon = this.createElementNS(this.kmlns, "Icon");
                var iconHref = this.createElementNS(this.kmlns, "href");
                var href = this.createTextNode(this.styleDef.icon.href);
                iconHref.appendChild(href);
                icon.appendChild(iconHref);
                iconStyle.appendChild(colour);
                iconStyle.appendChild(scale);
                iconStyle.appendChild(icon);
                style.appendChild(iconStyle);
            }
            if (this.styleDef.label){
                var label = this.createElementNS(this.kmlns, "LabelStyle");
                var colour = this.createElementNS(this.kmlns, "color");
                var colourVal = this.createTextNode(this.styleDef.label.colour);
                colour.appendChild(colourVal);
                var scale = this.createElementNS(this.kmlns, "scale");
                var scaleVal = this.createTextNode(this.styleDef.label.scale);
                scale.appendChild(scaleVal);
                label.appendChild(colour);
                label.appendChild(scale);
                style.appendChild(label);
            }
            if (this.styleDef.line){
                var line = this.createElementNS(this.kmlns, "LineStyle");
                var colour = this.createElementNS(this.kmlns, "color");
                var colourVal = this.createTextNode(this.styleDef.line.colour);
                colour.appendChild(colourVal);
                var width = this.createElementNS(this.kmlns, "width");
                var widthVal = this.createTextNode(this.styleDef.line.width);
                width.appendChild(widthVal);
                line.appendChild(colour);
                line.appendChild(width);
                style.appendChild(line);Usage
            }
            if (this.styleDef.poly){
                var poly = this.createElementNS(this.kmlns, "PolyStyle");
                var colour = this.createElementNS(this.kmlns, "color");
                var colourVal = this.createTextNode(this.styleDef.poly.colour);
                colour.appendChild(colourVal);
                var mode = this.createElementNS(this.kmlns, "mode");
                var modeVal = this.createTextNode(this.styleDef.poly.mode);
                mode.appendChild(modeVal);
                poly.appendChild(colour);
                poly.appendChild(mode);
                style.appendChild(poly);
            }
        }
        return style;
    },
    /**
     * Method: createPlacemarkXML
     * Creates and returns a KML placemark node representing the given feature.
     *
     * Parameters:
     * feature - {<OpenLayers.Feature.Vector>}
     *
     * Returns:
     * {DOMElement}
     */
    createPlacemarkXML: function(feature) {
        // Placemark name
        var placemarkName = this.createElementNS(this.kmlns, "name");
        var label = (feature.style && feature.style.label) ? feature.style.label : feature.id;
        var name = feature.attributes.name || label;
        placemarkName.appendChild(this.createTextNode(name));

        // Placemark description
        var placemarkDesc = this.createElementNS(this.kmlns, "description");
        var desc = feature.attributes.description || this.placemarksDesc;
        placemarkDesc.appendChild(this.createTextNode(desc));

        //Placemark style
        if (this.styleDef) {
            var placemarkStyle = this.createElementNS(this.kmlns, "styleUrl");
            var style = this.styleDef.styleId;
            placemarkStyle.appendChild(this.createTextNode(style));
        }

        // Placemark
        var placemarkNode = this.createElementNS(this.kmlns, "Placemark");
        if(feature.fid != null) {
            placemarkNode.setAttribute("id", feature.fid);
        }
        placemarkNode.appendChild(placemarkName);
        placemarkNode.appendChild(placemarkDesc);
        if (placemarkStyle)
            placemarkNode.appendChild(placemarkStyle);

        // Geometry node (Point, LineString, etc. nodes)
        var geometryNode = this.buildGeometryNode(feature.geometry);
        placemarkNode.appendChild(geometryNode);

        // output attributes as extendedData
        if (feature.attributes) {
            var edNode = this.buildExtendedData(feature.attributes);
            if (edNode) {
                placemarkNode.appendChild(edNode);
            }
        }

        return placemarkNode;
    },

    CLASS_NAME: "KmlStyle"
});
