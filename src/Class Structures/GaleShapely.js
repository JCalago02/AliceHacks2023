export default class GaleShapely {
    constructor(programList, applicantList) {
        this.programList = programList;
        this.applicantList = applicantList;
        this.isStable = false;
        this.currentApplicant = this.applicantList[0];
    }

    nextIteration() {
        const programToApplyId = this.currentApplicant.preferenceList[0];
        const programToApply = this.findProgram(programToApplyId);
        // if a person is on a program's match list
        // insert them into program's match list
        // validate the match list
        // reject anyone if needed

        // if not on the program's match list
        // 
        if (programToApply.canAdd(this.currentApplicant.id)) {
            // set our match and remove from preference options list
            this.currentApplicant.matchedProgram = programToApply.id;
            this.currentApplicant.removeFirst(false);
            console.log(this.currentApplicant.id + " matches with: " + programToApplyId);
            // insert into matched program
            programToApply.insertInPlace(this.currentApplicant.id);
            
            // remove least qualifed applicant if program is above capcity
            
            const rejectedId = programToApply.validateList();
            if (rejectedId !== undefined) {
                console.log(rejectedId + " is kicked out by " + programToApply.id)
                const rejectedApplicant = this.findApplicant(rejectedId);
                rejectedApplicant.rejectedList.push(rejectedApplicant.matchedProgram);
                rejectedApplicant.matchedProgram = undefined;
            }
        } else {
            console.log(this.currentApplicant.id + " was rejected by " + programToApply.id)
            this.currentApplicant.removeFirst(true);
        }


        this.findNextMatchableApplicant();
        if (this.currentApplicant === undefined) {
            this.isStable = true;
        }
        return [this.programList, this.applicantList];

    }

    // finds a given program inside our simulation's program list given its id
    findProgram(targetId) {
        for (let i = 0; i < this.programList.length; i++) {
            const program = this.programList[i];
            if (program.id ===  targetId) {
                return program;
            }
        }
        return -1;
    }

    // finds a given applicant inside our simulation's applicant list given its id
    findApplicant(targetId) {
        for (let i = 0; i < this.applicantList.length; i++) {
            const applicant = this.applicantList[i];
            if (applicant.id ===  targetId) {
                return applicant;
            }
        }
        return -1;
    }

    // finds the next applicant that has not matched and has more schools on its preference list
    findNextMatchableApplicant() {
        for (let i = 0; i < this.applicantList.length; i++) {
            const applicant = this.applicantList[i];
            if (applicant.shouldEvaluate()) {
                this.currentApplicant = applicant;
                return;
            }
        }
        this.currentApplicant = undefined;
    }
}