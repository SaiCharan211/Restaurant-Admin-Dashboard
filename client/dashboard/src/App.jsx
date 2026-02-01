// import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
// import MenuManagement from "./pages/MenuManagement";
// import OrdersDashboard from "./pages/OrdersDashboard";

// function App() {
//   return (
//     <BrowserRouter>
//       <div className="p-4">
//         <Link to="/" className="mr-4">Menu</Link>
//         <Link to="/orders">Orders</Link>
//       </div>

//       <Routes>
//         <Route path="/" element={<MenuManagement />} />
//         <Route path="/orders" element={<OrdersDashboard />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;




import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import MenuManagement from "./pages/MenuManagement";
import OrdersDashboard from "./pages/OrdersDashboard";
import "./App.css"; // <-- Add this

function App() {
  return (
    <BrowserRouter>
      {/* Navigation */}
      <nav className="navbar">
        <div className="navbar-container">
          <h1 className="logo">Restaurant Admin</h1>

          <div className="nav-links">
            <NavLink to="/" end className="nav-link">
              Menu
            </NavLink>

            <NavLink to="/orders" className="nav-link">
              Orders
            </NavLink>
          </div>
        </div>
      </nav>

      {/* Page Content */}
      <main className="content">
        <Routes>
          <Route path="/" element={<MenuManagement />} />
          <Route path="/orders" element={<OrdersDashboard />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
