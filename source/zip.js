'use strict';

const zip = function (...args) {
    return Object.assign({}, ...Array.from(args).reverse())
}
