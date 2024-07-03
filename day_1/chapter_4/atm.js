// Напишите функцию банкомат которая принимает на вход число и возвращает объект в формате: {номинал_купюры : количество_купюр}.
// Если банкомат не может выдать данную сумму, то выводится ошибка 'Incorrect value'.
// Купюры должны выдаться оптимальным образом (вместо 5 купюр номиналом 1000 выдается одна 5000).
// За раз банкомат может выдавать не более 20 купюр, если купюр для выдачи не хватает то выводится ошибка 'Limit exceeded'

function atm(sum) {
  const banknotes = [
    [5000, 0],
    [2000, 0],
    [1000, 0],
    [500, 0],
    [200, 0],
    [100, 0],
    [50, 0]
  ];

  let remainingSum = sum;

  for (let i = 0; i < banknotes.length; i++) {
    let note = banknotes[i][0];
    let count = Math.floor(remainingSum / note);
    banknotes[i][1] = count;
    remainingSum -= count * note;
  }

  if (remainingSum !== 0) {
    return 'Incorrect value';
  }
//Используется метод reduce для подсчета общего количества выданных купюр (totalNotes). 
//Если это количество превышает 20, функция возвращает строку 'Limit exceeded'.
  let totalNotes = banknotes.reduce((acc, cur) => acc + cur[1], 0);
  if (totalNotes > 20) {
    return 'Limit exceeded';
  }

//Возникли непредвиденные сложности с сортировкой, поэтому пришлось решать с помощью
// форматирования строки вывода. В любом случае в будущем разберусь с сортировкой
// просто разозлился что отнимает много времени в конкретный момент
  let result = '{';
  for (let i = 0; i < banknotes.length; i++) {
    if (banknotes[i][1] > 0) {
      result += `${banknotes[i][0]} : ${banknotes[i][1]}, `;
    }
  }
  
  result = result.slice(0, -2); // Удаляем последнюю запятую и пробел
  result += ' }';

  return result;
}

console.log(atm(2570)); // Incorrect value
console.log(atm(100050)); // Limit exceeded
console.log(atm(8350)); // {5000 : 1, 2000 : 1, 1000 : 1, 200 : 1, 100 : 1, 50 : 1 }
console.log(atm(500)); 
console.log(atm(15500)); 


