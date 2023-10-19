const { Schema, model } = require("mongoose");

const ItemSchema = new Schema({name: String, image: String, price: Number});

const closetSchema = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  total: Number,
  shirts: [ItemSchema],
  pants: [ItemSchema],
  shoes:[ItemSchema]
});

const Closet = model("Closet", closetSchema, "closets");

module.exports = Closet;

