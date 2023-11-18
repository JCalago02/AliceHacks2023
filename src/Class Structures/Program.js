export default class Program {
    constructor(id, preferenceList, maxPositions) {
        this.id = id;
        this.maxPositions = maxPositions;

        this.preferenceMap = new Map();
        for (let i = 0; i < preferenceList.length; i++) {
            const personId = preferenceList[i];
            this.preferenceMap.set(personId, i + 1);
        }

        this.seats = [];    
    }

    // returns whether applicant exists in the program's preferenceMap
    canAdd(applicant) {
        return this.preferenceMap.has(applicant);
    }

    // adds applicant to the list of seats where they belong
    insertInPlace(applicant) {

        for (let i = 0; i < this.seats.length; i++) {
            const curr = this.seats[i];
            if (this.canReplace(curr, applicant)) {
                this.seats.splice(i, 0, applicant);
                return;
            }
        }
        this.seats.push(applicant);



    }

    // returns the individual past the max seat (if necessary), otherwise undefined
    validateList() {
        if (this.seats.length > this.maxPositions) {
            return this.seats.pop();
        }
        return undefined;
    }

    // given a p1 who is in the list, and a p2 who is looking to insert into the list, returns whether p2 takes prescedence over p1
    canReplace(p1, p2) {
        return this.preferenceMap.get(p2) < this.preferenceMap.get(p1);
    }

    // print method for debugging
    print() {
        let strOut = "";
        this.seats.forEach((seat) => {
            strOut += seat + "-"
        })
    }

}