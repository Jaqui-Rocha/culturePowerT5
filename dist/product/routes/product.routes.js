"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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

// src/product/routes/product.routes.ts
var product_routes_exports = {};
__export(product_routes_exports, {
  productRoutes: () => productRoutes
});
module.exports = __toCommonJS(product_routes_exports);
var import_express = require("express");

// src/product/utils/createProductValidator.ts
var yup = __toESM(require("yup"));
var createProductValidator = yup.object({
  name: yup.string().required("Name is required"),
  value: yup.string().required("Value is required"),
  amount: yup.string().required("Amount is required"),
  description: yup.string().required("Description is required"),
  photo: yup.string()
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
var import_mongoose = require("mongoose");
var productSchema = new import_mongoose.Schema({
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
var ProductModel = (0, import_mongoose.model)("Product", productSchema);

// src/product/repository/productRepository.ts
var import_mongoose2 = require("mongoose");
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
      if (!(0, import_mongoose2.isValidObjectId)(id)) {
        throw new Error(`Id ${id} is not valid.`);
      }
      const updatedProduct = yield this.productSchema.findByIdAndUpdate(id, newUserData, { new: true });
      return updatedProduct;
    });
  }
  softDelete(id) {
    return __async(this, null, function* () {
      if (!(0, import_mongoose2.isValidObjectId)(id)) {
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
var productRoutes = (0, import_express.Router)();
productRoutes.get("/", ProductModule.getAll.bind(ProductModule));
productRoutes.get("/product/:id", ProductModule.getById.bind(ProductModule));
productRoutes.post("/product", ProductModule.create.bind(ProductModule));
productRoutes.put("/product/:id", ProductModule.update.bind(ProductModule));
productRoutes.get("/product/delete/:id", ProductModule.softDelete.bind(ProductModule));
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  productRoutes
});
