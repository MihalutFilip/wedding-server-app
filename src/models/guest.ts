import { ConfirmationType } from "./confirmationType";

export interface Guest {
    _id: number;
    name: string;
    confirmationType: ConfirmationType;
    isChild: boolean;
}