import express from 'express';
import { default as router } from './router.middleware.js';

const app = express();
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5500');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
app.use(express.json({ extended: true }));
router(app);
app.listen(process.env.PORT, () => { console.log(`Server is running at http://localhost:${process.env.PORT}`) });
app.use('/img', express.static('img_upload'));