import mongoose from "mongoose";
import dotenv from "dotenv";
import MenuItem from "../models/MenuItem.js";
import Order from "../models/Order.js";

dotenv.config();

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    await MenuItem.deleteMany();
    await Order.deleteMany();

    const items = await MenuItem.insertMany([
      { name: "Garlic Bread", category: "Appetizer", price: 4.5, ingredients: ["bread", "garlic"], preparationTime: 5 },
      { name: "Caesar Salad", category: "Appetizer", price: 7.5, ingredients: ["lettuce", "croutons"], preparationTime: 7 },
      { name: "Bruschetta", category: "Appetizer", price: 6, ingredients: ["tomato", "bread"], preparationTime: 6 },

      { name: "Margherita Pizza", category: "Main Course", price: 10, ingredients: ["cheese", "tomato"], preparationTime: 15 },
      { name: "Pepperoni Pizza", category: "Main Course", price: 12, ingredients: ["pepperoni", "cheese"], preparationTime: 17 },
      { name: "Burger", category: "Main Course", price: 12, ingredients: ["beef", "bun"], preparationTime: 15 },
      { name: "Grilled Chicken", category: "Main Course", price: 14, ingredients: ["chicken", "spices"], preparationTime: 18 },
      { name: "Pasta Alfredo", category: "Main Course", price: 11, ingredients: ["pasta", "cream"], preparationTime: 14 },
      { name: "Steak", category: "Main Course", price: 20, ingredients: ["beef"], preparationTime: 25 },

      { name: "Chocolate Cake", category: "Dessert", price: 6, ingredients: ["chocolate"], preparationTime: 8 },
      { name: "Ice Cream", category: "Dessert", price: 5, ingredients: ["milk"], preparationTime: 3 },

      { name: "Coke", category: "Beverage", price: 3, ingredients: ["soda"], preparationTime: 1 },
      { name: "Orange Juice", category: "Beverage", price: 4, ingredients: ["orange"], preparationTime: 2 },
      { name: "Lemonade", category: "Beverage", price: 3.5, ingredients: ["lemon"], preparationTime: 2 },
      { name: "Tea", category: "Beverage", price: 2.5, ingredients: ["tea leaves"], preparationTime: 2 },
    ]);

    await Order.insertMany([
      {
        orderNumber: "ORD001",
        items: [{ menuItem: items[0]._id, quantity: 2, price: 4.5 }],
        totalAmount: 9,
        status: "Pending",
        customerName: "John",
        tableNumber: 5
      },
      {
        orderNumber: "ORD002",
        items: [{ menuItem: items[3]._id, quantity: 1, price: 10 }],
        totalAmount: 10,
        status: "Preparing",
        customerName: "Emma",
        tableNumber: 2
      },
      {
        orderNumber: "ORD003",
        items: [{ menuItem: items[6]._id, quantity: 2, price: 14 }],
        totalAmount: 28,
        status: "Preparing",
        customerName: "Mike",
        tableNumber: 8
      },
      {
        orderNumber: "ORD004",
        items: [{ menuItem: items[9]._id, quantity: 1, price: 4 }],
        totalAmount: 4,
        status: "Pending",
        customerName: "Anna",
        tableNumber: 1
      },
      {
        orderNumber: "ORD005",
        items: [{ menuItem: items[10]._id, quantity: 3, price: 6 }],
        totalAmount: 18,
        status: "Completed",
        customerName: "Chris",
        tableNumber: 6
      },
      {
        orderNumber: "ORD006",
        items: [{ menuItem: items[4]._id, quantity: 2, price: 12 }],
        totalAmount: 24,
        status: "Cancelled",
        customerName: "Sarah",
        tableNumber: 4
      },
      {
        orderNumber: "ORD007",
        items: [{ menuItem: items[13]._id, quantity: 4, price: 2.5 }],
        totalAmount: 10,
        status: "Pending",
        customerName: "Tom",
        tableNumber: 10
      },
      {
        orderNumber: "ORD008",
        items: [{ menuItem: items[12]._id, quantity: 2, price: 3.5 }],
        totalAmount: 7,
        status: "Preparing",
        customerName: "Linda",
        tableNumber: 3
      },
      {
        orderNumber: "ORD009",
        items: [{ menuItem: items[8]._id, quantity: 1, price: 20 }],
        totalAmount: 20,
        status: "Completed",
        customerName: "Alex",
        tableNumber: 7
      },
      {
        orderNumber: "ORD010",
        items: [{ menuItem: items[1]._id, quantity: 2, price: 7.5 }],
        totalAmount: 15,
        status: "Pending",
        customerName: "Nina",
        tableNumber: 9
      }
    ]);

    console.log("✅ Database Seeded Successfully!");
    process.exit();
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
};

seed();
