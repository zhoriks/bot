import express, { Express } from 'express';
import http from 'http';
import https from 'https';
import pgProm from 'pg-promise';
import fs from 'fs';
import * as dotenv from 'dotenv';
dotenv.config();


class App {
    private static instance: App;
    private appExpress: Express;
    private readonly db: pgProm.IDatabase<unknown>;
    private server: any;

    private constructor() {
        try {
            this.initServer();
            this.db = this.initDb();
        } catch (err) {
            console.log(`App.constructor: ${err}`);
        }
    }

    private initServer() {
        this.appExpress = express();

        // const sslSettings: any = config.get('ssl');
        // if (sslSettings.secure) {
        //     const httpsOptions = {
        //         key: fs.readFileSync(sslSettings.secureKey),
        //         cert: fs.readFileSync(sslSettings.secureCert),
        //         ca: fs.readFileSync(sslSettings.secureChain)
        //     };
        //     this.server = https.createServer(httpsOptions, this.appExpress);
        // } else {
        this.server = http.createServer(this.appExpress);
        // };
    }

    private initDb(): pgProm.IDatabase<unknown> {
        const database: any = {
            "driver": process.env.DBDRIVER,
            "host": process.env.DBHOST,
            "port": process.env.DBPORT,
            "user": process.env.DBUSER,
            "password": process.env.DBPASSWORD,
            "schema": process.env.DBSCHEMA,
            "timezone": "utc",
            "database": process.env.DBDATABASE,
        };
        console.log(`App.initDb: init DB ${process.env.DBHOST}:${process.env.DBPORT}:${process.env.DBDATABASE}`);

        return pgProm({ schema: 'public' })(database);
    }

    public getAppExpress() {
        return this.appExpress;
    }

    static getInstance() {
        if (!App.instance) {
            App.instance = new App();
        }

        return App.instance;
    }

    public getServer() {
        return this.server;
    }

    public getDb() {
        return this.db;
    }
}

const app = App.getInstance();

export { app };
