import * as express from 'express';
import {Request, Response} from "express";

export class BlogRoutes {
  public express

  constructor () {
    this.express = express();
  }
  public blogRoutes(app): void {
    app.route('/blog')
    .get((req: Request, res: Response) =>{
      res.status(200).sendFile(
        'index.html', {root: __dirname + '/../public'}
      )
    })
  }
}