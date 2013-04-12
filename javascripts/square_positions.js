// assembles and returns a rect_ object from a rect object
function common_area_sweep(all, max){
    all = all.sort(function(a, b){return a.x1 > b.x1})
    //alert("all_sorted:" + all.toSource());
    c = 0
    resSi = {}
    resDou = {}
    for (var i = 0; i <= max; i++){
        for (o in all){
            if (all[o].x1 == i){
                for (r in resSi){
                    //alert("y-range: " + resSi[r][0] + " to " + resSi[r][1] +"\ntesting: " + all[o].id);

                    //// check if one of the vertices of the newly detected x1 lies inside the y-range of the already registered OR the other way round
                    if (((resSi[r][0] <= all[o].y1 && all[o].y1 <= resSi[r][1]) || (resSi[r][0] <= all[o].y2 && all[o].y2 <= resSi[r][1])) || (all[o].y1 <= resSi[r][0] && resSi[r][1] <= all[o].y2)){
                        resDou[[r, all[o].id]] = [[all[o].x1, (all[o].y1 > resSi[r][0] ? all[o].y1 : resSi[r][0])], [all[o].x2, all[o].y2]]
                        //alert("overlay: " + resDou.toSource())
                    }
                }
                resSi[all[o].id] = [all[o].y1,all[o].y2]
            } else if (all[o].x2 == i){
                //alert("end detected");
                //alert(all[o].id);
                for (r in resDou){
                    var one = r.split(",")[0]
                    var two = r.split(",")[1]
                    if ((one == all[o].id || two == all[o].id)){// && resDou[r][2] != "complete"){
                        //alert("finishing");
                        resDou[r][1] = [(resDou[r][1][0] > all[o].x2 && all[o].x2 > resDou[r][0][0] ? all[o].x2 : resDou[r][1][0]),
                                        (resDou[r][1][1] > all[o].y2 && all[o].y2 > resDou[r][0][1] ? all[o].y2 : resDou[r][1][1])]
                        //alert(resDou[r]);
                    }
                }
                delete resSi[all[o].id];
            }
        c += 1
        }
    }
    return resDou
}


// returns the position for the data-elements
// needs  X and Y dimensions
function prepare_square_positions(data, X, Y){
    //alert(data);
    //alert($('#mainscript'))
    sum_arr = []
    for (it in data){
        sum_arr.push([it, sum_(data[it])]);
        //alert(data[it]["aaa"]);
    }
    //alert("sum_arr:" + sum_arr.toSource());
    //alert("max:" + max_(sum_arr).toSource());
    //alert("ergo:" + data[max_(sum_arr)[0]]);
    c_key =  max_(sum_arr)[0];

   // alert(get_keys(data));
    num_its = get_keys(data).length;
    res_arr = [];
    if (document.diagram_type == 'flower'){
    if (num_its == 1){
        for (i in data){
            res_arr.push({id:i, x1:X/3, y1:Y/3, x2:2*X/3, y2:2*Y/3, color:get_color()})
        }
    } else if (num_its == 2){
        var counter = 0;
        for (i in data){
            if (counter == 0)
                res_arr.push({id:i, x1:Math.round(0.2 * X), y1:0.2 * Y, x2: Math.round(0.6* X), y2:0.8 * Y, color:get_color()});
            else if (counter == 1)
                res_arr.push({id:i, x1:Math.round(0.4 * X), y1:0.2 * Y, x2: Math.round(0.8 * X), y2:0.8 * Y, color:get_color()});
        counter++;
        }
    } else if (num_its == 3){
        var counter = 0;
        for (i in data){
            // first centered up
            if (counter == 0)
                res_arr.push({id:i, x1: Math.round(0.1 * X), y1:0.3 * Y, x2: Math.round(0.9 * X), y2:0.7*Y,color:get_color()});
            // second left down
            else if (counter == 1)
                res_arr.push({id:i, x1: Math.round(0.1 * X), y1:0.1 * Y, x2: Math.round(0.9 * X), y2:0.4*Y,color:get_color()});
            else if (counter == 2)
                res_arr.push({id:i, x1: Math.round(0.1 * X), y1:0.6 * Y, x2: Math.round(0.9 * X), y2:0.9*Y,color:get_color()});
        counter++;
        }
    } else if (num_its == 4){
        var counter = 0;
        for (i in data){
            // first centered
            if (counter == 0)
                res_arr.push({id:i, x1: Math.round(0.2 * X), y1:0.3 * Y, x2:Math.round(0.8 * X), y2: 0.7*Y,color:get_color()});
            // second left up
            else if (counter == 1)
                res_arr.push({id:i, x1: Math.round(0.1 * X), y1:0.1 * Y, x2: Math.round(0.4 * X), y2:(0.4 * Y),color:get_color()});
            // third right up
            else if (counter == 2)
                res_arr.push({id:i, x1: Math.round(0.6 * X), y1:0.1 * Y, x2: Math.round(0.9 *X), y2: 0.4 * Y,color:get_color()});
            // forth centered down
            else if (counter == 3)
                res_arr.push({id:i, x1: Math.round(0.3 * X), y1:0.6 * Y, x2: Math.round(0.7 * X), y2: 0.9 * Y,color:get_color()});
            counter++
        }
    } else if (num_its == 5){
        var counter = 0;
        for (i in data){
            // first centered
            if (counter == 0)
                res_arr.push({id:i, x1:Math.round(0.2*X), y1:0.2 * Y, x2:Math.round(0.8*X), y2:0.8*Y,color:get_color()});
            // second left down
            else if (counter == 1)
                res_arr.push({id:i, x1:Math.round(0.1 * X), y1:0.6 * Y, x2:Math.round(0.4 * X), y2:(0.9*Y),color:get_color()});
            // third left up
            else if (counter == 2)
                res_arr.push({id:i, x1:Math.round(0.1 * X), y1:0.1 * Y, x2:Math.round(0.4 * X), y2:(0.4 * Y),color:get_color()});
            // fourth right up
            else if (counter == 3)
                res_arr.push({id:i, x1:Math.round(0.6 * X), y1:0.1 * Y, x2:Math.round(0.9 * X), y2:(0.4 * Y),color:get_color()});
            // fifth right down
            else if (counter == 4)
                res_arr.push({id:i, x1:Math.round(0.6 * X), y1:0.6 * Y, x2:Math.round(0.9 * X), y2: 0.9 * Y,color:get_color()});
            counter++
        }
     } else if (num_its == 6){
        var counter = 0;
        for (i in data){
            // first centered
            if (counter == 0)
                res_arr.push({id:i, x1:Math.round(0.2 * X), y1:0.3 * Y, x2:Math.round(0.8 * X), y2:0.7 * Y,color:get_color()});
            // second left down
            else if (counter == 1)
                res_arr.push({id:i, x1:Math.round(0.12 * X), y1:(Y/2)+10, x2: Math.round(0.48 * X), y2:(0.9*Y),color:get_color()});
            // third left up
            else if (counter == 2)
                res_arr.push({id:i, x1:Math.round( 0.1 * X), y1:0.1 * Y, x2: Math.round( 0.35 *  X), y2:0.4 *Y,color:get_color()});
            // fourth centered up
            if (counter == 3)
                res_arr.push({id:i, x1: Math.round(0.38 * X) , y1: 0.08 * Y, x2: 0.62 * X, y2: 0.45*Y,color:get_color()});
            // fifth right up
            else if (counter == 4)
                res_arr.push({id:i, x1:Math.round( 0.65 * X), y1:0.1 * Y, x2: 0.9 * X, y2:0.4 * Y,color:get_color()});
            // sixth right down
            else if (counter == 5)
                res_arr.push({id:i, x1:Math.round(0.52 * X), y1:(Y/2) + 10, x2:Math.round(0.88*X), y2:0.9*Y,color:get_color()});
            counter++
        }
    } else if (num_its == 7 || num_its > 7){
        var counter = 0;
        for (i in data){
            // first centered
            if (counter == 0)
                res_arr.push({id:i, x1: Math.round(0.2 * X), y1: 0.3 * Y, x2: Math.round(0.8 * X), y2:0.7 * Y,color:get_color()});
            // second left down
            else if (counter == 1)
                res_arr.push({id:i, x1:Math.round( 0.1 * X), y1:(0.52 * Y), x2:Math.round( 0.39 * X), y2:(0.8 * Y),color:get_color()});
            // third left up
            else if (counter == 2)
                res_arr.push({id:i, x1: Math.round(0.1 * X), y1: 0.2 * Y, x2: Math.round( 0.39 * X), y2: 0.48 * Y,color:get_color()});
            // fourth centered up
            if (counter == 3)
                res_arr.push({id:i, x1: Math.round(0.41 * X) , y1: 0.1 * Y, x2: Math.round(0.59 * X), y2: 0.4*Y,color:get_color()});
            // fifth right up
            else if (counter == 4)
                res_arr.push({id:i, x1: Math.round(0.61 * X), y1:0.2 *Y, x2: 0.9 * X, y2:0.48 * Y,color:get_color()});
            // sixth right down
            else if (counter == 5)
                res_arr.push({id:i, x1: 0.61 * X, y1:0.52 * Y, x2:0.9 * X, y2: 0.8 * Y,color:get_color()});
            // seventh centered down
            else if (counter == 6)
                res_arr.push({id:i, x1: Math.round(0.41 * X), y1: 0.6*Y, x2: Math.round(0.59 * X), y2:0.9 * Y,color:get_color()});
            counter++
        }
    }
    return res_arr
    } else if (document.diagram_type == 'flagpole'){
        var counter = 0;
        // first set vertical column of center-field
        res_arr.push({id:get_keys(data)[0], x1: Math.round(0.1 * X), y1: 0.0 * Y , x2: Math.round(0.3 * X), y2: Y,color:get_color()});
        var keys =get_keys(data).slice(1);
        weight_arr = data[get_keys(data)[0]].slice(1)
        w_sum = sum_(weight_arr);
        //alert(weight_arr)
        Y_counter = 0.0 * Y

        for (i in keys){
            // first the horizontal items
            if (counter < num_its) {
                Y_offset = ((Y * 1.0/ w_sum ) * weight_arr[i]) * 0.88
                //alert(Y_offset)
                res_arr.push({id:keys[i], x1: Math.round(0.2 * X), y1: Y_counter, x2: Math.round(0.8 * X), y2: Y_counter + Y_offset,color:get_color()});
                Y_counter = (Y_counter + Y_offset) + Y *  0.018
            }
            counter++
        }
        return res_arr
    } else if (document.diagram_type == 'shelve'){
        var overlay_border = 0.23;
        var left_border = 0.33;
        var right_border = 0.66;
        var counter = 0;
        var weight_arr_1 = data[get_keys(data)[0]].slice(2)
        var weight_arr_2 = data[get_keys(data)[1]].slice(2)
        var max_1 = max_weight(weight_arr_1);
        var max_2 = max_weight(weight_arr_2);
        //alert(max_1 + ":" +max_2)
        // first set vertical column of both center-fields
        res_arr.push({id:get_keys(data)[0], x1: Math.round(0.1 * X), y1: 0.0 * Y , x2: Math.round(left_border * X), y2: 1.0 * Y,color:get_color()});
        var keys = get_keys(data).slice(2);
        for (i in keys){
            var offset_1 = (overlay_border / max_1) * weight_arr_1[i]
            //alert(offset_1);
            var offset_2 = (overlay_border / max_2) * weight_arr_2[i]
            var X_left_off = left_border - offset_1;
            var X_right_off = right_border + offset_2;
            // first the horizontal items
            if (counter < num_its) {
                res_arr.push({id: keys[i],
                              x1: Math.round(X_left_off * X),
                              y1: (Y / (num_its - 1)) * (counter + 0.8) - 0.02 * Y,
                              x2: Math.round(X_right_off * X),
                              y2: (Y / (num_its-1)) * (counter + 1.6) - 0.02 *Y,
                              color:get_color()});
            }
            counter++
        }
        res_arr.push({id:get_keys(data)[1], x1: Math.round(right_border * X), y1: 0.0 * Y , x2: Math.round(0.9 * X), y2: 1.0 * Y,color:get_color()});
        return res_arr
}

}




