import * as express from 'express';
import {Request, Response} from "express";

export class HomeRoutes {
  public express

  constructor () {
    this.express = express();
  }
  public homeRoutes(app): void {
    app.route('/')
    .get((req: Request, res: Response) =>{
      // res.status(200).sendFile(
      //   'index.html', {root: __dirname + '/../public'}
      // )
      res.status(200).render(
        `pages/index.ejs`
      )
    })
  }
}