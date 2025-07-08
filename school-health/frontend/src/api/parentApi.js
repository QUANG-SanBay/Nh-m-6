const API_BASE_URL = 'http://localhost:8080/api';

export const parentApi = {
  // Lấy thông tin phụ huynh theo email
  getParentByEmail: async (email) => {
    try {
      console.log('API Call: getParentByEmail with email:', email);
      const url = `${API_BASE_URL}/phu-huynh/email/${encodeURIComponent(email)}`;
      console.log('API URL:', url);
      
      const response = await fetch(url);
      console.log('API Response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error Response:', errorText);
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }
      
      const data = await response.json();
      console.log('API Response data:', data);
      return data;
    } catch (error) {
      console.error('Error in getParentByEmail:', error);
      throw error;
    }
  },

  // Lấy thông tin phụ huynh theo username
  getParentByUsername: async (username) => {
    try {
      console.log('API Call: getParentByUsername with username:', username);
      const url = `${API_BASE_URL}/phu-huynh/username/${encodeURIComponent(username)}`;
      console.log('API URL:', url);
      
      const response = await fetch(url);
      console.log('API Response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error Response:', errorText);
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }
      
      const data = await response.json();
      console.log('API Response data:', data);
      return data;
    } catch (error) {
      console.error('Error in getParentByUsername:', error);
      throw error;
    }
  },

  // Lấy thông tin phụ huynh theo ID
  getParentById: async (id) => {
    try {
      console.log('API Call: getParentById with id:', id);
      const response = await fetch(`${API_BASE_URL}/phu-huynh/${id}`);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error Response:', errorText);
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }
      
      const data = await response.json();
      console.log('API Response data:', data);
      return data;
    } catch (error) {
      console.error('Error in getParentById:', error);
      throw error;
    }
  },

  // Cập nhật thông tin phụ huynh
  updateParent: async (id, parentData) => {
    try {
      console.log('API Call: updateParent with id:', id, 'data:', parentData);
      const response = await fetch(`${API_BASE_URL}/phu-huynh/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(parentData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('API Error Response:', errorData);
        throw new Error(errorData.error || 'Không thể cập nhật thông tin phụ huynh');
      }
      
      const data = await response.json();
      console.log('API Response data:', data);
      return data;
    } catch (error) {
      console.error('Error in updateParent:', error);
      throw error;
    }
  },

  // Tạo phụ huynh mới
  createParent: async (parentData) => {
    try {
      console.log('API Call: createParent with data:', parentData);
      const response = await fetch(`${API_BASE_URL}/phu-huynh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(parentData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('API Error Response:', errorData);
        throw new Error(errorData.error || 'Không thể tạo phụ huynh mới');
      }
      
      const data = await response.json();
      console.log('API Response data:', data);
      return data;
    } catch (error) {
      console.error('Error in createParent:', error);
      throw error;
    }
  },

  // Lấy danh sách học sinh của phụ huynh
  getHocSinhByPhuHuynh: async (maPhuHuynh) => {
    try {
      const response = await fetch(`${API_BASE_URL}/phu-huynh-hoc-sinh/phu-huynh/${maPhuHuynh}/hoc-sinh`);
      if (!response.ok) {
        throw new Error('Không thể lấy danh sách học sinh');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching students:', error);
      throw error;
    }
  },

  // Lấy danh sách học sinh với thông tin chi tiết của phụ huynh
  getHocSinhDetailByPhuHuynh: async (maPhuHuynh) => {
    try {
      const response = await fetch(`${API_BASE_URL}/phu-huynh-hoc-sinh/phu-huynh/${maPhuHuynh}/hoc-sinh-detail`);
      if (!response.ok) {
        throw new Error('Không thể lấy thông tin chi tiết học sinh');
      }
      const result = await response.json();
      return result.data || result;
    } catch (error) {
      console.error('Error fetching detailed students:', error);
      throw error;
    }
  },

  // Lấy thống kê học sinh của phụ huynh
  getThongKeHocSinh: async (maPhuHuynh) => {
    try {
      const response = await fetch(`${API_BASE_URL}/phu-huynh-hoc-sinh/phu-huynh/${maPhuHuynh}/thong-ke`);
      if (!response.ok) {
        throw new Error('Không thể lấy thống kê học sinh');
      }
      const result = await response.json();
      return result.data || result;
    } catch (error) {
      console.error('Error fetching student statistics:', error);
      throw error;
    }
  }
};
export const sendMedicineRequest = async (data) => {
  const response = await fetch('http://localhost:8080/api/prescription-requests', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!response.ok) throw new Error('Gửi yêu cầu thất bại');
  return await response.json();
};

// cập nhật hồ sơ sức khỏe
export const updateHealthInfo = async (healthData) => {
  try {
    // Validate dữ liệu
    if (!healthData.hocSinh || !healthData.hocSinh.maHocSinh) {
      throw new Error('Thiếu thông tin mã học sinh');
    }
    
    // Chuẩn bị dữ liệu gửi lên server
    const dataToSend = {
      hocSinh: {
        maHocSinh: healthData.hocSinh.maHocSinh,
        hoTen: healthData.hocSinh.hoTen,
        ngaySinh: healthData.hocSinh.ngaySinh,
        gioiTinh: healthData.hocSinh.gioiTinh,
        lop: healthData.hocSinh.lop,
        diaChi: healthData.hocSinh.diaChi
      },
      chieuCao: parseFloat(healthData.chieuCao) || 0,
      canNang: parseFloat(healthData.canNang) || 0,
      thiLuc: healthData.thiLuc || '',
      thinhLuc: healthData.thinhLuc || '',
      ketQuaRangMieng: healthData.ketQuaRangMieng || '',
      diUng: healthData.diUng || '',
      benhManTinh: healthData.benhManTinh || '',
      tienSuDieuTri: healthData.tienSuDieuTri || '',
      ghiChu: healthData.ghiChu || '',
      anhHocSinh: healthData.anhHocSinh || null
    };
    
    const response = await fetch(`${API_BASE_URL}/hoso-suckhoe`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(dataToSend),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Không thể cập nhật hồ sơ sức khỏe');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error updating health info:', error);
    throw error;
  }
};

// Lấy thông tin hồ sơ sức khỏe theo mã học sinh
export const getHealthInfoByStudentId = async (studentId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/hoso-suckhoe/hocsinh/${studentId}/for-parent`);
    if (!response.ok) {
      throw new Error('Không thể lấy thông tin hồ sơ sức khỏe');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching health info:', error);
    throw error;
  }
};

// Liên kết phụ huynh và học sinh
export const linkPhuHuynhToHocSinh = async (maHocSinh, maPhuHuynh) => {
  try {
    const response = await fetch(`${API_BASE_URL}/phu-huynh-hoc-sinh/link`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        maHocSinh,
        maPhuHuynh
      }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Không thể liên kết phụ huynh và học sinh');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error linking parent to student:', error);
    throw error;
  }
};

// Liên kết bằng email
export const linkByEmail = async (maHocSinh, email) => {
  try {
    const response = await fetch(`${API_BASE_URL}/phu-huynh-hoc-sinh/link-by-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        maHocSinh,
        email
      }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Không thể liên kết phụ huynh và học sinh');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error linking by email:', error);
    throw error;
  }
};

// Lấy danh sách học sinh của phụ huynh
export const getHocSinhByPhuHuynh = async (maPhuHuynh) => {
  try {
    const response = await fetch(`${API_BASE_URL}/phu-huynh-hoc-sinh/phu-huynh/${maPhuHuynh}/hoc-sinh`);
    if (!response.ok) {
      throw new Error('Không thể lấy danh sách học sinh');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching students:', error);
    throw error;
  }
};

// Lấy danh sách học sinh với thông tin chi tiết của phụ huynh
export const getHocSinhDetailByPhuHuynh = async (maPhuHuynh) => {
  try {
    const response = await fetch(`${API_BASE_URL}/phu-huynh-hoc-sinh/phu-huynh/${maPhuHuynh}/hoc-sinh-detail`);
    if (!response.ok) {
      throw new Error('Không thể lấy thông tin chi tiết học sinh');
    }
    const result = await response.json();
    return result.data || result;
  } catch (error) {
    console.error('Error fetching detailed students:', error);
    throw error;
  }
};

// Lấy thống kê học sinh của phụ huynh
export const getThongKeHocSinh = async (maPhuHuynh) => {
  try {
    const response = await fetch(`${API_BASE_URL}/phu-huynh-hoc-sinh/phu-huynh/${maPhuHuynh}/thong-ke`);
    if (!response.ok) {
      throw new Error('Không thể lấy thống kê học sinh');
    }
    const result = await response.json();
    return result.data || result;
  } catch (error) {
    console.error('Error fetching student statistics:', error);
    throw error;
  }
};
