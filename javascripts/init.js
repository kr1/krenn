// use of document as namespace os justified by the fact, that document here refers 
// only to the svg-document
document.data_urls = data_urls;
document.data = data;

// -------------------------- INIT --------------------------
function init() {
    var data = document.data;
    sqos = prepare_square_positions(data, document.X, document.Y)
    //console.log(sqos.toSource());
    document.items = new Object();
    var ovls = common_area_sweep(sqos, 591);
    //console.log(ovls.toSource());

    for (var n=0;n < sqos.length; n++){
        var wrapper = make_item(sqos[n]);
        //var wrapper = make_item({color:cols[n], id:ids[n], x1:sqs[n][0][0], y1:sqs[n][0][1], x2:sqs[n][1][0], y2:sqs[n][1][1]});
        document.getElementById( "top_level" ).appendChild( wrapper );
    }
    for (i in ovls){
        //alert("overlay: " + ovls[i])
        //alert(i.split(",").join(document.overlay_delimiter))
        var obj_ = {color: document.overlay_color,
                    id: i.split(",").join(document.overlay_delimiter),
                    x1: ovls[i][0][0], y1: ovls[i][0][1],
                    x2: ovls[i][1][0], y2: ovls[i][1][1]
                    };
        var wrapper = make_item(obj_);
        document.getElementById( "top_level" ).appendChild( wrapper );
        document.items[i] = obj_;
    }
    // MONITOR - ELEMENT
    var wrapper = document.createElementNS( SVG_NS, "g" );
    wrapper.setAttribute( "fill", "black" );
    wrapper.setAttribute( "fill-opacity", "0.7" );
    wrapper.setAttribute( "stroke", "black" );
    wrapper.setAttribute( "stroke-width", "0.1" );
    document.monitor = document.createElementNS(SVG_NS, "text");
    document.monitor.setAttribute('font-size', "12")
    document.monitor.setAttribute( "x", 10);
    document.monitor.setAttribute( "y", 16);
    wrapper.appendChild( document.monitor );
    var newText = document.createTextNode("");
    document.monitor.appendChild(newText);
    document.getElementById( "top_level" ).appendChild( wrapper );
}
