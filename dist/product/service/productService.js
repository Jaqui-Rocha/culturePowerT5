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

// src/product/service/productService.ts
var productService_exports = {};
__export(productService_exports, {
  ProductService: () => ProductService
});
module.exports = __toCommonJS(productService_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ProductService
});
