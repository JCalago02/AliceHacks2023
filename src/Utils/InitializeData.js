import dataPro from "../Class Structures/proPref.json";
import dataStu from "../Class Structures/stuPref.json";
import Program from "../Class Structures/Program.js";
import Applicant from "../Class Structures/Applicant.js";


export function initializeProgramList() {
    var proList = dataPro.prolist;
    const programList = [];
    for (let i = 1; i < proList.length + 1; i++) {
        const program = new Program(i, proList[i - 1], 10);
        programList.push(program);
    }
    return programList
}

export function initializeStudentList() {
    var stuList = dataStu.stuList;
    const studentList = [];
    for (let i = 1; i < stuList.length + 1; i++) {
        const student = new Applicant(i, stuList[i - 1]);
        studentList.push(student);
    }
    return studentList;
}