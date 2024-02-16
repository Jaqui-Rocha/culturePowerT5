"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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

// src/product/repository/productRepository.ts
var productRepository_exports = {};
__export(productRepository_exports, {
  ProductRepository: () => ProductRepository
});
module.exports = __toCommonJS(productRepository_exports);
var import_mongoose = require("mongoose");
var ProductRepository = class {
  constructor(productSchema) {
    this.productSchema = productSchema;
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
      if (!(0, import_mongoose.isValidObjectId)(id)) {
        throw new Error(`Id ${id} is not valid.`);
      }
      const updatedProduct = yield this.productSchema.findByIdAndUpdate(id, newUserData, { new: true });
      return updatedProduct;
    });
  }
  softDelete(id) {
    return __async(this, null, function* () {
      if (!(0, import_mongoose.isValidObjectId)(id)) {
        throw new Error(`Id ${id} is not valid.`);
      }
      const deletedProduct = yield this.productSchema.findByIdAndUpdate(id, { deletedAt: /* @__PURE__ */ new Date() }, { new: true });
      return deletedProduct;
    });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ProductRepository
});
