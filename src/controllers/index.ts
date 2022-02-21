import { WeddingGuestController } from "./wedding-guest.controller";

const { getAllGuests, addOrUpdateGuest, deleteGuest, addGuest, getGuest, updateGuest } = new WeddingGuestController();

// eslint-disable-next-line no-unused-vars
export const operations: Record<string, (...arg: any[]) => any> = { getAllGuests, addOrUpdateGuest, deleteGuest, addGuest, getGuest, updateGuest };
