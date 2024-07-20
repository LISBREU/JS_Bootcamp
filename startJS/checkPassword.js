let currentUserLogin = prompt ("Введите логин", '');

if (currentUserLogin == "Админ") {
let currentUserPassword = prompt("Введите пароль!", '');

if (currentUserPassword == "Я главный") {
    alert("Здравствуйте");
} else if (currentUserPassword == '' || currentUserPassword == null) {
    alert("Отмена");
} else {
    alert("Неверный пароль!");
};

} else if (currentUserLogin == '' || currentUserLogin == null) {
    alert("Отменено");
} else {
    alert("Я вас не знаю!");
}
    