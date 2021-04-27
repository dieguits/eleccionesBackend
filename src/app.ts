import express, { Application } from "express";
import morgan from "morgan";
import cors from 'cors';

//Routes
import IndexRoutes from './routes/index.routes';
import RepresentanteRoutes from './routes/representante.routes';
import Votes from './routes/votos.routes';

export class App {

    public app: Application;

    constructor(private port?: number | string) {
        this.app = express();
        this.app.use(cors());
        this.settings();
        this.middleware();
        this.routes();
    }

    settings() {
        this.app.set('port', this.port || process.env.port || 3000);
    }

    routes() {
        this.app.use(IndexRoutes);
        this.app.use('/representantes', RepresentanteRoutes);
        this.app.use('/votes', Votes);
    }

    middleware() {
        this.app.use(morgan('dev'));
        this.app.use(express.json());
    }

    async listen() {
        await this.app.listen(this.app.get('port'));
        console.log('Server on port', this.app.get('port'));
    }
}
