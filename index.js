const express = require("express");
const app = express();
const fs = require("fs");
const cors = require("cors");
const port = 8080;
const filename = __dirname + "/product.json";

app.use(express.json());
app.use(cors());

function log(req, res, next) {
  console.log(req.method + " Request at" + req.url);
  next();
}
app.use(log);

app.get("/product", function (req, res) {
  fs.readFile(filename, "utf8", function (err, data) {
    // Hier sollte der Code sein, um den gescannten Barcode aus dem Backend zu senden
    const scannedBarcode = JSON.parse(data).scannedBarcode;
    res.json({ scannedBarcode });
  });
});

app.post("/product", function (req, res) {
  fs.readFile(filename, "utf8", function (err, data) {
    const dataAsObject = JSON.parse(data);
    dataAsObject.scannedBarcode = req.body.scannedBarcode; // Annahme: Sie möchten den gescannten Barcode im JSON speichern
    fs.writeFile(filename, JSON.stringify(dataAsObject), () => {
      res.json({ success: true });
    });
  });
});

app.listen(port, () => console.log(`Server listening on port ${port}!`));