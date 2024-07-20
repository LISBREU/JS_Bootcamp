/*
У экземпляра класса должны присутствовать св-ва:
-name string.
-grade string Для простоты предположим, что система грейдов будет иметь значения от L1 до L4.
-hardSkills string[].
-company string.


Так же должны иметься три метода:

-changeCompany(newCompanyName) - сотрудник может сменить компанию, либо же просто уволиться.
-upGrade() - сотрудник может повысить квалификацию.
-addSkill(newSkillName) - сотрудник может дополнить список своих скиллов.
*/

// Для того чтобы работало ключевое слово экспорт/или импорт, в файле package.json объявляю тип: модульный, для того
// чтобы указать Node.js, что все файлы с расширением .js в этом проекте должны обрабатываться как ES-модули.
export class Employee {
    // Создал класс в нем настроил проверки на правильность вводных значений
    constructor(name, grade = "L1", hardSkills = [], company) {
        if (typeof name !== 'string') {
            throw new Error('name should be a string format');
        }
        const validGrades = ["L1", "L2", "L3", "L4"];
        if (!validGrades.includes(grade)) {
            throw new Error('grade should be one of "L1", "L2", "L3", "L4"');
        }
        if (!Array.isArray(hardSkills)) {
            throw new Error('hardSkills should be an array');
        }
        if (typeof company !== 'string') {
            throw new Error('company should be a string format');
        }
        this.name = name;
        this.grade = grade;
        this.hardSkills = hardSkills;
        this.company = company;
    }

    changeCompany(newCompanyName) {
        if (typeof newCompanyName !== 'string') {
            throw new Error('newCompanyName should be a string format');
        }
        this.company = newCompanyName;
    }

    upGrade() {
        const gradeMap = {
            "L1": "L2",
            "L2": "L3",
            "L3": "L4",
            "L4": "L4"
        };
        if (this.grade === "L4") {
            console.log('\nYou\'re already at the highest grade (L4)\n');
        } else {
            this.grade = gradeMap[this.grade];
        }
    }

    addSkill(newSkillName) {
        if (typeof newSkillName !== 'string') {
            throw new Error('newSkillName should be a string format');
        }
        this.hardSkills.push(newSkillName);
    }
}
    
    let myEmployee = new Employee('Ilnur', "L3", ['Flutter', 'FlutterFlow', 'JavaScript'], 'FHRT');
    console.log(myEmployee);
    myEmployee.changeCompany('NHL');
    console.log('New company is ' + myEmployee.company);
    myEmployee.upGrade();
    console.log(myEmployee);
    myEmployee.upGrade();
    myEmployee.addSkill('Swift');
    console.log(myEmployee);
    

//https://www.youtube.com/watch?v=H8G9quGGjZM