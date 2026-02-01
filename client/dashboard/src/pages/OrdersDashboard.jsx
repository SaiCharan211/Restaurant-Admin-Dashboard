import { useEffect, useState } from "react";
import axios from "axios";

export default function OrdersDashboard() {
  const [orders, setOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10; // Items per page

  useEffect(() => {
    fetchOrders();
  }, [page, statusFilter]);

  const fetchOrders = async () => {
    try {
      let url = `/api/orders?page=${page}&limit=${limit}`;
      if (statusFilter) url += `&status=${statusFilter}`;
      
      const res = await axios.get(url);
      // Fix: Ensure response is an array before setting state
      if (Array.isArray(res.data)) {
        setOrders(res.data);
      } else {
        setOrders([]);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      setOrders([]);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      await axios.patch(`/api/orders/${id}/status`, { status: newStatus });
      setOrders((prev) =>
        prev.map((order) =>
          order._id === id ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <div className="dashboard-container">
      <h1 className="page-title">
        Kitchen <span className="highlight">Orders</span>
      </h1>

      <div className="controls-bar">
        <select className="filter-select" value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}>
          <option value="">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Preparing">Preparing</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      <div className="grid-layout">
        {orders.map((order) => (
          <div key={order._id} className="card">
            {/* Card Header */}
            <div className="card-header">
              <div className="order-meta">
                <span className="order-number">#{order.orderNumber}</span>
                <span className="table-info">Table {order.tableNumber}</span>
              </div>
              <span className={`status-badge status-${order.status}`}>
                {order.status}
              </span>
            </div>
            
            {/* Order Items */}
            <div className="order-items-list">
              {order.items.map((item, index) => (
                <div key={index} className="order-item-row">
                  <div>
                    <span className="qty-box">{item.quantity}</span>
                    <span>{item.menuItem?.name || "Unknown Item"}</span>
                  </div>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            {/* Card Footer */}
            <div className="order-footer">
              <div className="total-section">
                <span className="total-label">Total</span>
                <span className="total-value">${order.totalAmount}</span>
              </div>
              <select
                value={order.status}
                onChange={(e) => updateStatus(order._id, e.target.value)}
                className="status-dropdown"
              >
                <option value="Pending">Pending</option>
                <option value="Preparing">Preparing</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="pagination">
        <button className="page-btn" disabled={page === 1} onClick={() => setPage(p => p - 1)}>Previous</button>
        <span>Page {page}</span>
        <button className="page-btn" disabled={orders.length < limit} onClick={() => setPage(p => p + 1)}>Next</button>
      </div>
    </div>
  );
}