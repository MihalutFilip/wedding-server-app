import { ConfirmationType } from "./confirmationType";

export class Guest {
    id: number;
    name: string;
    numberOfPersons: number;
    confirmationType: ConfirmationType;

    constructor(id: number, name: string, numberOfPersons: number, confirmationType: ConfirmationType) {
        this.id = id;
        this.name = name;
        this.numberOfPersons = numberOfPersons;
        this.confirmationType = confirmationType;
    }
}