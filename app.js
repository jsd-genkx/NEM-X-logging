import express from 'express';
import logger from './config/logger.js';

const app = express();
const port = 3000;
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get('/hello-world', (req, res) => {
  try {
    /* Start log */
    logger.info({
      method: req.method,
      path: req.originalUrl,
      queryParams: req.query,
      username: "Khem (from auth middleware)",
      timestamp: new Date().toISOString()
    }, 'Received request');
    /* End log */
  
    const { query } = req;
    if (query.animal === 'cat') {
      throw { message: "Cats are banned" };
    }

    /* Start log */
    logger.info({
      username: "Khem (from auth middleware)",
      timestamp: new Date().toISOString()
    }, 'Response success!');
    /* End log */

    res.status(200).send("success!");
  } catch (err) {
  
    /* Start log */
    logger.customError(req, err);
    /* End log */

    res.status(400).send({
      status: "failure",
      message: err.message
    });
  }
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});