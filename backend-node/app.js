// jshint esversion: 6
const PORT = 5000;
const express = require("express");
const fileUpload = require('express-fileupload');

const app = express();
var multer = require('multer')
var cors = require('cors');

app.use(cors())

app.get('/', (req, res) => {
  return res.status(200).send("It's working");
});


app.use(
  fileUpload({
    useTempFiles: true,
    safeFileNames: true,
    preserveExtension: true,
    tempFileDir: `${__dirname}/public/files/temp`
  })
);

app.post('/upload', (req, res, next) => {
  let uploadFile = req.files.myFile;
  console.log(uploadFile)
  const name = uploadFile.name;
  const md5 = uploadFile.md5;
  const saveAs = `${md5}_${name}`;
  uploadFile.mv(`${__dirname}/public/files/${saveAs}`, function(err) {
    if (err) {
      return res.status(500).send(err);
    }
    return res.status(200).json({ status: 'uploaded', name, saveAs });
  });
});

app.listen(PORT, function() {
	console.log("Server started successfully");
});
