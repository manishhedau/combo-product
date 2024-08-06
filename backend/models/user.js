const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: false,
      maxlength: 255,
      default: "",
    },
    dob: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 1024,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isSubscribed: {
      type: Boolean,
      default: false,
    },
    authToken: {
      type: String,
      default: "",
    },
    pushToken: {
      type: String,
      default: "",
    },
    receiptId: {
      type: String,
      default: "",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  }
);

// removing _id and __v fields from document
userSchema.set("toJSON", {
  virtuals: true,
  transform: function (doc, ret, options) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    delete ret.isDeleted;
  },
});

userSchema.methods.validatePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      id: this._id,
      email: this.email,
      isAdmin: false,
    },
    process.env.SECRET_KEY,
    { expiresIn: "30d" }
  );
  return token;
};

const User = model("User", userSchema);

function countOfUsers() {
  return User.count({ isDeleted: false });
}

function getAllUser() {
  return User.find({ isDeleted: false }).select(
    "-password -createdAt -updatedAt"
  );
}

function getAllUserWithPagination(skip, limit) {
  return User.find({ isDeleted: false })
    .sort({ createdAt: -1 })
    .select("-password -isVerified -updatedAt")
    .skip(skip)
    .limit(limit);
}

function getAllSubscribedUsers() {
  return User.find({ isSubscribed: true, isDeleted: false }).select(
    "isSubscribed receiptId"
  );
}

function getUser(userId) {
  return User.findOne({ _id: userId, isDeleted: false }).select(
    "-password -createdAt -updatedAt"
  );
}

function getUserIsSubscribed(userId) {
  return User.findOne({ _id: userId, isDeleted: false }).select(
    "isSubscribed pushToken receiptId"
  );
}

function getAllUserPushToken() {
  return User.find({
    isDeleted: false,
    isSubscribed: true,
    pushToken: { $ne: "" },
  }).select("pushToken");
}

function getUserAuthToken(userId) {
  return User.findOne({ _id: userId, isDeleted: false }).select("authToken");
}

function findUserWithEmail(email) {
  return User.findOne({ email, isDeleted: false }).select(
    "-createdAt -updatedAt"
  );
}

async function createUser(email, password) {
  // creating a client user
  let user = new User({
    email: email,
    password: password,
  });

  // hashing password
  const hashPassword = await generateHashPassword(password);

  user.password = hashPassword;
  return await user.save();
}

function updateUserAuthToken(userId, authToken) {
  return User.findOneAndUpdate(
    { _id: userId, isDeleted: false },
    { authToken },
    {
      new: true,
      runValidators: true,
    }
  );
}

function updateUseFullNameAndDOB(userId, fullName, dob) {
  // updating fullName and DOB of a client user
  return User.findOneAndUpdate(
    { _id: userId, isDeleted: false },
    { fullName, dob },
    {
      new: true,
      runValidators: true,
    }
  ).select("-password -createdAt -updatedAt");
}

async function updateUserPassword(userId, password) {
  const hashPassword = await generateHashPassword(password);

  return User.findOneAndUpdate(
    { _id: userId, isDeleted: false },
    { password: hashPassword },
    {
      new: true,
      runValidators: true,
    }
  ).select("-password -createdAt -updatedAt");
}

function updateUserVarified(userId) {
  return User.findOneAndUpdate(
    { _id: userId, isDeleted: false },
    { isVerified: true },
    {
      new: true,
      runValidators: true,
    }
  ).select("-password -createdAt -updatedAt");
}

function updateSubscribedForUser(userId, isSubscribed) {
  const updatedObject = { isSubscribed: isSubscribed };

  if (!isSubscribed) {
    updatedObject.receiptId = "";
  }

  return User.findOneAndUpdate(
    { _id: userId, isDeleted: false },
    updatedObject,
    {
      new: true,
      runValidators: true,
    }
  ).select("-password -createdAt -updatedAt");
}

function updateReceiptForUser(userId, receiptId) {
  return User.findOneAndUpdate(
    { _id: userId, isDeleted: false },
    { receiptId: receiptId, isSubscribed: true },
    {
      new: true,
      runValidators: true,
    }
  ).select("-password -createdAt -updatedAt");
}

async function updateUserProfile(userId, userObject) {
  if (userObject["password"]) {
    // hashing password
    const hashPassword = await generateHashPassword(userObject["password"]);
    userObject.password = hashPassword;
  }

  // updatting user profile
  let user = await User.findOneAndUpdate(
    { _id: userId, isDeleted: false },
    userObject,
    {
      new: true,
      runValidators: true,
    }
  ).select("-password -createdAt -updatedAt");

  return user;
}

function deleteUser(userId) {
  return User.deleteOne({ _id: userId, isDeleted: false }).select(
    "-password -createdAt -updatedAt"
  );
}

exports.User = User;
exports.countOfUsers = countOfUsers;
exports.getAllUser = getAllUser;
exports.getAllUserWithPagination = getAllUserWithPagination;
exports.getAllUserPushToken = getAllUserPushToken;
exports.getAllSubscribedUsers = getAllSubscribedUsers;
exports.getUser = getUser;
exports.getUserIsSubscribed = getUserIsSubscribed;
exports.getUserAuthToken = getUserAuthToken;
exports.findUserWithEmail = findUserWithEmail;
exports.createUser = createUser;
exports.updateUserAuthToken = updateUserAuthToken;
exports.updateUseFullNameAndDOB = updateUseFullNameAndDOB;
exports.updateUserPassword = updateUserPassword;
exports.updateUserVarified = updateUserVarified;
exports.updateSubscribedForUser = updateSubscribedForUser;
exports.updateReceiptForUser = updateReceiptForUser;
exports.updateUserProfile = updateUserProfile;
exports.deleteUser = deleteUser;
