// assembles and returns a rect_ object from a rect object
function make_rect(rect) {
    //alert(rect.x2-rect.x1);
    //alert(rect.id)
    var rect_ = document.createElementNS( SVG_NS, "rect" );
    rect_.setAttribute( "height", rect.y2 - rect.y1 );
    rect_.setAttribute( "width", rect.x2 - rect.x1 );
    rect_.setAttribute( "x", rect.x1.toString() );
    rect_.setAttribute( "y", rect.y1.toString() );
    return rect_;
}

function make_item( item ) {
    var wrapper = document.createElementNS( SVG_NS, "g" );
    wrapper.setAttribute( "fill", "rgb("+ item.color.toString() +")" );
    wrapper.setAttribute( "fill-opacity", document.transparency.toString() );
    wrapper.setAttribute( "stroke", "black" );
    wrapper.setAttribute( "stroke-width", "1" );
    //wrapper.setAttribute( "onmouseover", 'set_color(this);' );
    //wrapper.setAttribute( "onmouseout", 'unset_color(this);' );
    wrapper.addEventListener( "mouseover", handle_over, false );
    wrapper.addEventListener( "mouseout", handle_out, false );
    wrapper.addEventListener( "click", click_handler, false );
    //alert(item.id)
    wrapper.setAttribute( "id", item.id );
    document.items[item.id] = {id:item.id, color:item.color, area:[item.x1, item.y1, item.x2, item.y2]};
    var rect = make_rect(item);
    wrapper.appendChild( rect );
    return wrapper;
}
