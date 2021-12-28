import { Request, Response } from 'express';

export class WeddingGuestController {
  public getAllGuests = (req: Request, res: Response): void => {
    res.status(200).send('Not implemented yet');
  };
}
