import { Request, Response } from 'express';
import { Guest } from 'src/models/guest';
import { StringHelper } from '../utils/string-helper';
import { WeddingGuestRepository } from '../repositories/wedding-guest.repository';
import { GuestError } from '../errors/guest-errors';
import { EmailService } from '../services/email.service';



export class WeddingGuestController {
  private weddingRepository: WeddingGuestRepository;
  private emailService: EmailService;

  constructor() {
    this.weddingRepository = new WeddingGuestRepository();
    this.emailService = new EmailService();
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

  public addOrUpdateGuest = async (req: Request, res: Response): Promise<void> => {
    var guest = req.body;

    try {
      guest.name = StringHelper.firstToUpperAndRestToLower(guest.name);

      this.emailService.sendEmail(guest);

      await this.weddingRepository.addOrUpdateGuests(guest);

      

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
