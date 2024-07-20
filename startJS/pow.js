let num = +prompt("Введите число" , '');
let degree = +prompt("Введите степень" , '');

function pow(a, b) {
    let c = 1;
    for (let i = 0; i < b; i++ ) {
        c *= a;
    }
    return c;
}

alert(pow(num, degree));