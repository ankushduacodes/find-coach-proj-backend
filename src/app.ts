import express from 'express';

const app = express();
const port = process.env.PORT || 8081;

app.listen(port, () => {
  console.log(`listening on http://localhost:${port}`);
}).on('error', (err) => {
  console.log(err);
});
