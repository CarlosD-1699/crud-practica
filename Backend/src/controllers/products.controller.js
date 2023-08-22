import Product from "../models/product.model.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    if (!products)
      return res.status(401).json({ message: "Products not found" });

    return res.json(products);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const createProduct = async (req, res) => {
  const { productname, description, category, price } = req.body;
  try {
    const newProduct = new Product({
      productname,
      description,
      category, //category: req.category.id
      price,
    });

    const productSaved = await newProduct.save();

    res.json({
      id: productSaved._id,
      productname: productSaved.productname,
      description: productSaved.description,
      category: productSaved.category,
      price: productSaved.price,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProduct = async (req, res) => {
  try {
    const productFound = await Product.findById(req.params.id);

    if (!productFound)
      return res.status(404).json({ message: "Product not found" });

    return res.json(productFound);
  } catch (error) {
    return res.status(404).json({ message: "Product not found" });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const productFound = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    if (!productFound)
      return res.status(404).json({ message: "Product not found" });

    return res.json(productFound);
  } catch (error) {
    return res.status(404).json({ message: "Product not found" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const productFound = await Product.findByIdAndDelete(req.params.id);

    if (!productFound)
      return res.status(404).json({ message: "Product not found" });

    return res.sendStatus(204);
  } catch (error) {
    return res.status(404).json({ message: "Product not found" });
  }
};

// export const getProductsByCategory = async (req, res) => {
//   const products = await Product.find({
//     category: req.category.id
//   });

//   if (!products) return res.status(401).json({ message: "Products not found" });

//   return res.json(products);
// };
