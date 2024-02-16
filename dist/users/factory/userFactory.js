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

// src/users/factory/userFactory.ts
var userFactory_exports = {};
__export(userFactory_exports, {
  UserModule: () => UserModule
});
module.exports = __toCommonJS(userFactory_exports);

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  UserModule
});
