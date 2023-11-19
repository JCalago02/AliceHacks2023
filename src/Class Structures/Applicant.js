export default class Applicant {
    constructor(id, preferenceList) {
        this.id = id;
        this.preferenceList = preferenceList;
        this.rejectedList = [];
        this.matchedProgram = undefined;
    }

    removeFirst(wasRejected) {
        if (wasRejected) { 
            this.rejectedList.push(this.preferenceList[0]);
        }
        this.preferenceList.shift();
    }

    hasPossibleMatches() {
        return this.preferenceList.length !== 0;
    }

    shouldEvaluate() {
        // console.log(this.matchedProgram === undefined);
        // console.log(this.preferenceList.length !== 0)
        return this.matchedProgram === undefined && this.preferenceList.length !== 0;
    }

    equals(otherApplicant) {
        return this.id === otherApplicant.id;
    }

    print() {
        console.log("Applicant " + this.id);
        let strOut = "Remaining: ";
        this.preferenceList.forEach((i) => {
            strOut += i + "-"
        })
        console.log(strOut);
        strOut = "Rejected: ";
        this.rejectedList.forEach((i) => {
            strOut += i + "-"
        });
        if (this.matchedProgram === undefined) {
            console.log("No match");
        } else {
            console.log("Match with " + this.matchedProgram);
        }
    }
}