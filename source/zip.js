'use strict';

/**
 * Merges objects into one object
 * @param {...object} args Objects to merge
 * @return {object} Merged objects
 */
const zip = (...args) => {
    // чтобы не перезаписывать первое встретившееся поле
    args = args.reverse();

    const subobjects = {};

    // ищем объекты которые надо объединить
    for (const arg of args) {
        if (arg) {
            if (typeof arg !== 'object') {
                throw TypeError('Argument is not an object');
            }
            for (const propName of Object.keys(arg)) {
                if (typeof arg[propName] === 'object') {
                    if (!subobjects[propName]) {
                        subobjects[propName] = [];
                    }
                    subobjects[prop_name].push(arg[propName]);
                }
            }
        } else {
            throw TypeError('Argument is undefined');
        }
    }

    // рекурсивно сливаем объекты в иерархии основного объекта
    for (const idx of Object.keys(subobjects)) {
        if (subobjects[idx].length > 1) {
            subobjects[idx] = zip(...subobjects[idx]);
        } else {
            subobjects[idx] = subobjects[idx][0];
        }
    }

    return Object.assign(...args, subobjects);
};

zip({});
