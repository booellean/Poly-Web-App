import * as express from 'express'

class App {
  public express

  constructor () {
    this.express = express();
    this.mountRoutes();
  }

  private mountRoutes (): void {
    const router = express.Router();
    this.express.use( express.static(__dirname + '/public'));

    router.get('/', (req, res) => {
      // res.json({
      //   message: 'Hello World!'
      // });
      res.sendFile('index.html', { root: __dirname + '/public' } );
    });
    this.express.use('/', router);
  }
}

export default new App().express;