import { app } from "./src/app";
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
dotenv.config();

app.getAppExpress().set("port", process.env.PORT || 8000);
app.getAppExpress().use(bodyParser.urlencoded({
    extended: true
}));
app.getAppExpress().use(bodyParser.json());

app.getAppExpress().get('/', (req: any, res: any) => {
    res.send('slot-heroes server');
});

const port: unknown = process.env.PORT || 8000;

app.getServer().listen(port, function () {
    console.log("listening on *:" + port);
});
