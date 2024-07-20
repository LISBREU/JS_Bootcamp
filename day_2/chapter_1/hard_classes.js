/* В продолжение прошлого задания вам нужно нужно создать 5 новых классов:

**Company** - класс описывающий IT компанию. Состоит из:
1. Св-ва:
- companyName
- currentProjects - текущий пулл проектов. Массив экземпляров класса Project
- completedProjects - пулл завершенных проектов. Массив экземпляров класса Project
- staff - весь пулл сотрудников компании. Это объект, у которого есть поля Developers, Managers. В этих полях лежат массивы экземпляров аналогичных классов.
2. Методы:
- addNewCompanyMember() - позволяет нанять нового сотрудника. В результате метода у выбранного сотрудника
должно смениться имя компании.
- addProject() - позволяет добавить проект в пулл текущих.
- getMembersQuantity() - позволяет получить кол-во сотрудников, работающих в данной компании
- completeProject(project) - позволяет закончить проект. В результате выполнения функции проект из currentProjects перемещается в completedProjects. У команды данного проекта должно увеличиться кол-во завершенных проектов.

**Project** - класс описывающий проект компании. На проекте может быть только 1 менеджер! Каждый сотрудник может работать только над одним проектом! Состоит из:
1. Св-ва:
- projectName
- minQualification - минимальная квалификация сотрудника, для работы на данном проекте.
- team - команда проекта. Объект, типа {manager: Manager, developers: {Frontend : [], backend: []}}. В св-ва этого объекта указан массив аналогичных классов.

2. Методы:
- addNewProjectMember(member) - Метод внутри которого вызывается проверка менеджера на то, подходит ли сотрудник проекту. Если подходит, то команда расширяется, иначе нет.


**Backend Developer** - Класс, который наследуется от класса Employee. 
1.Имеет новые св-ва:
- stack - Массив в котором указаны технологии, которыми владеет разработчик.
- developerSide - 'backend'
- projectQuantity - Число завершенных проектов.
2. Методы:
- expandStack(someTech) - разработчик может увеличить стек технологий.

**Frontend Developer** - Класс, который наследуется от класса Employee.
1.Имеет новые св-ва:
- stack - Массив в котором указаны технологии, которыми владеет разработчик.
- developerSide - 'frontend'
- projectQuantity - Число завершенных проектов.
- projectQuantity - Число завершенных проектов.
2. Методы:
- expandStack(someTech) - разработчик может увеличить стек технологий.

**Manager** - Класс, который наследуется от класса Employee. 
1.Имеет новые св-ва:
- projectQuantity - Число завершенных проектов.
2. Методы:
- checkMember(minQualification, member) - менеджер проверяет, удовлетворяет ли сотрудник условиям проекта. Сотрудник, состоящий в другой компании не может работать над проектом другой компании.

*/

/* Св-ва и методы класса
companyName - string
currentProjects - Массив экземпляров класса Project
completedProjects -  Массив экземпляров класса Project
staff - {
    developers :  {
    frontend : массив содержащий экземпляры класса FrontendDeveloper
    backend : массив содержащий экземпляры класса BackendDeveloper
    },
    managers: массив содержащий экземпляры класса Manager
}

addNewCompanyMember(Developer/Manager) - в кач-ве аргумента принимает экземпляр класса FrontendDeveloper, BackendDeveloper или Manager
addProject(Project) - в кач-ве аргумента принимает экземпляр класса Project
getMembersQuantity()
completeProject()
*/
import { Employee } from "./classes.js";

export class Company {
    constructor(companyName = 'string') {
        this.companyName = companyName;
        this.currentProjects = [];
        this.completedProjects = [];
        this.staff = {
            developers: {
                frontend: [],
                backend: []
            },
            managers: [],
        };
    }

    addNewCompanyMember(member) {
        if (!(member instanceof FrontendDeveloper || member instanceof BackendDeveloper || member instanceof Manager)) {
            throw new Error('New member should be an IT Specialist');
        }
        if (member instanceof FrontendDeveloper) {
            this.staff.developers.frontend.push(member);
        } else if (member instanceof BackendDeveloper) {
            this.staff.developers.backend.push(member);
        } else if (member instanceof Manager) {
            this.staff.managers.push(member);
        }
        member.company = this.companyName;
    }

    addProject(project) {
        if (!(project instanceof Project)) {
            throw new Error('Project should be a type of Project');
        }
        this.currentProjects.push(project);
    }

    getMembersQuantity() {
        return this.staff.developers.frontend.length +
               this.staff.developers.backend.length +
               this.staff.managers.length;
    }

    completeProject(project) {
        if (!(project instanceof Project)) {
            throw new Error('Project should be a type of Project');
        }
        const index = this.currentProjects.indexOf(project);
        if (index !== -1) {
            this.currentProjects.splice(index, 1);
            this.completedProjects.push(project);
            project.team.manager.projectQuantity += 1;
            project.team.developers.frontend.forEach(dev => dev.projectQuantity += 1);
            project.team.developers.backend.forEach(dev => dev.projectQuantity += 1);
        }
    }
}



 /*
- projectName - string
- minQualification -string
- team -  {
    manager : экземпляр класса Manager
    developers: {
    frontend : массив содержащий экземпляры класса FrontendDeveloper
    backend : массив содержащий экземпляры класса BackendDeveloper
    }
}

addNewProjectMember(Developer) - Метод внутри которого вызывается проверка менеджера на то, подходит ли сотрудник проекту. Если подходит, то команда расширяется, иначе нет.
*/

export class Project {
    constructor(projectName, minQualification) {
        if (typeof projectName !== 'string') {
            throw new Error('projectName should be a string');
        }
        if (!['L1', 'L2', 'L3', 'L4'].includes(minQualification)) {
            throw new Error('Qualification should be from L1 to L4');
        }
        this.projectName = projectName;
        this.minQualification = minQualification;
        this.team = {
            manager: null,
            developers: {
                frontend: [],
                backend: []
            }
        };
    }

    addNewProjectMember(member) {
        if (!(member instanceof FrontendDeveloper || member instanceof BackendDeveloper || member instanceof Manager)) {
            throw new Error('New member should be an IT Specialist');
        }
        if (member instanceof Manager) {
            if (this.team.manager === null) {
                this.team.manager = member;
            } else {
                throw new Error('There is already a manager for this project');
            }
        } else if (member instanceof FrontendDeveloper) {
            this.team.developers.frontend.push(member);
        } else if (member instanceof BackendDeveloper) {
            this.team.developers.backend.push(member);
        }
    }
}

/*
projectQuantity - number
checkMember(minQualification, member) - в качестве аргумента принимается строка ('L1'/'L2'/'L3'/'L4') и BackendDeveloper || FrontendDeveloper
*/

export class Manager extends Employee {
    constructor(name, grade, hardSkills = [], company, projectQuantity = 0) {
        super(name, grade, hardSkills, company); // Передаем hardSkills в родительский конструктор
        if (typeof projectQuantity !== 'number' || projectQuantity < 0) {
            throw new Error('projectQuantity should be a non-negative number');
        }
        this.projectQuantity = projectQuantity;
    }

    checkMember(minQualification, member) {
        if (!['L1', 'L2', 'L3', 'L4'].includes(minQualification)) {
            throw new Error('Qualification should be from L1 to L4');
        }
        if (!(member instanceof FrontendDeveloper || member instanceof BackendDeveloper)) {
            throw new Error('member should be FrontendDeveloper or BackendDeveloper');
        }
        if (member.company !== this.company) {
            throw new Error('member shouldn\'t work in another company');
        }
        return member.grade >= minQualification;
    }
}


// Создал общий класс для developer, который будут наследовать его подклассы изменяя лишь параметр developerSide
export class Developer extends Employee {
    constructor(name, grade, hardSkills, company, stack = [], developerSide, projectQuantity) {
        super(name, grade, hardSkills, company);

        if (!Array.isArray(stack) || !stack.every(item => typeof item === 'string')) {
            throw new Error('stack should be an array of strings');
        }
        if (typeof developerSide !== 'string') {
            throw new Error('developerSide should be a string format');
        }
        if (typeof projectQuantity !== 'number' || projectQuantity < 0) {
            throw new Error('projectQuantity should be a non-negative number');
        }

        this.stack = stack;
        this.developerSide = developerSide;
        this.projectQuantity = projectQuantity;
    }

    expandStack(newTech) {
        if (typeof newTech !== 'string') {
            throw new Error('newTech should be a string format');
        }
        this.stack.push(newTech);
    }
}

/*
stack - массив строк
- developerSide - строка ('frontend')
- projectQuantity - number
expandStack(newTech) - в кач-ве аргумента принимает строку
*/

export class FrontendDeveloper extends Developer {
    constructor(name, grade, hardSkills, company, stack = [], projectQuantity) {
        super(name, grade, hardSkills, company, stack, 'frontend', projectQuantity);
    }
}


/*
stack - массив строк
- developerSide - строка ('backend')
- projectQuantity - number
expandStack(newTech) - в кач-ве аргумента принимает строку
*/

export class BackendDeveloper extends Developer {
    constructor(name, grade, hardSkills, company, stack = [], projectQuantity) {
        super(name, grade, hardSkills, company, stack, 'backend', projectQuantity);
    }
}


let myManager = new Manager('Alex', 'L1',['PM', 'FlutterFlow', 'Asana'], 'FHRT', 10);
let myCompany = new Company('NHL');
myCompany.addNewCompanyMember(myManager);
console.log(myCompany.staff);
let secondManager = new Manager('Kate', 'L2', ['PM', 'Asana'],'FHR' ,12);
myCompany.addNewCompanyMember(secondManager);
console.log(myCompany.staff);

const thirdManager = new Manager('John Doe', 'L3', ['JavaScript', 'React'], 'TechCorp', 5);
console.log(thirdManager.hardSkills); // ['JavaScript', 'React']
console.log(secondManager.hardSkills); 