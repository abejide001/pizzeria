import mongoose from "mongoose";

interface OrderAttrs {
  userId: string;
}

interface OrderModel extends mongoose.Model<OrderDoc> {
  build(attrs: OrderAttrs): OrderDoc;
}

interface OrderDoc extends mongoose.Document {
  items: string[];
  userId: string;
}

const orderSchema = new mongoose.Schema(
  {
    items: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Pizza"
    },
    userId: {
      type: String,
    },
    status: {
      type: String,
      enum: ["failed", "successful", "pending"],
      default: "pending"
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

orderSchema.statics.build = (attrs: OrderAttrs) => {
  return new Order(attrs);
};

const Order = mongoose.model<OrderDoc, OrderModel>("Order", orderSchema);

export default Order;
