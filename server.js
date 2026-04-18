const express = require("express");
const cors = require("cors");
const db = require("./models");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
require("./routes/product.routes")(app);

// Sync DB & Start Server
db.sequelize.sync().then(() => {
  console.log("🗄️ Database synced");
  app.listen(8080, () => {
    console.log("🔥 Server running on http://localhost:8080");
  });
}).catch(err => {
  console.error("❌ DB Error:", err);
});

// Add this root route
app.get("/", (req, res) => {
  res.json({ 
    message: "Product API is running! 🚀",
    endpoints: {
      products: "/api/products"
    }
  });
});