const express = require('express');

const app = express();




app.get('/start', (req, res) => {

  console.log('Starting the process...');
  res.send('Process completed successfully!');
});

// Start the server
const port = process.env.PORT || 3000; // Use environment variable or default port 3000
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});