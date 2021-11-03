import mongoose from "mongoose";

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/test");

  //creating schema with mongoose.Schema
  const kittySchema = new mongoose.Schema({
    name: String,
  });

  kittySchema.methods.speak = function speak() {
    const greeting = this.name
      ? "Meow name is" + this.name
      : "I don't have a name";
    console.log(greeting);
  };

  //compiling with mongoose.model()
  const Kitten = mongoose.model("Kitten", kittySchema);
  const fluffy = new Kitten({ name: "fluffy" });
  await fluffy.save();
  fluffy.speak();
  const silence = new Kitten({ name: "Silence" });
  await silence.save();
  console.log(silence.name);
  const kittens = await Kitten.find();
  console.log(kittens);
}
