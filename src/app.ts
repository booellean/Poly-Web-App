//express imports
import * as express from 'express';
import {Request, Response} from "express";
//body Parser
import * as bodyParser from "body-parser";
//mongoose
import * as mongoose from "mongoose";
//Routes imported
import { HomeRoutes } from './routes/homeRoutes';
import { BlogRoutes } from './routes/blogRoutes';
import { DashboardRoutes } from './routes/dashboardRoutes';
//pathnames for view engines
import { ThemeRoutes } from './public/themes/base-theme/public/themeRoutes';
const mainRoute = ThemeRoutes.mainRoute;

class App {
  public app: express.Application;
  public homeRoute: HomeRoutes = new HomeRoutes();
  public blogRoute: BlogRoutes = new BlogRoutes();
  public dashboardRoute: DashboardRoutes = new DashboardRoutes();
  public mongoUrl: string = 'mongodb://localhost:27017/poly';

  constructor () {
    this.app = express();
    this.config();
    this.homeRoute.homeRoutes(this.app);
    this.blogRoute.blogRoutes(this.app);
    this.dashboardRoute.dashboardRoutes(this.app);
    this.mongoSetup();

    // this.mountRoutes();
  }

  private mongoSetup(): void{
    (<any>mongoose).Promise = global.Promise;
    mongoose.connect(this.mongoUrl, { useNewUrlParser: true });
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
    this.app.use(express.static(__dirname + `/public/${mainRoute}/public`));
    this.app.set('view engine', 'ejs');
    this.app.set('views', [__dirname + `/views/admin`, __dirname + `/views/${mainRoute}`]);
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
  }
}

export default new App().app;