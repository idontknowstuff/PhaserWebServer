const path = require('path');
const express = require('express');

const app = express();

const PORT = process.env.PORT || 8080;

app.get("/", () => {  
  console.log("Success!");  
});

app.listen(PORT, () => {
  console.log(`Server running at http:/` + PORT);
});