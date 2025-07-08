import React, { useEffect, useState } from 'react';
import { fetchStudents } from '../../api/studentApi';

function StudentList() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchStudents();
        setStudents(data);
      } catch (error) {
        alert("Không thể tải dữ liệu.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <p>Đang tải...</p>;

  return (
    <div>
      <h2>Danh sách học sinh</h2>
      <ul>
        {students.map((s) => (
          <li key={s.maHocSinh}>{s.hoTen} - {s.lop}</li>
        ))}
      </ul>
    </div>
  );
}

export default StudentList;
