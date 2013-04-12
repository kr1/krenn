
function get_color(){
    var col = (document.unicolor ? document.unicolor : [randInt(255),randInt(255),randInt(255)])
    return col
}

function complementary_color(color){
    //color should be a list of three values between 0 and 255;
    res = []
    for (i in color){
        res.push(color[i] > 127 ? randInt(64) : randInt(64) + 191)
    }
    return res
}
