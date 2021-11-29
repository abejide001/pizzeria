import mongoose from "mongoose";

interface PizzaAttrs {
  name: string;
  price: number;
  userId: string;
  quantity: number;
}

interface PizzaModel extends mongoose.Model<PizzaDoc> {
  build(attrs: PizzaAttrs): PizzaDoc;
}

interface PizzaDoc extends mongoose.Document {
  name: string;
  price: number;
  userId: string;
  quantity: number
}

const pizzaSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    price: {
      type: Number,
      required: true,
    },
    userId: {
      type: String,
    },
    quantity: {
      type: Number,
      required: true,
      default: 0
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    }
  },
  {
    toJSON: {
      transform(_, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

pizzaSchema.statics.build = (attrs: PizzaAttrs) => {
  return new Pizza(attrs);
};

const Pizza = mongoose.model<PizzaDoc, PizzaModel>("Pizza", pizzaSchema);

export default Pizza;
