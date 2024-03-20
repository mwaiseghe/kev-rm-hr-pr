import express from 'express';
import bodyParser from 'body-parser';
import loginRouter from './src/Routes/loginRouter.js';


const app = express();
const PORT = 8100;

app.use(bodyParser.json());


app.use('/api', loginRouter);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
