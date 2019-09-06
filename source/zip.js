'use strict';

/**
 * Merges objects into one object
 * @param {...object} args Objects to merge
 * @return {object} Merged objects
 */
const zip = (...args) => {
    const retObj = {};

    args.reverse().forEach((arg) => {
        if (!arg) {
            throw TypeError('Argument is undefined');
        } else if (typeof arg !== 'object') {
            throw TypeError('Argument is not an object');
        }

        Object.keys(arg).forEach((key) => {
            if (typeof arg[key] === 'object' &&
                typeof retObj[key] === 'object') {
                arg[key] = zip(arg[key], retObj[key]);
            }
        });

        Object.assign(retObj, arg);
    });

    return retObj;
};
