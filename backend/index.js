const express = reqire('express');
const app = express();
const port = 3000;

app.use(express.json());


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});
