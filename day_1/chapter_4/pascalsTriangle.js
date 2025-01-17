// Напишите функцию, которая будет принимать координаты числа в треугольника Паскаля и будет возвращать значение по координатам.
// Если вы не знаете, что такое треугольник Паскаля, советую прочитать перед выполнение задания.
// https://cdn.fishki.net/upload/post/201502/04/1414683/947eb978f710426fd0702fd119da506b.gif тут можно посмотреть наглядно принцип работы.
// Предположим, что начальные координаты 0,0.
// Тут, возможно, поможет рекурсия.

function paskalsTriangle(x, y) {
function factor (f) {for (j = k = 1; j <= f; j++) k *= j; return k}
return factor (x) / factor (y) / factor (x - y);
}

console.log(paskalsTriangle(3,2)); // 3
