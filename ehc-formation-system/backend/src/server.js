const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('EHC Training Hub Backend is running!');
});

app.listen(port, () => {
  console.log(`Backend server listening on port ${port}`);
});