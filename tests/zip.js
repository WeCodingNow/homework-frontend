'use strict';

QUnit.module('Тестируем функцию zip', function () {
	QUnit.test('Функция работает с единственным объектом', function (assert) {
		assert.deepEqual(zip({}), {});
		assert.deepEqual(zip({answer: 42}), {answer: 42});
		assert.deepEqual(zip({name: 'Georg'}), {name: 'Georg'});
		const obj = {
			count: 0,
			cost: '120$'
		};
		assert.deepEqual(zip(obj), obj);
	});

	QUnit.test('Функция работает с объектами среди которых есть объекты без свойств', function (assert) {
		assert.deepEqual(zip({}, {}), {});
		assert.deepEqual(zip({answer: 42}, {}), {answer: 42});
		assert.deepEqual(zip({}, {answer: 42}), {answer: 42});
		assert.deepEqual(zip({}, {answer: 42}), {answer: 42});
		assert.deepEqual(zip({}, {}, {}, {name: 'Georg'}), {name: 'Georg'});

		const obj = {
			count: 0,
			cost: '120$'
		};

		assert.deepEqual(zip({}, {}, {}, obj, {}, {}), obj);
	});

	QUnit.test('Функция работает с объектами со свойствами с разными именами', function (assert) {
		const obj = {
			count: 0,
			cost: '120$'
		};

		assert.deepEqual(zip({count: 0}, {cost: '120$'}), obj);

		const obj2 = {
			a: 1,
			b: 2,
			c: null,
			d: 4,
			e: 5
		};
		assert.deepEqual(zip({a: 1}, {b: 2}, {c: null}, {d: 4}, {e: 5}), obj2);

		const obj3 = {
			name: 'age',
			value: 42
		};

		const obj4 = {
			prop: false,
			attr: null
		};

		const obj5 = {
			name: 'age',
			value: 42,
			prop: false,
			attr: null
		};

		assert.deepEqual(zip(obj3, obj4), obj5);
	});

	QUnit.test('Функция правильно работает со свойствами, которые встречаются в нескольких объектах', function (assert) {
		assert.deepEqual(zip({answer: 42}, {answer: false}), {answer: 42}, 'Значение должно браться из первого встретившегося поля');
		assert.deepEqual(zip({age: 5}, {}, {age: 4}, {age: 72}), {age: 5});

		const obj = {
			name: 'age',
			value: 42,
		};
		assert.deepEqual(zip({name: 'age'}, {value: 42}, {name: 'cost'}, {value: -6}), obj);
	});

	QUnit.test('Функция правильно реагирует на некорректные аргументы', function(assert) {
		assert.throws(
			function () {
				zip(undefined);
			}),
			TypeError('Argument is not an object')

		assert.throws(
			function () {
				zip('string');
			}),
			TypeError('Argument is undefined')
	});

	QUnit.test('Функция работает с объектами различной глубины вложенности', function(assert) {
        const obj1_1 = {a: {b: {d: 2}}};
        const obj1_2 = {a: {b: {c: 1,d: 1}}};

        const expRes1 = {a: {b: {c: 1, d: 2}}};
        assert.deepEqual(zip(obj1_1, obj1_2), expRes1);

        const obj2_1 = {a: {b: {d: 'first'}, s: 'first'}, s: 'first'}; 
        const obj2_2 = {a: {b: {c: 2, d: 'second'}}};

        const expRes2 = {a:{b:{c: 2, d: 'first'}, s: 'first'}, s: 'first'}; 
        assert.deepEqual(zip(obj2_1, obj2_2), expRes2);
        
        const obj3_1 = {a: {b: 3}};
        const obj3_2 = {c: {b: 4}};

        const expRes3 = {a: {b: 3}, c: {b: 4}};
        assert.deepEqual(zip(obj3_1, obj3_2), expRes3);

        const obj4_1 = {a: {b: 3}};
        const obj4_2 = {a: {b: 4}};

        const expRes4 = {a: {b: 3}};
        assert.deepEqual(zip(obj4_1, obj4_2), expRes4);

        const obj5_1 = {a: {b: 10}};
        const obj5_2 = {c: {b: 5}};
        const obj5_3 = {a: {b: 8}};

        const expRes5 = {a: {b: 10}, c: {b: 5}};
        assert.deepEqual(zip(obj5_1, obj5_2, obj5_3), expRes5);
    });
});
