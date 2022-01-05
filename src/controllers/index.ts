import { WeddingGuestController } from "./wedding-guest.controller";

const { getAllGuests, addOrUpdateGuests, deleteGuest } = new WeddingGuestController();

// eslint-disable-next-line no-unused-vars
export const operations: Record<string, (...arg: any[]) => any> = { getAllGuests, addOrUpdateGuests, deleteGuest };
