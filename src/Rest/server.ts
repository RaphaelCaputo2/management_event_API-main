import 'dotenv/config';
import 'reflect-metadata';
import '../Core/Container';
import 'dotenv/config';
import * as express from 'express';
import routes from './routes';
import errorMiddleware from '../Core/Tools/GlobalError/ErrorMiddleware';
import { AppDataSource } from '../data-source';

class App {
  public app: express.Application;
  public port = process.env.SERVER_PORT || 3001;
  constructor() {
    this.app = express();
    this.initializeMiddlewares();
    this.initializeControllers();
    this.initializeErrorHandling();
  }

  public listen() {
    AppDataSource.initialize()
      .then(async () => {
        console.log('Database running');
        this.app.listen(this.port, () =>
          console.log(`Server running on port ${this.port}`),
        );
      })
      .catch((error) => console.log(error.message));
    //   });
  }

  private initializeMiddlewares() {
    this.app.use(express.json());
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }

  private initializeControllers() {
    this.app.use(routes);
  }
}

export default App;
