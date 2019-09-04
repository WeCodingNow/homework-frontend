'use strict';

/**
 * Merges objects into one object 
 * @param {...object} args Objects to merge
 */
const zip = function (...args) {
    return Object.assign({}, ...Array.from(args).reverse())
}
