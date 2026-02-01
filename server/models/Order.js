// import mongoose from "mongoose";

// const orderSchema = new mongoose.Schema({
//   orderNumber: { type: String, unique: true, required: true },
//   items: [{
//     menuItem: { type: mongoose.Schema.Types.ObjectId, ref: "MenuItem" },
//     quantity: Number,
//     price: Number
//   }],
//   totalAmount: Number,
//   status: {
//     type: String,
//     enum: ['Pending', 'Preparing', 'Ready', 'Delivered', 'Cancelled'],
//     default: 'Pending'
//   },
//   customerName: String,
//   tableNumber: Number
// }, { timestamps: true });


// export default mongoose.model("Order", orderSchema);



import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  menuItem: { type: mongoose.Schema.Types.ObjectId, ref: "MenuItem", required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
});

const orderSchema = new mongoose.Schema({
  orderNumber: { type: String, required: true, unique: true },
  items: [orderItemSchema],
  totalAmount: { type: Number, required: true },
  status: {
    type: String,
    enum: ["Pending", "Preparing", "Completed", "Cancelled"],
    default: "Pending"
  },
  customerName: String,
  tableNumber: Number,
}, { timestamps: true });

export default mongoose.model("Order", orderSchema);
