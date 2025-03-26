const user = {
  name: "Nguyen Van A",
  email: "vana@gmail.com",
};

class HomeController {
  static index(req, res) {
    res.render("index", { user });
  }

  static about(req, res) {
    res.render("index", { user });
  }
}

module.exports = HomeController;
