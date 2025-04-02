const categories = [
  {
    id: 1,
    name: "Điện thoại",
    description: "Các dòng điện thoại thông minh và phụ kiện",
  },
  {
    id: 2,
    name: "Laptop",
    description: "Laptop các hãng khác nhau",
  },
  {
    id: 3,
    name: "Phụ kiện",
    description: "Tai nghe, sạc, cáp,...",
  },
];

const Product = require("../model/product");

class ProductController {
  static async index(req, res) {
    let q = req.query.q;
    let page = parseInt(req.query.page);
    let skip = (page - 1) * 5;
    console.log(page);

    //page = 1 ==> skip =0
    //page =  2 ==> skip = 5
    // page = 3 ==> skip = 10
    //page = 4 ==> skip =15
    // page = n ==> skip = (n-1)*5

    let products;
    if (q) {
      products = await Product.find({ name: { $regex: q, $options: "i" } });
    } else {
      products = await Product.find().skip(skip).limit(5);
    }

    res.render("product", { products });
  }

  static async delete(req, res) {
    console.log(req.params.id);
    let id = req.params.id;
    let product = await Product.deleteOne({ _id: id });
    res.redirect("/products");
  }
}

module.exports = ProductController;