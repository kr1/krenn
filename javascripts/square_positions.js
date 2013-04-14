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
    //console.log(data);
    sum_arr = []

    // sum all weights
    for (it in data){
        sum_arr.push([it, sum_(data[it])]);
        //alert(data[it]["aaa"]);
    }
    
    //console.log("sum_arr:" + sum_arr.toSource());
    //console.log("max:" + max_(sum_arr).toSource());
    //console.log("ergo:" + data[max_(sum_arr)[0]]);

    var all_keys = get_keys(data);
    c_key =  max_(sum_arr)[0]; // key of the heaviest element

    // console.log(all_keys);
    num_its = all_keys.length;
    res_arr = [];
    var edge_positions = {'flower':{1: {0: {x1:0.333, x2:0.666, y1:0.33, y2:0.666}},
                                    2: {0: {x1:0.2, x2:0.6, y1:0.2, y2:0.8},
                                        1: {x1:0.4, x2:0.8, y1:0.2, y2:0.8}},
                                    3: {0: {x1: 0.1, y1:0.3, x2:0.9, y2:0.7},
                                        1: {x1:0.1, y1:0.1, x2:0.9, y2:0.4},
                                        2: {x1: 0.1, y1: 0.6 , x2:0.9, y2:0.9}},
                                    4: {O: {x1:0.2, y1:0.3, x2:0.8, y2: 0.7},
                                        1: {x1: 0.1, y1: 0.1, x2: 0.4, y2: 0.4},
                                        2: {x1: 0.6, y1:0.1, x2: 0.9, y2:0.4},
                                        3: {x1:0.3, y1:0.6, x2: 0.7, y2: 0.9}},
                                    5: {0: {x1: 0.2, y1: 0.2, x2: 0.8, y2: 0.8},
                                        1: {x1: 0.1, y1: 0.6, x2: 0.4, y2: 0.9},
                                        2: {x1: 0.1, y1: 0.1, x2: 0.4, y2: 0.4},
                                        3: {x1: 0.6, y1: 0.1, x2: 0.9, y2: 0.},
                                        4: {x1:0.6, y1:0.6, x2: 0.9, y2: 0.9}},
                                    6: {0: {x1: 0.2, y1:0.3, x2:0.8, y2:0.7},
                                        1: {x1: 0.12, y1: "0.5 * Y + 10", x2: 0.48, y2: 0.9},
                                        2: {x1:0.1, y1:0.1, x2: 0.35, y2:0.4},
                                        3: {x1: 0.38, y1: 0.08, x2: 0.62, y2: 0.45},
                                        4: {x1: 0.65, y1:0.1, x2: 0.9, y2:0.4},
                                        5: {x1: 0.52, y1: "0.5 * Y + 10", x2: 0.88, y2:0.9}},
                                    7: {0: {x1: 0.2, y1: 0.3, x2: 0.8, y2:0.7},
                                        1: {x1: 0.1, y1: 0.52, x2: 0.39, y2: 0.8},
                                        2: {x1: 0.1, y1: 0.2, x2: 0.39, y2: 0.48},
                                        3: {x1: 0.41, y1: 0.1, x2: 0.59, y2: 0.4},
                                        4: {x1: 0.61, y1:0.2, x2: 0.9, y2: 0.48},
                                        5: {x1: 0.61, y1: 0.52, x2:0.9, y2: 0.8},
                                        6: {x1: 0.41, y1: 0.6, x2: 0.59, y2: 0.9}}
                                   }
                         }
    if (document.diagram_type == 'flower'){
      // flower mode accepts a maximum of 7 elements
      num_its = num_its > 7 ? 7 : num_its;
      var names = get_keys(data);
      var  edges = edge_positions['flower'][num_its];
      for (var idx = 0; idx < num_its; idx++){
          var item_edges = edges[idx]
          //console.log(item_edges);
          res_arr.push({id: names[idx],
                        x1: Math.round(item_edges.x1 * X),
                        x2: Math.round(item_edges.x2 * X),
                        y1: Math.round(typeof(item_edges.y1) == "string" ? eval(item_edges.y1) : item_edges.y1 * Y),
                        y2: Math.round(item_edges.y2 * Y),
                        color: get_color()
                       }
                      )
      }
      return res_arr
    } else if (document.diagram_type == 'flagpole'){
        var counter = 0;
        // first set vertical column of center-field
        res_arr.push({id:all_keys[0], x1: Math.round(0.1 * X), y1: 0.0 * Y , x2: Math.round(0.3 * X), y2: Y,color:get_color()});
        var keys =all_keys.slice(1);
        weight_arr = data[all_keys[0]].slice(1)
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
        var weight_arr_1 = data[all_keys[0]].slice(2)
        var weight_arr_2 = data[all_keys[1]].slice(2)
        var max_1 = max_weight(weight_arr_1);
        var max_2 = max_weight(weight_arr_2);
        //alert(max_1 + ":" +max_2)
        // first set vertical column of both center-fields
        res_arr.push({id:all_keys[0], x1: Math.round(0.1 * X), y1: 0.0 * Y , x2: Math.round(left_border * X), y2: 1.0 * Y,color:get_color()});
        var keys = all_keys.slice(2);
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
        res_arr.push({id:all_keys[1], x1: Math.round(right_border * X), y1: 0.0 * Y , x2: Math.round(0.9 * X), y2: 1.0 * Y,color:get_color()});
        return res_arr
}

}




