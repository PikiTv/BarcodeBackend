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
    if (err) {
      console.error("Error reading product data:", err);
      res.status(500).json({ error: "Error reading product data" });
      return;
    }
    const productData = JSON.parse(data);
    res.json(productData);
  });
});

app.post("/product", function (req, res) {
  const barcode = req.body.barcode;
  if (!barcode) {
    res.status(400).json({ error: "Invalid barcode data" });
    return;
  }

  fs.readFile(filename, "utf8", function (err, data) {
    if (err) {
      console.error("Error reading product data:", err);
      res.status(500).json({ error: "Error reading product data" });
      return;
    }

    const productData = JSON.parse(data);
    productData.push(barcode);

    fs.writeFile(filename, JSON.stringify(productData), (err) => {
      if (err) {
        console.error("Error writing product data:", err);
        res.status(500).json({ error: "Error writing product data" });
        return;
      }

      res.json({ success: true });
    });
  });
});

app.listen(port, () => console.log(`Server listening on port ${port}!`));
