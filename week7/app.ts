import express = require('express');
import personRoute from "./routes/personRoute";

const app = express();

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use('/api/people',personRoute);

export default app;