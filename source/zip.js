'use strict';

/**
 * Merges objects into one object
 * @param {...object} args Objects to merge
 * @return {object} Merged objects
 */
const zip = (...args) => {
    args.forEach((arg) => {
        if (!arg) {
            throw TypeError('Argument is undefined');
        } else if (typeof arg !== 'object') {
            throw TypeError('Argument is not an object');
        }
    });

    let queue1 = args;
    let queue2 = [];
    const levels = [{}];

    // подсчитываем объекты на разных уровнях вложенности
    // с помощью алгоритма обхода в ширину
    while (queue1.length > 0) {
        const obj = queue1.pop();

        Object.assign(levels[levels.length - 1], obj);

        if (obj) {Object.keys(obj).forEach((key) => {
            if (typeof obj[key] === 'object') {
                queue2.push(obj[key]);
            }
        })};

        if (queue1.length == 0) {
            queue1 = queue2;
            queue2 = [];
            if (queue1.length > 0) {
                levels.push({});
            }
        }
    }

    // соединяем объекты на разных уровнях вложенности
    const result = levels.reduceRight((accum, curVal) => {
        Object.keys(curVal).forEach((key) => {
            if (curVal[key]) {
                Object.assign(curVal[key], accum)
            }
        })
        return curVal
    });

    return result
};
