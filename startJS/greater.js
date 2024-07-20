let i = 0;
while (i <= 100) {
    i = prompt("Введите число больше 100", '');
    if (i == null || i == undefined || i == NaN || i == '') {
        break;
    }
}