import { Request, Response } from 'express';
import { WeddingGuestRepository } from '../repositories/wedding-guest.repository';

import { Logger } from '../utils/logger';


export class WeddingGuestController {
  private weddingRepository = new WeddingGuestRepository();

  public getAllGuests = (req: Request, res: Response): void => {
    res.status(200).send('Not implemented yet');
  };

  public addGuest = async (req: Request, res: Response): Promise<void> => {
    var guest = req.body;

    try {
      var addedGuest = await this.weddingRepository.addGuest(guest);

      res.status(200).send(addedGuest);
    } catch (e) {
      res.status(400).send(e);
    }

  };
}
