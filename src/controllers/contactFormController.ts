import * as mongoose from 'mongoose';
import { ContactSchema } from '../models/contactFormModel';
import { Request, Response } from 'express';

const Email = mongoose.model('Email', ContactSchema);

export class ContactFormController{
  public submitForm(req: Request, res: Response) {
    let message = new Email(req.body);
    let name = req.body.formName;
  
    message.save((err, email) => {
      if(err){
          res.send(err);
      }
      res.json(name);
    });
  }
}