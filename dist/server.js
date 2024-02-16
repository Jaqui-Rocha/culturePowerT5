"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/server.ts
var server_exports = {};
__export(server_exports, {
  app: () => app
});
module.exports = __toCommonJS(server_exports);
var import_express4 = __toESM(require("express"));

// src/users/routes/user.routes.ts
var import_express = require("express");

// src/users/utils/createUserValidator.ts
var yup = __toESM(require("yup"));
var createUserValidator = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().required("Email is required").email("Invalid email format."),
  password: yup.string().required("Password is required."),
  photo: yup.string()
});

// src/users/controller/userController.ts
var UserController = class {
  constructor(userService) {
    this.userService = userService;
  }
  getAll(req, res) {
    return __async(this, null, function* () {
      try {
        const users = yield this.userService.getAll();
        res.status(200).json(users);
      } catch (error) {
        res.status(500).json({ message: error.message || "Ocorreu um erro inesperado." });
      }
    });
  }
  getByEmail(req, res) {
    return __async(this, null, function* () {
      try {
        const { email } = req.query;
        const user = yield this.userService.getByEmail(email);
        res.status(200).json(user);
      } catch (error) {
        res.status(500).json({ message: error.message || "Ocorreu um erro inesperado." });
      }
    });
  }
  getById(req, res) {
    return __async(this, null, function* () {
      try {
        const { id } = req.params;
        const user = yield this.userService.getById(id);
        res.status(200).json(user);
      } catch (error) {
        res.status(500).json({ message: error.message || "Ocorreu um erro inesperado." });
      }
    });
  }
  create(req, res) {
    return __async(this, null, function* () {
      try {
        const { body } = req;
        yield createUserValidator.validate(body, { abortEarly: false });
        const user = yield this.userService.create(body);
        res.status(201).json(user);
      } catch (error) {
        res.status(500).json({ message: error.message || "Ocorreu um erro inesperado." });
      }
    });
  }
  update(req, res) {
    return __async(this, null, function* () {
      try {
        const { id } = req.params;
        const { body } = req;
        const updatedUser = yield this.userService.update(id, body);
        res.status(200).json(updatedUser);
      } catch (error) {
        res.status(500).json({ message: error.message || "Ocorreu um erro inesperado." });
      }
    });
  }
  softDelete(req, res) {
    return __async(this, null, function* () {
      try {
        const { id } = req.params;
        const deletedUser = yield this.userService.softDelete(id);
        res.status(200).json(deletedUser);
      } catch (error) {
        res.status(500).json({ message: error.message || "Ocorreu um erro inesperado." });
      }
    });
  }
};

// src/users/model/userSchema.ts
var import_mongoose = require("mongoose");
var userSchema = new import_mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  photo: {
    type: String
    // required: true
  },
  creatAt: Date,
  updateAt: Date,
  deleteAt: Date,
  jewelsAmount: Number,
  products: Array,
  favoriteProducts: Array
});
var UserModel = (0, import_mongoose.model)("User", userSchema);

// src/users/repository/userRepository.ts
var import_mongoose2 = require("mongoose");
var UserRepository = class {
  constructor(userSchema2) {
    this.userSchema = userSchema2;
  }
  getAll() {
    return __async(this, null, function* () {
      const users = yield this.userSchema.find({ deletedAt: null }).populate("products");
      return users;
    });
  }
  getById(id) {
    return __async(this, null, function* () {
      const user = yield this.userSchema.findOne({ _id: id, deleteAt: null });
      return user;
    });
  }
  create(userData) {
    return __async(this, null, function* () {
      const newUser = yield this.userSchema.create(userData);
      return newUser;
    });
  }
  update(id, newUserData) {
    return __async(this, null, function* () {
      if (!(0, import_mongoose2.isValidObjectId)(id)) {
        throw new Error(`Id ${id} is not valid.`);
      }
      const updatedUser = yield this.userSchema.findByIdAndUpdate(id, newUserData, { new: true });
      return updatedUser;
    });
  }
  softDelete(id) {
    return __async(this, null, function* () {
      if (!(0, import_mongoose2.isValidObjectId)(id)) {
        throw new Error(`Id ${id} is not valid.`);
      }
      const deletedUser = yield this.userSchema.findByIdAndUpdate(id, { deletedAt: /* @__PURE__ */ new Date() }, { new: true });
      return deletedUser;
    });
  }
};

// src/users/service/userService.ts
var import_bcrypt = __toESM(require("bcrypt"));
var UserService = class {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }
  getAll() {
    return __async(this, null, function* () {
      const users = yield this.userRepository.getAll();
      if (!users || users.length === 0) {
        throw new Error("Users not found.");
      }
      return users;
    });
  }
  getById(id) {
    return __async(this, null, function* () {
      const user = yield this.userRepository.getById(id);
      if (!user) {
        throw new Error("User not found.");
      }
      return user;
    });
  }
  create(userData) {
    return __async(this, null, function* () {
      userData.password = yield import_bcrypt.default.hash(userData.password, 8);
      const newUser = yield this.userRepository.create(userData);
      if (!newUser) {
        throw new Error("Cannot create user.");
      }
      return newUser;
    });
  }
  update(id, newUserData) {
    return __async(this, null, function* () {
      const user = yield this.userRepository.getById(id);
      if (!user) {
        throw new Error("User not found.");
      }
      const updatedUser = yield this.userRepository.update(id, newUserData);
      if (!updatedUser) {
        throw new Error("Cannot update user.");
      }
      return user;
    });
  }
  softDelete(id) {
    return __async(this, null, function* () {
      const user = yield this.userRepository.getById(id);
      if (!user) {
        throw new Error("User not found.");
      }
      const deletedUser = yield this.userRepository.softDelete(id);
      if (!deletedUser) {
        throw new Error("Cannot delete user.");
      }
      return deletedUser;
    });
  }
};

// src/users/factory/userFactory.ts
var UserFactory = class {
  static getInstance() {
    const userRepository = new UserRepository(UserModel);
    const userService = new UserService(userRepository);
    const userController = new UserController(userService);
    return userController;
  }
};
var UserModule = UserFactory.getInstance();

// src/middleware/authMiddleware.ts
var import_jsonwebtoken = __toESM(require("jsonwebtoken"));
var AuthMiddleware = class {
  static handler(req, res, next) {
    return __async(this, null, function* () {
      const { headers } = req;
      if (!headers.authorization) {
        throw new Error("Unauthorized.");
      }
      const token = headers == null ? void 0 : headers.authorization.replace("Bearer ", "");
      try {
        import_jsonwebtoken.default.verify(token, process.env.JWT_SECRET_KEY);
        const payload = import_jsonwebtoken.default.decode(token);
        if (!payload)
          throw new Error("Invalid token");
      } catch (err) {
        return res.status(401).json({ message: "Invalid token" });
      }
      next();
    });
  }
};

// src/users/routes/user.routes.ts
var userRoutes = (0, import_express.Router)();
userRoutes.get("/users", AuthMiddleware.handler, UserModule.getAll.bind(UserModule));
userRoutes.get("/user/:id", AuthMiddleware.handler, UserModule.getById.bind(UserModule));
userRoutes.get("/user/email", UserModule.getByEmail.bind(UserModule));
userRoutes.post("/user", UserModule.create.bind(UserModule));
userRoutes.put("/user/:id", AuthMiddleware.handler, UserModule.update.bind(UserModule));
userRoutes.get("/user/delete/:id", AuthMiddleware.handler, UserModule.softDelete.bind(UserModule));

// src/product/routes/product.routes.ts
var import_express2 = require("express");

// src/product/utils/createProductValidator.ts
var yup2 = __toESM(require("yup"));
var createProductValidator = yup2.object({
  name: yup2.string().required("Name is required"),
  value: yup2.string().required("Value is required"),
  amount: yup2.string().required("Amount is required"),
  description: yup2.string().required("Description is required"),
  photo: yup2.string()
});

// src/product/controller/productController.ts
var ProductController = class {
  constructor(productService) {
    this.productService = productService;
  }
  getAll(req, res) {
    return __async(this, null, function* () {
      try {
        const users = yield this.productService.getAll();
        res.status(200).json(users);
      } catch (error) {
        res.status(500).json({ message: error.message || "Ocorreu um erro inesperado." });
      }
    });
  }
  getById(req, res) {
    return __async(this, null, function* () {
      try {
        const { id } = req.params;
        const user = yield this.productService.getById(id);
        res.status(200).json(user);
      } catch (error) {
        res.status(500).json({ message: error.message || "Ocorreu um erro inesperado." });
      }
    });
  }
  create(req, res) {
    return __async(this, null, function* () {
      try {
        const { body } = req;
        yield createProductValidator.validate(body, { abortEarly: false });
        const product = yield this.productService.create(body);
        res.status(201).json(product);
      } catch (error) {
        res.status(500).json({ message: error.message || "Ocorreu um erro inesperado." });
      }
    });
  }
  update(req, res) {
    return __async(this, null, function* () {
      try {
        const { id } = req.params;
        const { body } = req;
        const updatedProduct = yield this.productService.update(id, body);
        res.status(200).json(updatedProduct);
      } catch (error) {
        res.status(500).json({ message: error.message || "Ocorreu um erro inesperado." });
      }
    });
  }
  softDelete(req, res) {
    return __async(this, null, function* () {
      try {
        const { id } = req.params;
        const deletedProduct = yield this.productService.softDelete(id);
        res.status(200).json(deletedProduct);
      } catch (error) {
        res.status(500).json({ message: error.message || "Ocorreu um erro inesperado." });
      }
    });
  }
};

// src/product/model/productSchema.ts
var import_mongoose3 = require("mongoose");
var productSchema = new import_mongoose3.Schema({
  name: {
    type: String,
    required: true
  },
  value: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  photo: {
    type: String,
    required: true
  },
  creatAt: Date,
  updateAt: Date,
  deleteAt: Date
});
var ProductModel = (0, import_mongoose3.model)("Product", productSchema);

// src/product/repository/productRepository.ts
var import_mongoose4 = require("mongoose");
var ProductRepository = class {
  constructor(productSchema2) {
    this.productSchema = productSchema2;
  }
  getAll() {
    return __async(this, null, function* () {
      const products = yield this.productSchema.find({ deletedAt: null }).populate("Users");
      return products;
    });
  }
  getById(id) {
    return __async(this, null, function* () {
      const product = yield this.productSchema.findOne({ _id: id, deleteAt: null });
      return product;
    });
  }
  create(userData) {
    return __async(this, null, function* () {
      const newProduct = yield this.productSchema.create(userData);
      return newProduct;
    });
  }
  update(id, newUserData) {
    return __async(this, null, function* () {
      if (!(0, import_mongoose4.isValidObjectId)(id)) {
        throw new Error(`Id ${id} is not valid.`);
      }
      const updatedProduct = yield this.productSchema.findByIdAndUpdate(id, newUserData, { new: true });
      return updatedProduct;
    });
  }
  softDelete(id) {
    return __async(this, null, function* () {
      if (!(0, import_mongoose4.isValidObjectId)(id)) {
        throw new Error(`Id ${id} is not valid.`);
      }
      const deletedProduct = yield this.productSchema.findByIdAndUpdate(id, { deletedAt: /* @__PURE__ */ new Date() }, { new: true });
      return deletedProduct;
    });
  }
};

// src/product/service/productService.ts
var ProductService = class {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }
  getAll() {
    return __async(this, null, function* () {
      const products = yield this.productRepository.getAll();
      if (!products || products.length === 0) {
        throw new Error("Products not found.");
      }
      return products;
    });
  }
  getById(id) {
    return __async(this, null, function* () {
      const product = yield this.productRepository.getById(id);
      if (!product) {
        throw new Error("Product not found.");
      }
      return product;
    });
  }
  create(productData) {
    return __async(this, null, function* () {
      const newProduct = yield this.productRepository.create(productData);
      if (!newProduct) {
        throw new Error("Cannot create product.");
      }
      return newProduct;
    });
  }
  update(id, newProductData) {
    return __async(this, null, function* () {
      const product = yield this.productRepository.getById(id);
      if (!product) {
        throw new Error("Product not found.");
      }
      const updatedProduct = yield this.productRepository.update(id, newProductData);
      if (!updatedProduct) {
        throw new Error("Cannot update roduct.");
      }
      return product;
    });
  }
  softDelete(id) {
    return __async(this, null, function* () {
      const product = yield this.productRepository.getById(id);
      if (!product) {
        throw new Error("Product not found.");
      }
      const deletedProduct = yield this.productRepository.softDelete(id);
      if (!deletedProduct) {
        throw new Error("Cannot delete product.");
      }
      return deletedProduct;
    });
  }
};

// src/product/factory/productFactory.ts
var ProductFactory = class {
  static getInstance() {
    const productRepository = new ProductRepository(ProductModel);
    const productService = new ProductService(productRepository);
    const productController = new ProductController(productService);
    return productController;
  }
};
var ProductModule = ProductFactory.getInstance();

// src/product/routes/product.routes.ts
var productRoutes = (0, import_express2.Router)();
productRoutes.get("/", ProductModule.getAll.bind(ProductModule));
productRoutes.get("/product/:id", ProductModule.getById.bind(ProductModule));
productRoutes.post("/product", ProductModule.create.bind(ProductModule));
productRoutes.put("/product/:id", ProductModule.update.bind(ProductModule));
productRoutes.get("/product/delete/:id", ProductModule.softDelete.bind(ProductModule));

// src/auth/routes/authLogin.routes.ts
var import_express3 = require("express");

// src/auth/utils/authBodyValidator.ts
var yup3 = __toESM(require("yup"));
var authBodyValidator = yup3.object({
  email: yup3.string().required("Email is required.").email("Invalid email format."),
  password: yup3.string().required("Password is required.")
});

// src/auth/controller/authController.ts
var AuthController = class {
  constructor(authService) {
    this.authService = authService;
  }
  login(req, res) {
    return __async(this, null, function* () {
      try {
        const { body } = req;
        yield authBodyValidator.validate(body, { abortEarly: false });
        const token = yield this.authService.login(body);
        res.status(200).json(token);
      } catch (error) {
        res.status(500).json({ message: error.message || "Ocorreu um erro inesperado." });
      }
    });
  }
};

// src/auth/service/authService.ts
var import_bcrypt2 = __toESM(require("bcrypt"));
var import_jsonwebtoken2 = __toESM(require("jsonwebtoken"));
var AuthService = class {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }
  login(loginData) {
    return __async(this, null, function* () {
      const user = yield this.userRepository.getByEmail(loginData.email);
      if (!user || !user.password) {
        throw new Error("User not found.");
      }
      const userPassword = user.password;
      const isPasswordValid = yield import_bcrypt2.default.compare(loginData.password, userPassword);
      if (!isPasswordValid) {
        throw new Error("Invalid credentials.");
      }
      const payload = __spreadValues({}, user);
      const secretKey = process.env.JWT_SECRET_KEY;
      const options = { expiresIn: "1d" };
      const token = import_jsonwebtoken2.default.sign(payload, secretKey, options);
      return token;
    });
  }
};

// src/auth/factory/loginUser.ts
var AuthLogin = () => {
  const repository = new UserRepository(UserModel);
  const service = new AuthService(repository);
  const controller = new AuthController(service);
  return controller;
};
var Login = AuthLogin();

// src/auth/routes/authLogin.routes.ts
var userRouterLogin = (0, import_express3.Router)();
userRouterLogin.post("/login", Login.login.bind(Login));

// src/server.ts
var app = (0, import_express4.default)();
app.use(import_express4.default.json());
app.use(userRoutes);
app.use(productRoutes);
app.use(userRouterLogin);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  app
});
