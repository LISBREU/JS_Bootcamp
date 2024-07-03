// Функция на вход принимает две строки - сообщение (обычная строка с текстом) и символ который надо удалить из этого сообщения.

function removeString(message, symbol) {
    let newMessageArray = [];
    // !== используется для точного сравнения по типам
    for (let i = 0; i < message.length; i++) {
        if (message[i] != symbol) {
            newMessageArray.push(message[i]);
        }
    }
    // С помощью join('') - объединяем все элементы получившегося массива в строку, объединяя их
    // ('') пустой строкой, получится слитно
    return newMessageArray.join('');
}

console.log(removeString("Большое и интересное сообщение", "о")); // Бльше и интересне сбщение




