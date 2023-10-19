const { Schema, model } = require("mongoose");

const ItemSchema = new Schema({ name: String, image: String, price: Number });
const FitSchema = new Schema({
  shoes: ItemSchema,
  pants: ItemSchema,
  shirt: ItemSchema
});

const fitSchema = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: "User" },
  outfits: [FitSchema]
});

// inspired by https://stackoverflow.com/a/47598064
fitSchema.statics.findOneOrCreate = async function findOneOrCreate(condition) {
  let result = await this.findOne(condition);
  
  if (result) {
    return result;
  } else {
    return await this.create(condition);
  }
};

const Fit = model("Fit", fitSchema, "fits");

module.exports = Fit;
