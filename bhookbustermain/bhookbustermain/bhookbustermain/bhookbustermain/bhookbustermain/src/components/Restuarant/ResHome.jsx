
import React, { useState, useEffect } from 'react';
// import Rnav from './Rnav';
// import Rsidebar from './Rsidebar';
import '../../assets/css/RDasboard/Rdashboard.css';
import { BarChart, LineChart, PieChart, Bar, Line, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, Users, ShoppingBag, DollarSign, Clipboard, Clock } from 'lucide-react';

const RDashboard = () => {
  // Sample data for charts and metrics
  const [salesData, setSalesData] = useState([
    { name: 'Mon', sales: 4000 },
    { name: 'Tue', sales: 3000 },
    { name: 'Wed', sales: 5000 },
    { name: 'Thu', sales: 2780 },
    { name: 'Fri', sales: 7800 },
    { name: 'Sat', sales: 9000 },
    { name: 'Sun', sales: 6300 },
  ]);

  const [orderData, setOrderData] = useState([
    { name: 'Completed', value: 65 },
    { name: 'Pending', value: 25 },
    { name: 'Cancelled', value: 10 },
  ]);

  const [popularItems, setPopularItems] = useState([
    { name: 'Pizza Margherita', count: 145, percentage: 22 },
    { name: 'Chicken Burger', count: 132, percentage: 20 },
    { name: 'Caesar Salad', count: 97, percentage: 15 },
    { name: 'Spaghetti Carbonara', count: 87, percentage: 13 },
    { name: 'Tiramisu', count: 78, percentage: 12 },
  ]);

  const [restaurants, setRestaurants] = useState([
    { id: 1, name: 'Bella Italia', location: 'Downtown', rating: 4.8, orders: 187, revenue: 8940 },
    { id: 2, name: 'Sushi Express', location: 'Westside', rating: 4.6, orders: 163, revenue: 7350 },
    { id: 3, name: 'Taco Heaven', location: 'Eastside', rating: 4.7, orders: 142, revenue: 6280 },
    { id: 4, name: 'Burger Joint', location: 'Northside', rating: 4.5, orders: 176, revenue: 7840 },
  ]);

  const [metrics, setMetrics] = useState({
    totalSales: 28950,
    salesGrowth: 24.8,
    totalOrders: 668,
    ordersGrowth: 12.5,
    totalCustomers: 412,
    customersGrowth: 8.3,
    avgOrderValue: 43.34,
    avgOrderGrowth: 5.7
  });

  const [isLoading, setIsLoading] = useState(true);

  // Simulate data loading
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="dashboard-container">
      {/* <Rnav /> */}
      {/* <Rsidebaar /> */}

      <div className="dashboard-content">
        {/* <Rsidebar /> */}
        <main className="main-content">
          {isLoading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Loading dashboard data...</p>
            </div>
          ) : (
            <>
              <div className="dashboard-header">
                <h1>Restaurant Dashboard</h1>
                <div className="date-filter">
                  <select defaultValue="7d">
                    <option value="24h">Last 24 hours</option>
                    <option value="7d">Last 7 days</option>
                    <option value="30d">Last 30 days</option>
                    <option value="90d">Last 90 days</option>
                  </select>
                </div>
              </div>

              <div className="metrics-container">
                <div className="metric-card">
                  <div className="metric-icon positive">
                    <DollarSign size={24} />
                  </div>
                  <div className="metric-details">
                    <h3>Total Sales</h3>
                    <p className="metric-value">${metrics.totalSales.toLocaleString()}</p>
                    <div className="metric-growth positive">
                      <TrendingUp size={16} />
                      <span>{metrics.salesGrowth}%</span>
                    </div>
                  </div>
                </div>

                <div className="metric-card">
                  <div className="metric-icon positive">
                    <ShoppingBag size={24} />
                  </div>
                  <div className="metric-details">
                    <h3>Total Orders</h3>
                    <p className="metric-value">{metrics.totalOrders}</p>
                    <div className="metric-growth positive">
                      <TrendingUp size={16} />
                      <span>{metrics.ordersGrowth}%</span>
                    </div>
                  </div>
                </div>

                <div className="metric-card">
                  <div className="metric-icon positive">
                    <Users size={24} />
                  </div>
                  <div className="metric-details">
                    <h3>Customers</h3>
                    <p className="metric-value">{metrics.totalCustomers}</p>
                    <div className="metric-growth positive">
                      <TrendingUp size={16} />
                      <span>{metrics.customersGrowth}%</span>
                    </div>
                  </div>
                </div>

                <div className="metric-card">
                  <div className="metric-icon positive">
                    <Clipboard size={24} />
                  </div>
                  <div className="metric-details">
                    <h3>Avg. Order Value</h3>
                    <p className="metric-value">${metrics.avgOrderValue}</p>
                    <div className="metric-growth positive">
                      <TrendingUp size={16} />
                      <span>{metrics.avgOrderGrowth}%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="chart-row">
                <div className="chart-container sales-chart">
                  <h2>Weekly Sales</h2>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={salesData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`$${value}`, 'Sales']} />
                      <Bar dataKey="sales" fill="#6366f1" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="chart-container order-chart">
                  <h2>Order Status</h2>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie 
                        data={orderData} 
                        cx="50%" 
                        cy="50%" 
                        innerRadius={60}
                        outerRadius={100} 
                        fill="#8884d8" 
                        dataKey="value"
                        label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {orderData.map((entry, index) => {
                          const COLORS = ['#4ade80', '#facc15', '#f87171'];
                          return <Pie key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />;
                        })}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="restaurants-section">
                <h2>Your Restaurants</h2>
                <div className="restaurants-grid">
                  {restaurants.map(restaurant => (
                    <div className="restaurant-card" key={restaurant.id}>
                      <div className="restaurant-header">
                        <h3>{restaurant.name}</h3>
                        <div className="rating">
                          <span className="star">★</span>
                          <span>{restaurant.rating}</span>
                        </div>
                      </div>
                      <p className="location">{restaurant.location}</p>
                      <div className="restaurant-stats">
                        <div className="stat">
                          <ShoppingBag size={16} />
                          <span>{restaurant.orders} orders</span>
                        </div>
                        <div className="stat">
                          <DollarSign size={16} />
                          <span>${restaurant.revenue}</span>
                        </div>
                      </div>
                      <button className="view-details">View Details</button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="chart-row">
                <div className="popular-items">
                  <h2>Popular Menu Items</h2>
                  <div className="items-list">
                    {popularItems.map((item, index) => (
                      <div className="popular-item" key={index}>
                        <div className="item-info">
                          <span className="item-rank">{index + 1}</span>
                          <div>
                            <h4>{item.name}</h4>
                            <span>{item.count} orders</span>
                          </div>
                        </div>
                        <div className="item-percentage">
                          <div className="percentage-bar">
                            <div 
                              className="percentage-fill" 
                              style={{ width: `${item.percentage}%` }}
                            ></div>
                          </div>
                          <span>{item.percentage}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="recent-orders">
                  <div className="orders-header">
                    <h2>Recent Orders</h2>
                    <button className="view-all">View All</button>
                  </div>
                  <div className="orders-list">
                    <div className="order-item">
                      <div className="order-info">
                        <h4>Order #12345</h4>
                        <span className="status completed">Completed</span>
                      </div>
                      <div className="order-details">
                        <div>
                          <p>Customer: John Doe</p>
                          <p>Items: 4</p>
                        </div>
                        <div>
                          <p>$78.50</p>
                          <p className="time">
                            <Clock size={14} />
                            <span>10 min ago</span>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="order-item">
                      <div className="order-info">
                        <h4>Order #12344</h4>
                        <span className="status pending">Preparing</span>
                      </div>
                      <div className="order-details">
                        <div>
                          <p>Customer: Sarah Miller</p>
                          <p>Items: 2</p>
                        </div>
                        <div>
                          <p>$32.75</p>
                          <p className="time">
                            <Clock size={14} />
                            <span>25 min ago</span>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="order-item">
                      <div className="order-info">
                        <h4>Order #12343</h4>
                        <span className="status completed">Completed</span>
                      </div>
                      <div className="order-details">
                        <div>
                          <p>Customer: Mike Johnson</p>
                          <p>Items: 3</p>
                        </div>
                        <div>
                          <p>$45.20</p>
                          <p className="time">
                            <Clock size={14} />
                            <span>45 min ago</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default RDashboard;


