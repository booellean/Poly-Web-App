import * as mongoose from 'mongoose';
import * as nodeMailer from 'nodemailer';
import { ContactSchema } from '../models/contactFormModel';
import { Request, Response } from 'express';
import { SMTP_SETUP } from '../config/email';

const Email = mongoose.model('Email', ContactSchema);

export class ContactFormController{
  
  public confirmFields(name: string, email: string, phone: string, body: string){
    let valid = true;
    let error = 'Please correct the following errors:'

    if(!(name.length > 1)){
      valid = false;
      error += '\nPlease enter a valid name';
    }
    if(email.indexOf('@') < 0 || email.indexOf('.') < 0){
      valid = false;
      error += '\nPlease enter a valid email';
    }
    if(phone.length !== 7 || isNaN(parseInt(phone))){
      valid = false;
      error += '\nPlease enter a valid phone number';
    }
    return {bool : valid, err : error};
  }

  public submitForm(req: Request, res: Response) {
    let rawObj: object = req.body;
    console.log(rawObj);

    let message = new Email(req.body);
    
    let transporter = nodeMailer.createTransport(
      SMTP_SETUP
    );

    transporter.verify((error, success) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Server is ready to take messages');
      }
    });

    let mailOptions = {
      from: req.body.formEmail, // sender address
      to: SMTP_SETUP.auth.pass,
      subject: 'Contact from Poly entertainment form', // Subject line
      text: `Name: ${req.body.formName}
             Tel: ${req.body.formTel}
             Email: ${req.body.formEmail}
             Message: ${req.body.formMessage}`,
      html: '<b>Poly entertainment inquiry</b>' // html body
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