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

// src/product/controller/productController.ts
var productController_exports = {};
__export(productController_exports, {
  ProductController: () => ProductController
});
module.exports = __toCommonJS(productController_exports);

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ProductController
});
