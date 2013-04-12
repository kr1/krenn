function click_handler(event){
    //alert(event.target.parentNode.id + "\ncolor: " + document.items[event.target.parentNode.id].color );
    //alert(event.target.parentNode.id  +"'s click leads to: " + document.data_urls[event.target.parentNode.id][0]);
    var split_ = event.target.parentNode.id.split(document.overlay_delimiter);
    if (document.use_ctrl_click && event.ctrlKey){
        var key_ = (split_.length > 1 ? split_.sort().join(document.overlay_delimiter) : split_ )
        if (window.parent)
            window.parent.location = document.data_urls[key_][0];
        else
            window.location =  document.data_urls[event.target.parentNode.id][0];
        return
    }
    if (document.use_ctrl_click && event.shiftKey){
        var url = (split_.length > 1 ? document.shift_click_double_id_fun(split_[0],split_[1]) : document.shift_click_fun(event.target.parentNode.id))
        if (window.parent)
            window.parent.location =  url;
        else
            window.location =  url;
        return
    }
    //var tag_ = (split.length > 1 ? [split[0],split[1]].toSource() : [event.target.parentNode.id].toSource())
    var url = (split_.length > 1 ? document.rewrite_double_ids_for_url(split_[0],split_[1]) : document.rewrite_ids_for_url(event.target.parentNode.id))
    if (window.parent)
      window.parent.location = url ;
    else
      window.location = url ;
}

function handle_over( event ) {
    var hit = []
    var pos = {x:event.pageX, y: event.pageY};
    //alert(event.target.parentNode.id)
    document.monitor.childNodes[0].data = event.target.parentNode.id //.split(",").join("/");
    //alert(event.target.parentNode.getAttribute('fill'));
    //alert(document.items[event.target.parentNode.id].color);
    event.target.parentNode.setAttribute( 'fill', 'rgb(' + complementary_color(document.items[event.target.parentNode.id].color).toString() +')');
    //event.setAttribute( 'fill', 'blue' );
}

function handle_out( event ) {
    //alert(event.target.parentNode.id)
    document.monitor.childNodes[0].data = "";
    //event.target.parentNode.setAttribute( 'fill', 'rgb('+ document.items[event.target.parentNode.id].color.toString() +')' );
    event.target.parentNode.setAttribute( 'fill', 'rgb(255,255,255)');
    for (e in document.items){
        document.getElementById(document.items[e].id).setAttribute('fill','rgb('+ document.items[e].color.toString() +')')
    }
}
