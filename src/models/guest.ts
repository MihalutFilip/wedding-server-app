import { ConfirmationType } from "./confirmationType";

export interface Guest {
    id: number;
    name: string;
    numberOfPersons: number;
    confirmationType: ConfirmationType;
}