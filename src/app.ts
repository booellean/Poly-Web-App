//express imports
import * as express from 'express';
import {Request, Response} from "express";
//body Parser
import * as bodyParser from "body-parser";
//Routes imported
import { HomeRoutes } from './routes/homeRoutes';
import { BlogRoutes } from './routes/blogRoutes';


class App {
  public app: express.Application;
  public homeRoute: HomeRoutes = new HomeRoutes();
  public blogRoute: BlogRoutes = new BlogRoutes();

  constructor () {
    this.app = express();
    this.config();
    this.homeRoute.homeRoutes(this.app);
    this.blogRoute.blogRoutes(this.app);

    // this.mountRoutes();
  }

  // private mountRoutes (): void {
  //   const router = express.Router();
  //   this.app.use( express.static(__dirname + '/public'));

  //   router.get('/', (req: Request, res: Response) => {
  //     // res.json({
  //     //   message: 'Hello World!'
  //     // });
  //     res.sendFile('index.html', { root: __dirname + '/public' } );
  //   });
  //   this.app.use('/', router);
  // }

  private config(): void{
    this.app.use(express.static(__dirname + '/public'));
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
  }
}

export default new App().app;