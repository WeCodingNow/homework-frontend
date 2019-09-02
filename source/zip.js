'use strict';

// const zip = function() {
//     let ret_obj = {}

//     for (var i = arguments.length; i >= 0; i--) {
//         Object.assign(ret_obj, arguments[i]);
//     };

//     return ret_obj;
// };

const zip = function (...args) {
    return Object.assign({}, ...Array.from(args).reverse())
}
