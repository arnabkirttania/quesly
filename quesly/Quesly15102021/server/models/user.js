const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    trim: true,
    minLength: 4,
  },
  lastname: {
    type: String,
    required: true,
    trim: true,
    minLength: 4,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid Email.");
      }
    },
  },
  username: {
    type: String,
    required: true,
    trim: true,
    minLength: 5,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minLength: 8,
  },
  cpassword: {
    type: String,
    required: true,
    trim: true,
    minLength: 8,
  },
  category: [
    {
      type: String,
      required: true,
    },
  ],
  following: [
    {
      username: {
        type: String,
        trim: true,
      },
      category: {
        type: String,
        trim: true,
      },
    },
  ],
  followers: [
    {
      username: {
        type: String,
        trim: true,
      },
      category: {
        type: String,
        trim: true,
      },
    },
  ],
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

// Hashing Passwords

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
    this.cpassword = await bcrypt.hash(this.cpassword, 10);
    console.log(this.password);
  }
  next();
});

// Generating Auth Token

userSchema.methods.generateAuthToken = async function () {
  try {
    let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    return token;
  } catch (e) {
    console.log(`Failed to generate token --> ${e}`);
  }
};

const User = mongoose.model("USER", userSchema);

module.exports = User;
