const API_BASE_URL = 'http://localhost:8080/api';

export const parentApi = {
  // Lấy thông tin phụ huynh theo email
  getParentByEmail: async (email) => {
    try {
      const response = await fetch(`${API_BASE_URL}/phu-huynh/email/${email}`);
      if (!response.ok) {
        throw new Error('Không thể lấy thông tin phụ huynh');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching parent data:', error);
      throw error;
    }
  },

  // Lấy thông tin phụ huynh theo ID
  getParentById: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/phu-huynh/${id}`);
      if (!response.ok) {
        throw new Error('Không thể lấy thông tin phụ huynh');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching parent data:', error);
      throw error;
    }
  },

  // Cập nhật thông tin phụ huynh
  updateParent: async (id, parentData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/phu-huynh/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(parentData),
      });
      if (!response.ok) {
        throw new Error('Không thể cập nhật thông tin phụ huynh');
      }
      return await response.json();
    } catch (error) {
      console.error('Error updating parent data:', error);
      throw error;
    }
  },

  // Tạo phụ huynh mới
  createParent: async (parentData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/phu-huynh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(parentData),
      });
      if (!response.ok) {
        throw new Error('Không thể tạo phụ huynh mới');
      }
      return await response.json();
    } catch (error) {
      console.error('Error creating parent:', error);
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
    const response = await fetch(`${API_BASE_URL}/hoso-suckhoe/hocsinh/${studentId}`);
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