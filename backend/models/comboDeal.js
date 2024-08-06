const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const ObjectId = mongoose.SchemaTypes.ObjectId;

const comboDealSchema = new Schema(
  {
    products: [{ type: ObjectId, required: true, ref: "Product" }],
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  }
);

// removing _id and __v fields from document
comboDealSchema.set("toJSON", {
  virtuals: true,
  transform: function (doc, ret, options) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});

const ComboDeal = model("ComboDeal", comboDealSchema);

module.exports = ComboDeal;
