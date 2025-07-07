import React, { useState, useMemo, useEffect } from 'react';
import Header from '../../components/nurse/Header';
import Footer from '../../components/nurse/Footer';
import '../../styles/MedicalSupplies.css';
import { createSupply, getAllMedicines, updateSupply, deleteSupply } from '../../api/medicineApi';

const mockSupplies = [
  { id: 1, name: 'Paracetamol 500mg', category: 'Sốt', quantity: 150, unit: 'viên', expiryDate: '2025-12-31', status: 'in_stock' },
  { id: 2, name: 'Terpin Codein', category: 'Ho', quantity: 80, unit: 'viên', expiryDate: '2024-10-31', status: 'in_stock' },
  { id: 3, name: 'Berberin', category: 'Tiêu hóa', quantity: 120, unit: 'viên', expiryDate: '2025-08-31', status: 'in_stock' },
  { id: 4, name: 'Oresol', category: 'Tiêu hóa', quantity: 45, unit: 'gói', expiryDate: '2026-01-31', status: 'in_stock' },
  { id: 5, name: 'Băng gạc y tế', category: 'Vật tư', quantity: 15, unit: 'cuộn', expiryDate: '2027-01-01', status: 'low_stock' },
  { id: 6, name: 'Nước muối sinh lý', category: 'Vật tư', quantity: 8, unit: 'chai', expiryDate: '2024-09-15', status: 'low_stock' },
  { id: 7, name: 'Cồn 90 độ', category: 'Vật tư', quantity: 0, unit: 'chai', expiryDate: '2025-05-31', status: 'out_of_stock' },
  { id: 8, name: 'Ibuprofen 400mg', category: 'Sốt', quantity: 90, unit: 'viên', expiryDate: '2023-11-30', status: 'expired' },
  { id: 9, name: 'Thuốc ho Prospan', category: 'Ho', quantity: 25, unit: 'chai', expiryDate: '2025-02-28', status: 'in_stock' },
  { id: 10, name: 'Băng cá nhân', category: 'Vật tư', quantity: 200, unit: 'cái', expiryDate: '2026-07-31', status: 'in_stock' },
];

const MedicalSupplies = () => {
  const [supplies, setSupplies] = useState(mockSupplies);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newSupplyData, setNewSupplyData] = useState({
    name: '',
    category: '',
    quantity: '',
    unit: '',
    expiryDate: '',
  });

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingSupply, setEditingSupply] = useState(null);

  const handleDeleteSupply = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
      try {
        await deleteSupply(id);
        setSupplies(prev => prev.filter(supply => supply.id !== id));
      } catch (error) {
        alert(error.message || 'Có lỗi khi xóa thuốc/vật tư');
      }
    }
  };

  const handleOpenAddModal = () => setIsAddModalOpen(true);

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
    setNewSupplyData({ name: '', category: '', quantity: '', unit: '', expiryDate: '' });
  };

  const handleNewSupplyInputChange = (e) => {
    const { name, value } = e.target;
    setNewSupplyData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddNewSupply = async (e) => {
    e.preventDefault();
    try {
      // Map dữ liệu đúng với entity backend
      const newSupply = {
        maThuoc: '', // để trống, backend sẽ tự sinh nếu cần
        ten: newSupplyData.name,
        lieuLuong: '', // hoặc lấy từ form nếu muốn
        donVi: newSupplyData.unit,
        moTa: newSupplyData.category,
        soLuong: Number(newSupplyData.quantity), // thêm số lượng
        hanSuDung: newSupplyData.expiryDate, // thêm hạn sử dụng
      };
      const created = await createSupply(newSupply);

      // Nếu backend trả về bản ghi vừa tạo, map lại và thêm vào danh sách
      // Nếu không, tự tạo object mới từ newSupplyData
      const newSupplyFrontend = {
        id: created?.maThuoc || Math.random().toString(36).substr(2, 9),
        name: newSupplyData.name,
        category: newSupplyData.category,
        quantity: Number(newSupplyData.quantity),
        unit: newSupplyData.unit,
        expiryDate: newSupplyData.expiryDate,
      };

      setSupplies(prev => [...prev, newSupplyFrontend]);
      handleCloseAddModal();
    } catch (error) {
      alert(error.message || 'Có lỗi khi thêm mới thuốc/vật tư');
    }
  };

  const handleOpenEditModal = (supply) => {
    setEditingSupply(supply);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEditingSupply(null);
  };

  const handleEditSupplyInputChange = (e) => {
    const { name, value } = e.target;
    setEditingSupply(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdateSupply = async (e) => {
    e.preventDefault();
    if (!editingSupply) return;
    try {
      // Map dữ liệu đúng với entity backend
      const updatedSupply = {
        maThuoc: editingSupply.id,
        ten: editingSupply.name,
        lieuLuong: '', // hoặc lấy từ form nếu muốn
        donVi: editingSupply.unit,
        moTa: editingSupply.category,
        soLuong: Number(editingSupply.quantity), // thêm số lượng
        hanSuDung: editingSupply.expiryDate, // thêm hạn sử dụng
      };
      await updateSupply(editingSupply.id, updatedSupply);

      // Cập nhật lại danh sách trên frontend (cách 1: reload lại toàn bộ)
      const medicinesFromServer = await getAllMedicines();
      setSupplies(medicinesFromServer.map(mapBackendToFrontend));
      handleCloseEditModal();
    } catch (error) {
      alert(error.message || 'Có lỗi khi cập nhật thuốc/vật tư');
    }
  };

  const filteredSupplies = useMemo(() => {
    return supplies
      .filter(supply => {
        // Filter by category
        if (categoryFilter !== 'all' && supply.category !== categoryFilter) {
          return false;
        }
        // Filter by status
        if (statusFilter !== 'all') {
          const today = new Date();
          const expiryDate = new Date(supply.expiryDate);
          
          let currentStatus;
          if (expiryDate < today) {
            currentStatus = 'expired';
          } else if (supply.quantity === 0) {
            currentStatus = 'out_of_stock';
          } else if (supply.quantity < 20) {
            currentStatus = 'low_stock';
          } else {
            currentStatus = 'in_stock';
          }
          
          if (statusFilter !== currentStatus) {
            return false;
          }
        }
        // Filter by search term
        if (searchTerm && !supply.name.toLowerCase().includes(searchTerm.toLowerCase())) {
          return false;
        }
        return true;
      });
  }, [supplies, searchTerm, categoryFilter, statusFilter]);

  const getStatusInfo = (supply) => {
    const today = new Date();
    const expiryDate = new Date(supply.expiryDate);

    if (expiryDate < today) return { text: 'Đã hết hạn', className: 'status-expired' };
    if (supply.quantity === 0) return { text: 'Hết hàng', className: 'status-out-of-stock' };
    if (supply.quantity < 20) return { text: 'Sắp hết hàng', className: 'status-low-stock' };
    return { text: 'Còn hàng', className: 'status-in-stock' };
  };
  
  const summaryData = useMemo(() => {
    const totalTypes = supplies.length;
    const lowStockCount = supplies.filter(s => s.quantity > 0 && s.quantity < 20).length;
    const expiredCount = supplies.filter(s => new Date(s.expiryDate) < new Date()).length;
    return { totalTypes, lowStockCount, expiredCount };
  }, [supplies]);

  const categories = useMemo(() => [...new Set(supplies.map(s => s.category))], [supplies]);

  // Hàm map dữ liệu từ backend về frontend
  function mapBackendToFrontend(thuoc) {
    return {
      id: thuoc.maThuoc,
      name: thuoc.ten,
      category: thuoc.moTa,
      quantity: thuoc.soLuong,
      unit: thuoc.donVi,
      expiryDate: thuoc.hanSuDung,
    };
  }

  // Load supplies từ backend khi mở trang hoặc sau khi thêm mới
  useEffect(() => {
    getAllMedicines().then(data => setSupplies(data.map(mapBackendToFrontend))).catch(() => setSupplies([]));
  }, []);

  return (
    <div className="nurse-layout">
      <Header />
      <main className="supplies-main">
        <div className="supplies-container">
          <h1 className="supplies-title">Quản lý Kho thuốc & Vật tư y tế</h1>
          
          <div className="summary-cards">
            <div className="summary-card">
              <div className="card-icon">📦</div>
              <div className="card-content">
                <h3>Tổng số loại</h3>
                <p>{summaryData.totalTypes}</p>
              </div>
            </div>
            <div className="summary-card low-stock">
              <div className="card-icon">⚠️</div>
              <div className="card-content">
                <h3>Sắp hết hàng</h3>
                <p>{summaryData.lowStockCount}</p>
              </div>
            </div>
            <div className="summary-card expired">
              <div className="card-icon">🚫</div>
              <div className="card-content">
                <h3>Đã hết hạn</h3>
                <p>{summaryData.expiredCount}</p>
              </div>
            </div>
          </div>

          <div className="supplies-toolbar">
            <div className="search-bar">
              <i className="fas fa-search"></i>
              <input 
                type="text" 
                placeholder="Tìm kiếm theo tên thuốc..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="filters">
              <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)}>
                <option value="all">Tất cả danh mục</option>
                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
              <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
                <option value="all">Tất cả trạng thái</option>
                <option value="in_stock">Còn hàng</option>
                <option value="low_stock">Sắp hết hàng</option>
                <option value="out_of_stock">Hết hàng</option>
                <option value="expired">Đã hết hạn</option>
              </select>
            </div>
            <button className="add-supply-btn" onClick={handleOpenAddModal}>
              <i className="fas fa-plus"></i> Thêm mới
            </button>
          </div>

          <div className="supplies-table-container">
            <table className="supplies-table">
              <thead>
                <tr>
                  <th>Tên sản phẩm</th>
                  <th>Danh mục</th>
                  <th>Số lượng</th>
                  <th>Hạn sử dụng</th>
                  <th>Trạng thái</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {filteredSupplies.length > 0 ? (
                  filteredSupplies.map(supply => {
                    const status = getStatusInfo(supply);
                    return (
                      <tr key={supply.id}>
                        <td>{supply.name}</td>
                        <td>{supply.category}</td>
                        <td>{supply.quantity} {supply.unit}</td>
                        <td>{new Date(supply.expiryDate).toLocaleDateString('vi-VN')}</td>
                        <td>
                          <span className={`status-badge ${status.className}`}>
                            {status.text}
                          </span>
                        </td>
                        <td>
                          <div className="action-buttons">
                            <button className="action-btn edit-btn" onClick={() => handleOpenEditModal(supply)}>
                              <i className="fas fa-edit"></i>
                            </button>
                            <button 
                              className="action-btn delete-btn" 
                              onClick={() => handleDeleteSupply(supply.id)}
                            >
                              <i className="fas fa-trash"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="6" className="no-results">Không tìm thấy sản phẩm nào.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {isAddModalOpen && (
            <div className="modal-overlay">
              <div className="modal-content">
                <div className="modal-header">
                  <h2>Thêm mới Thuốc/Vật tư</h2>
                  <button onClick={handleCloseAddModal} className="close-btn">✕</button>
                </div>
                <form onSubmit={handleAddNewSupply} className="modal-form">
                  <div className="form-group">
                    <label>Tên sản phẩm</label>
                    <input type="text" name="name" value={newSupplyData.name} onChange={handleNewSupplyInputChange} placeholder="VD: Paracetamol 500mg" required />
                  </div>
                  <div className="form-group">
                    <label>Danh mục</label>
                    <input type="text" name="category" value={newSupplyData.category} onChange={handleNewSupplyInputChange} placeholder="VD: Sốt, Ho, Vật tư..." required />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Số lượng</label>
                      <input type="number" name="quantity" value={newSupplyData.quantity} onChange={handleNewSupplyInputChange} required min="0" />
                    </div>
                    <div className="form-group">
                      <label>Đơn vị</label>
                      <input type="text" name="unit" value={newSupplyData.unit} onChange={handleNewSupplyInputChange} placeholder="VD: viên, chai, hộp..." required />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Hạn sử dụng</label>
                    <input type="date" name="expiryDate" value={newSupplyData.expiryDate} onChange={handleNewSupplyInputChange} required />
                  </div>
                  <div className="form-actions">
                    <button type="button" className="cancel-btn" onClick={handleCloseAddModal}>Hủy</button>
                    <button type="submit" className="submit-btn">Thêm vào kho</button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {isEditModalOpen && editingSupply && (
            <div className="modal-overlay">
              <div className="modal-content">
                <div className="modal-header">
                  <h2>Chỉnh sửa Thuốc/Vật tư</h2>
                  <button onClick={handleCloseEditModal} className="close-btn">✕</button>
                </div>
                <form onSubmit={handleUpdateSupply} className="modal-form">
                  <div className="form-group">
                    <label>Tên sản phẩm</label>
                    <input type="text" name="name" value={editingSupply.name} onChange={handleEditSupplyInputChange} required />
                  </div>
                  <div className="form-group">
                    <label>Danh mục</label>
                    <input type="text" name="category" value={editingSupply.category} onChange={handleEditSupplyInputChange} required />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Số lượng</label>
                      <input type="number" name="quantity" value={editingSupply.quantity} onChange={handleEditSupplyInputChange} required min="0" />
                    </div>
                    <div className="form-group">
                      <label>Đơn vị</label>
                      <input type="text" name="unit" value={editingSupply.unit} onChange={handleEditSupplyInputChange} required />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Hạn sử dụng</label>
                    <input type="date" name="expiryDate" value={editingSupply.expiryDate} onChange={handleEditSupplyInputChange} required />
                  </div>
                  <div className="form-actions">
                    <button type="button" className="cancel-btn" onClick={handleCloseEditModal}>Hủy</button>
                    <button type="submit" className="submit-btn">Lưu thay đổi</button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MedicalSupplies;







