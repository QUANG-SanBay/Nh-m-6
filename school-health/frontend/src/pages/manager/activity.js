import React, { useState } from 'react';

const Activity = () => {
  const [activity, setActivity] = useState('');
  const [activities, setActivities] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (activity.trim() === '') return;
    setActivities([...activities, activity]);
    setActivity('');
  };

  return (
    <div className="page-container">
      <h1>Theo dõi hoạt động phòng y tế</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={activity}
          onChange={(e) => setActivity(e.target.value)}
          placeholder="Nhập tên hoạt động"
        />
        <button type="submit">Thêm hoạt động</button>
      </form>
      <ul>
        {activities.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default Activity;
