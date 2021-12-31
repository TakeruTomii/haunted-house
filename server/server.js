const path = require('path');
const express = require('express');

const app = express();

// bind path
app.use(express.static(`${__dirname}/dist/haunted-house`));

// Return dist/haunted-house/index.html when Root access
app.get('/', (req, res) => {
  res.sendFile(path.join(`${__dirname}/dist/haunted-house/index.html`));
});

// launch server
const server = app.listen(process.env.PORT || 8080, () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log(`Listening at http://${host}:${port}`);
});
