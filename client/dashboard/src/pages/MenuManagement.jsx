import { useEffect, useState } from "react";
import axios from "axios";
import useDebounce from "../hooks/useDebounce";

export default function MenuManagement() {
  const [menu, setMenu] = useState([]);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);

  const [category, setCategory] = useState("");
  const [availability, setAvailability] = useState("");

  // Modal & Form State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "Main Course",
    price: "",
  });

  const fetchMenu = async () => {
    let url = `/api/menu?`;
    if (category) url += `category=${category}&`;
    if (availability) url += `isAvailable=${availability}&`;

    try {
      const res = await axios.get(url);
      setMenu(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Failed to fetch menu:", error);
      setMenu([]);
    }
  };

  useEffect(() => {
    if (debouncedSearch) {
      axios.get(`/api/menu/search?q=${debouncedSearch}`)
        .then(res => setMenu(Array.isArray(res.data) ? res.data : []))
        .catch(err => console.error(err));
    } else {
      fetchMenu();
    }
  }, [debouncedSearch, category, availability]);

  const toggleAvailability = async (id) => {
    const old = [...menu];
    setMenu(menu.map(m => m._id === id ? { ...m, isAvailable: !m.isAvailable } : m));

    try {
      await axios.patch(`/api/menu/${id}/availability`);
    } catch {
      setMenu(old);
      alert("Failed to update availability!");
    }
  };

  // CRUD Handlers
  const handleAdd = () => {
    setEditingItem(null);
    setFormData({ name: "", category: "Main Course", price: "" });
    setIsModalOpen(true);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({ name: item.name, category: item.category, price: item.price });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    try {
      await axios.delete(`/api/menu/${id}`);
      fetchMenu();
    } catch (error) {
      console.error("Failed to delete item", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingItem) {
        await axios.put(`/api/menu/${editingItem._id}`, formData);
      } else {
        await axios.post("/api/menu", formData);
      }
      setIsModalOpen(false);
      fetchMenu();
    } catch (error) {
      console.error("Failed to save item", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="dashboard-container">
      <h1 className="page-title">
        Menu <span className="highlight">Management</span>
      </h1>

      <div className="controls-bar">
        <input
          className="search-input"
          placeholder="Search menu items..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select onChange={(e) => setCategory(e.target.value)} className="filter-select">
          <option value="">All Categories</option>
          <option value="Appetizer">Appetizer</option>
          <option value="Main Course">Main Course</option>
          <option value="Dessert">Dessert</option>
          <option value="Beverage">Beverage</option>
        </select>

        <select onChange={(e) => setAvailability(e.target.value)} className="filter-select">
          <option value="">All Status</option>
          <option value="true">Available</option>
          <option value="false">Unavailable</option>
        </select>

        <button className="btn-add" onClick={handleAdd}>
          + Add Item
        </button>
      </div>

      <div className="grid-layout">
        {menu.map(item => (
          <div key={item._id} className="card">
            <div>
              <div className="card-header">
                <h2 className="item-title">{item.name}</h2>
                <span className="category-tag">{item.category}</span>
              </div>
              <p className="price-tag">${item.price}</p>
            </div>
            
            <div className="card-actions">
              <button className="btn-edit" onClick={() => handleEdit(item)}>Edit</button>
              <button className="btn-danger" onClick={() => handleDelete(item._id)}>Delete</button>
            </div>

            <button
              className={`action-btn ${item.isAvailable ? "btn-available" : "btn-unavailable"}`}
              onClick={() => toggleAvailability(item._id)}
              style={{ marginTop: "1rem" }}
            >
              <span className={`dot ${item.isAvailable ? 'dot-green' : 'dot-red'}`}></span>
              {item.isAvailable ? "Available" : "Unavailable"}
            </button>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 className="modal-title">{editingItem ? "Edit Item" : "Add New Item"}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Name</label>
                <input className="form-input" name="name" value={formData.name} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label className="form-label">Category</label>
                <select className="form-input" name="category" value={formData.category} onChange={handleInputChange}>
                  <option value="Appetizer">Appetizer</option>
                  <option value="Main Course">Main Course</option>
                  <option value="Dessert">Dessert</option>
                  <option value="Beverage">Beverage</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Price</label>
                <input className="form-input" type="number" name="price" value={formData.price} onChange={handleInputChange} required />
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn-primary">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
