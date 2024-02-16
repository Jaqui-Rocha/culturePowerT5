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

// src/users/service/userService.ts
var userService_exports = {};
__export(userService_exports, {
  UserService: () => UserService
});
module.exports = __toCommonJS(userService_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  UserService
});
