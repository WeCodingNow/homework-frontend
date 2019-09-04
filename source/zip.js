'use strict';

/**
 * Merges objects into one object 
 * @param {...object} args Objects to merge
 */
const zip = (...args) => {
    // чтобы не перезаписывать первое встретившееся поле
    args = args.reverse()

    var subobjects = {}

    // ищем объекты которые надо объединить
    for (var arg of args) {
        if (arg) {
            for (var prop_name of Object.keys(arg)) {
                if (typeof arg[prop_name] === 'object') {
                    if (!subobjects[prop_name]) {
                        subobjects[prop_name] = []
                    }
                    subobjects[prop_name].push(arg[prop_name])
                }
            }
        } else {
            throw TypeError('undefined argument')
        }
    }

    // рекурсивно сливаем объекты в иерархии основного объекта
    for (var idx of Object.keys(subobjects)) {
        if (subobjects[idx].length > 1) {
            subobjects[idx] = zip(...subobjects[idx])
        } else {
            subobjects[idx] = subobjects[idx][0]
        }
    }

    return Object.assign({}, ...args, subobjects)
}
