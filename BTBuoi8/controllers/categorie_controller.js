const Category = require("../model/categorie");

class CategoryController {
    static async index(req, res) {
        const categories = await Category.find();
        res.render("categorie", { categories });
    }
}

module.exports = CategoryController;
