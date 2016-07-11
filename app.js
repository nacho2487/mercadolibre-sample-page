const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3004;

app.use(express.static(path.join(__dirname, './dist')));


app.listen(port, function(){
    console.log(`The server is listening on port ${port}`);
});