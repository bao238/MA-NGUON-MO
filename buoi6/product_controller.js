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
  
  const products = [
    {
      id: 101,
      name: "iPhone 15 Pro",
      description: "Điện thoại Apple mới nhất với chip A17",
      price: 29990000,
      stock: 50,
      category_id: 1,
    },
    {
      id: 102,
      name: "MacBook Pro 16-inch",
      description: "Laptop cao cấp của Apple với chip M2 Pro",
      price: 55990000,
      stock: 20,
      category_id: 2,
    },
    {
      id: 103,
      name: "AirPods Pro 2",
      description: "Tai nghe không dây chống ồn",
      price: 5990000,
      stock: 100,
      category_id: 3,
    },
  ];
  
  class ProductController {
    static index(req, res) {
      res.render("product", { products, categories });
    }
  }
  
  module.exports = ProductController;
  