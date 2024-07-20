// В этой задаче нужно будет написать алгоритм поиска, который скажет, можно ли найти входное слово в головоломке поиска слов, которая тоже подается функции на вход.
// Данная задача имеет два уровня сложности :
// - Первый уровень включает в себя исключительно поиск по вертикали и по горизонтали
// - Второй уровень дополнительно включает в себя поиск по диагонали
// - Слова могут быть записаны слева направо и наоборот.

// С матрицами разобрался классическим образом

function searchSubString(puzzle, word) {
  const rows = puzzle.length;
  const cols = puzzle[0].length;

  // Функция для проверки совпадения подстроки в заданном направлении
  function checkMatch(row, col, dr, dc, substring) {
    const len = substring.length;
    // Проверяем, что конечная точка в пределах матрицы
    if (row + dr * (len - 1) < 0 || row + dr * (len - 1) >= rows ||
        col + dc * (len - 1) < 0 || col + dc * (len - 1) >= cols) {
      return false;
    }
    // Проверяем совпадение подстроки
    for (let i = 0; i < len; i++) {
      if (puzzle[row + i * dr][col + i * dc] !== substring[i]) {
        return false;
      }
    }
    return true;
  }

  // Проверка по всем направлениям
  function searchInAllDirections() {
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        // Поиск по горизонтали слева направо и справа налево
        if (c + word.length <= cols) {
          if (checkMatch(r, c, 0, 1, word) || checkMatch(r, c + word.length - 1, 0, -1, word)) {
            return true;
          }
        }
        // Поиск по вертикали сверху вниз и снизу вверх
        if (r + word.length <= rows) {
          if (checkMatch(r, c, 1, 0, word) || checkMatch(r + word.length - 1, c, -1, 0, word)) {
            return true;
          }
        }
        // Поиск по диагонали вправо вниз и влево вверх
        if (r + word.length <= rows && c + word.length <= cols) {
          if (checkMatch(r, c, 1, 1, word) || checkMatch(r + word.length - 1, c + word.length - 1, -1, -1, word)) {
            return true;
          }
        }
        // Поиск по диагонали вправо вверх и влево вниз
        if (r - word.length >= -1 && c + word.length <= cols) {
          if (checkMatch(r, c, -1, 1, word) || checkMatch(r - word.length + 1, c + word.length - 1, 1, -1, word)) {
            return true;
          }
        }
      }
    }
    return false;
  }

  // Вызываем функцию поиска по всем направлениям
  return searchInAllDirections();
}

// Пример использования
const examplePuzzle = [
  ["b", "l", "g", "o", "l", "d", "s"],
  ["x", "k", "q", "w", "i", "j", "p"],
  ["a", "n", "w", "k", "k", "p", "n"],
  ["h", "e", "e", "e", "k", "i", "l"],
  ["q", "e", "k", "a", "y", "q", "a"],
  ["h", "u", "h", "a", "e", "a", "u"],
  ["k", "q", "j", "c", "c", "m", "r"],
];

// Level 1
console.log(searchSubString(examplePuzzle, "like"));   // true
console.log(searchSubString(examplePuzzle, "gold"));   // true
console.log(searchSubString(examplePuzzle, "queen"));  // true

// Level 2
console.log(searchSubString(examplePuzzle, "cheese"));   // false
console.log(searchSubString(examplePuzzle, "cake"));   // true

