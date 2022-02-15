import { Request, Response } from 'express';
import { Guest } from 'src/models/guest';
import { StringHelper } from '../utils/string-helper';
import { WeddingGuestRepository } from '../repositories/wedding-guest.repository';
import { GuestError, GuestNotFoundError } from '../errors/guest-errors';

export class WeddingGuestController {
  private weddingRepository: WeddingGuestRepository;

  constructor() {
    this.weddingRepository = new WeddingGuestRepository();
  }

  public getGuest = async (req: Request, res: Response): Promise<void> => {
    var id = req.params['id'];

    try {
      var reponse = await this.weddingRepository.getGuest(id);

      res.status(200).send(reponse);
    } catch (e) {
      res.status(this.getErrorCode(e)).send(e);
    };
  }

  public addGuest = async (req: Request, res: Response): Promise<void> => {
    var guest = req.body;
    guest.name = StringHelper.firstToUpperAndRestToLower(guest.name);

    try {
      var reponse = await this.weddingRepository.addGuest(guest);

      res.status(201).send(reponse);
    } catch (e) {
      res.status(this.getErrorCode(e)).send(e);
    }
  };

  public updateGuest = async (req: Request, res: Response): Promise<void> => {
    var guest = req.body;
    guest.name = StringHelper.firstToUpperAndRestToLower(guest.name);

    try {
      var reponse = await this.weddingRepository.updateGuest(guest);

      res.status(200).send(reponse);
    } catch (e) {
      res.status(this.getErrorCode(e)).send(e);
    }
  };

  public getAllGuests = async (req: Request, res: Response): Promise<void> => {
    try {
      var guests = await this.weddingRepository.getAllGuests();

      res.status(200).send(guests);
    } catch (e) {
      res.status(this.getErrorCode(e)).send(e);
    }
  };

  public addOrUpdateGuests = async (req: Request, res: Response): Promise<void> => {
    var guests = req.body;

    try {
      await this.weddingRepository.addOrUpdateGuests(guests.map((guest: Guest) => {
        guest.name = StringHelper.firstToUpperAndRestToLower(guest.name);

        return guest;
      }));

      res.status(200).send({ message: "Guests was added and updated" });
    } catch (e) {
      res.status(this.getErrorCode(e)).send(e);
    }
  };

  public deleteGuest = async (req: Request, res: Response): Promise<void> => {
    var id = req.params['id'];

    try {
      var reponse = await this.weddingRepository.deleteGuest(id);

      res.status(200).send(reponse);
    } catch (e) {
      res.status(this.getErrorCode(e)).send(e);
    }
  };

  private getErrorCode(e: any) {
    return e instanceof GuestError ? 404 : 400;
  }
}
