const express = require("express");

const router = express.Router();

const products = require("../store/productsList");

router.get("", (req, res) => {
  console.log("HI");
  let filteredProducts = products;
  const { manufacturer, year, carName } = req.query;

  if (manufacturer) {
    filteredProducts = filteredProducts.filter(
      (product) =>
        product["manufacturer"].toLocaleLowerCase() ===
        manufacturer.toLocaleLowerCase()
    );
  }
  if (year) {
    filteredProducts = filteredProducts.filter(
      (product) => product[" year "] === parseInt(year)
    );
  }
  if (carName) {
    filteredProducts = filteredProducts.filter(
      (product) =>
        product["car name"].toLocaleLowerCase() === carName.toLocaleLowerCase()
    );
  }

  res.json(filteredProducts);
});

router.get("/:id", (req, res) => {
  const productId = req.params.id;
  let filteredProducts = products;

  if (productId) {
    filteredProducts = filteredProducts.filter(
      (product) => product["id"] === parseInt(productId)
    );

    if (filteredProducts) {
      res.json(filteredProducts);
    } else {
      res.status(404).json({
        error: "Product not found",
      });
    }
  }
});

router.post("/", (req, res) => {
  const { image, carName, year, manufacturer } = req.body;
  const newProduct = {
    id: products.length + 1,
    image: image,
    "car name": carName,
    " year ": year,
    manufacturer: manufacturer,
  };

  products.push(newProduct);
  res.status(200).json(newProduct);
});

router.put("/:id", (req, res) => {
  const productId = req.params.id;
  const { image, carName, year, manufacturer } = req.body;

  const selectedProduct = products.find(
    (product) => product["id"] === parseInt(productId)
  );

  if (selectedProduct) {
    if (image) {
      selectedProduct["image"] = image;
    }
    if (carName) {
      selectedProduct["car name"] = carName;
    }
    if (year) {
      selectedProduct[" year "] = year;
    }
    if (manufacturer) {
      selectedProduct["manufacturer"] = manufacturer;
    }

    res.status(200).json(selectedProduct);
  } else {
    res.status(404).json({ error: "Product not found" });
  }
});

module.exports = router;