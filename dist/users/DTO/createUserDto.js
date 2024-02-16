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

// src/users/DTO/createUserDto.ts
var createUserDto_exports = {};
__export(createUserDto_exports, {
  CreateUserDTO: () => CreateUserDTO
});
module.exports = __toCommonJS(createUserDto_exports);
var CreateUserDTO = class {
  constructor(userData) {
    this.name = userData.name;
    this.email = userData.email;
    this.password = userData.password;
    this.photo = userData.photo;
    this.creatAt = userData.creatAt;
    this.updateAt = userData.updateAt;
    this.jewelsAmount = userData.jewelsAmount;
    this.products = userData.products;
    this.favoriteProducts = userData.favoriteProducts;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CreateUserDTO
});
