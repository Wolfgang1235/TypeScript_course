import * as dotenv from 'dotenv'
dotenv.config({path:'./.env'});
import app from './app';
import * as mongoose from 'mongoose';

const DB = process.env.DATABASE_DEV!.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD!,
);
mongoose.connect(DB, {
}).then(() => console.log('DB connection has succeed!'));

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`App running on port ${port}`)
})