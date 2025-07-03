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