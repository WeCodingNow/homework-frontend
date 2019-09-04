'use strict';

/**
 * Merges objects into one object 
 * @param {...object} args Objects to merge
 */
const zip = (...args) => {
    return Object.assign({}, ...Array.from(args).reverse())
}
