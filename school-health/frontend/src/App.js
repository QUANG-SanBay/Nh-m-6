import React, { useEffect, useState } from 'react';
import { fetchStudents } from './api/studentApi';

function App() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchStudents()
      .then(data => setStudents(data))
      .catch(error => console.error("Lỗi:", error));
  }, []);

  return (
    <div>
      <h1>Danh sách học sinh</h1>
      <ul>
        {students.map(s => (
          <li key={s.id}>{s.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;