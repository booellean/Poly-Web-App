import * as mongoose from 'mongoose';
import * as nodeMailer from 'nodemailer';
import { ContactSchema } from '../models/contactFormModel';
import { Request, Response } from 'express';
import { SMTP_SETUP } from '../config/email';

const Email = mongoose.model('Email', ContactSchema);

export class ContactFormController{
  public submitForm(req: Request, res: Response) {
    let message = new Email(req.body);
  
    let transporter = nodeMailer.createTransport(
      SMTP_SETUP
    );
    let mailOptions = {
      from: req.body.formEmail, // sender address
      to: SMTP_SETUP.auth.pass,
      subject: 'Contact from Poly entertainment form', // Subject line
      text: `Name: ${req.body.formName}
             Tel: ${req.body.formTel}
             Email: ${req.body.formEmail}
             Message: ${req.body.formMessage}`,
      html: '<b>NodeJS Email</b>' // html body
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message %s sent: %s', info.messageId, info.response);
          res.render('index');
      });
  }
}