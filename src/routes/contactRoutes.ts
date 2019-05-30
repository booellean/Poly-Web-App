import * as express from 'express';
import {Request, Response} from "express";

import { ContactFormController } from "../controllers/contactFormController";

//TODO: Edit routes to work with the dashboard

export class ContactRoutes {
  public express
  public contactController: ContactFormController = new ContactFormController();

  constructor () {
    this.express = express();
  }
  public contactRoutes(app): void {
    app.route('/contact-form/')
    .post(this.contactController.submitForm);
  }
}