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

// src/auth/factory/loginUser.ts
var loginUser_exports = {};
__export(loginUser_exports, {
  AuthLogin: () => AuthLogin,
  Login: () => Login
});
module.exports = __toCommonJS(loginUser_exports);

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

// src/auth/utils/authBodyValidator.ts
var yup = __toESM(require("yup"));
var authBodyValidator = yup.object({
  email: yup.string().required("Email is required.").email("Invalid email format."),
  password: yup.string().required("Password is required.")
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
var import_bcrypt = __toESM(require("bcrypt"));
var import_jsonwebtoken = __toESM(require("jsonwebtoken"));
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
      const isPasswordValid = yield import_bcrypt.default.compare(loginData.password, userPassword);
      if (!isPasswordValid) {
        throw new Error("Invalid credentials.");
      }
      const payload = __spreadValues({}, user);
      const secretKey = process.env.JWT_SECRET_KEY;
      const options = { expiresIn: "1d" };
      const token = import_jsonwebtoken.default.sign(payload, secretKey, options);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AuthLogin,
  Login
});
