const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:8080/api';

export const createMedicineRequest = async (requestData) => {
  try {
    const response = await fetch(`${API_BASE}/yeu-cau-thuoc`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Có lỗi xảy ra khi tạo yêu cầu thuốc');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error creating medicine request:', error);
    throw error;
  }
};

export const getMedicineRequestsByParent = async (maPhuHuynh) => {
  try {
    const response = await fetch(`${API_BASE}/yeu-cau-thuoc/phu-huynh/${maPhuHuynh}`);
    
    if (!response.ok) {
      throw new Error('Không thể lấy danh sách yêu cầu thuốc');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching medicine requests:', error);
    throw error;
  }
};

export const getMedicineRequestsByStudent = async (maHocSinh) => {
  try {
    const response = await fetch(`${API_BASE}/yeu-cau-thuoc/hoc-sinh/${maHocSinh}`);
    
    if (!response.ok) {
      throw new Error('Không thể lấy danh sách yêu cầu thuốc');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching medicine requests:', error);
    throw error;
  }
};

export const updateMedicineRequest = async (maYeuCau, requestData) => {
  try {
    const response = await fetch(`${API_BASE}/yeu-cau-thuoc/${maYeuCau}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Có lỗi xảy ra khi cập nhật yêu cầu thuốc');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error updating medicine request:', error);
    throw error;
  }
};

export const deleteMedicineRequest = async (maYeuCau) => {
  try {
    const response = await fetch(`${API_BASE}/yeu-cau-thuoc/${maYeuCau}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Có lỗi xảy ra khi xóa yêu cầu thuốc');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error deleting medicine request:', error);
    throw error;
  }
};

export const searchMedicines = async (keyword) => {
  try {
    const response = await fetch(`${API_BASE}/yeu-cau-thuoc/thuoc/search?keyword=${encodeURIComponent(keyword)}`);
    
    if (!response.ok) {
      throw new Error('Không thể tìm kiếm thuốc');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error searching medicines:', error);
    throw error;
  }
};

export const getAllMedicines = async () => {
  try {
    const response = await fetch(`${API_BASE}/yeu-cau-thuoc/thuoc`);
    
    if (!response.ok) {
      throw new Error('Không thể lấy danh sách thuốc');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching medicines:', error);
    throw error;
  }
};
