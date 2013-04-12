// general JS utils like max, sum for arrays, randInt, etc.
function sum_(arr){
    res = 0;
    for (i in arr){
        res += arr[i]
    }
    return res
}

function max_(arr){
    var max_int = 0;
    var max_id;
    for (i in arr){
        if (arr[i][1] > max_int){
            max_int = arr[i][1];
            max_id = arr[i][0];
        }
    }
    return [max_id,max_int]
}

function max_weight(arr){
    var max_int = 0;
    for (i in arr){
        if (arr[i] > max_int){
            max_int = arr[i];
        }
    }
    return max_int
}

function get_keys(obj){
    var arr = [];
    for (i in obj){
        arr.push(i)
    }
    return arr
}

function randInt(max){
    return Math.round(Math.random()*max);
}
