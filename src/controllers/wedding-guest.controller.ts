import { Request, Response } from 'express';
import { WeddingGuestRepository } from '../repositories/wedding-guest.repository';

export class WeddingGuestController {
  private weddingRepository: WeddingGuestRepository;

  constructor() {
    this.weddingRepository = new WeddingGuestRepository();
  }

  public getAllGuests = async (req: Request, res: Response): Promise<void> => {
    try {
      var guests = await this.weddingRepository.getAllGuests();

      res.status(200).send(guests);
    } catch (e) {
      res.status(400).send(e);
    }
  };

  public addOrUpdateGuests = async (req: Request, res: Response): Promise<void> => {
    var guests = req.body;

    try {
      await this.weddingRepository.addOrUpdateGuests(guests);

      res.status(200).send("Guests was added and updated");
    } catch (e) {
      res.status(400).send(e);
    }
  };

  public deleteGuest = async (req: Request, res: Response): Promise<void> => {
    var id = req.params['id'];

    try {
      await this.weddingRepository.deleteGuest(id);

      res.status(200).send("Guest was deleted");
    } catch (e) {
      res.status(400).send(e);
    }
  };
}
