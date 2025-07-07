import React, { useState } from 'react';
import Header from '../../components/manager/Header';
import Footer from '../../components/manager/Footer';
import '../../styles/MedicalExam.css';

const initialExam = {
  name: 'Nguyễn Văn A',
  studentId: 'HS001',
  class: '10A1',
  dateOfBirth: '2008-05-15',
  gender: 'Nam',
  examDate: new Date().toISOString().slice(0, 10),
  height: '',
  weight: '',
  bmi: '',
  bloodPressure: '',
  heartRate: '',
  visionLeft: '',
  visionRight: '',
  teeth: '',
  dermatology: '',
  ent: '',
  heartLung: '',
  notes: ''
};

const MedicalExam = () => {
  const [exam, setExam] = useState(initialExam);
  const [isEditing, setIsEditing] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newExam = { ...exam, [name]: value };
    // Tự động tính BMI nếu chiều cao và cân nặng hợp lệ
    if (name === 'height' || name === 'weight') {
      const height = parseFloat(name === 'height' ? value : newExam.height);
      const weight = parseFloat(name === 'weight' ? value : newExam.weight);
      if (height > 0 && weight > 0) {
        const bmi = (weight / ((height / 100) ** 2)).toFixed(2);
        newExam.bmi = bmi;
      } else {
        newExam.bmi = '';
      }
    }
    setExam(newExam);
  };

  const handleSave = () => {
    setIsEditing(false);
    alert('Đã lưu thông tin kiểm tra y tế!');
  };

  const handleEdit = () => setIsEditing(true);
  const handleCancel = () => {
    setExam(initialExam);
    setIsEditing(false);
  };

  return (
    <div className="nurse-layout">
      <Header />
      <main className="medical-exam-main">
        <div className="medical-exam-container">
          <h1 className="title">Kiểm tra y tế học sinh</h1>
          <form className="medical-exam-form" onSubmit={e => e.preventDefault()}>
            <div className="info-row">
              <div>
                <label>Họ và tên</label>
                <input type="text" name="name" value={exam.name} onChange={handleChange} disabled={!isEditing} />
              </div>
              <div>
                <label>Mã học sinh</label>
                <input type="text" name="studentId" value={exam.studentId} onChange={handleChange} disabled={!isEditing} />
              </div>
              <div>
                <label>Lớp</label>
                <input type="text" name="class" value={exam.class} onChange={handleChange} disabled={!isEditing} />
              </div>
              <div>
                <label>Ngày sinh</label>
                <input type="date" name="dateOfBirth" value={exam.dateOfBirth} onChange={handleChange} disabled={!isEditing} />
              </div>
              <div>
                <label>Giới tính</label>
                <select name="gender" value={exam.gender} onChange={handleChange} disabled={!isEditing}>
                  <option value="Nam">Nam</option>
                  <option value="Nữ">Nữ</option>
                </select>
              </div>
              <div>
                <label>Ngày kiểm tra</label>
                <input type="date" name="examDate" value={exam.examDate} onChange={handleChange} disabled={!isEditing} />
              </div>
            </div>
            <div className="info-row">
              <div>
                <label>Chiều cao (cm)</label>
                <input type="number" name="height" value={exam.height} onChange={handleChange} disabled={!isEditing} />
              </div>
              <div>
                <label>Cân nặng (kg)</label>
                <input type="number" name="weight" value={exam.weight} onChange={handleChange} disabled={!isEditing} />
              </div>
              <div>
                <label>BMI</label>
                <input type="text" name="bmi" value={exam.bmi} disabled readOnly />
              </div>
              <div>
                <label>Huyết áp</label>
                <input type="text" name="bloodPressure" value={exam.bloodPressure} onChange={handleChange} disabled={!isEditing} placeholder="VD: 120/80" />
              </div>
              <div>
                <label>Nhịp tim</label>
                <input type="number" name="heartRate" value={exam.heartRate} onChange={handleChange} disabled={!isEditing} />
              </div>
            </div>
            <div className="info-row">
              <div>
                <label>Thị lực (trái)</label>
                <input type="text" name="visionLeft" value={exam.visionLeft} onChange={handleChange} disabled={!isEditing} placeholder="VD: 10/10" />
              </div>
              <div>
                <label>Thị lực (phải)</label>
                <input type="text" name="visionRight" value={exam.visionRight} onChange={handleChange} disabled={!isEditing} placeholder="VD: 10/10" />
              </div>
              <div>
                <label>Răng miệng</label>
                <input type="text" name="teeth" value={exam.teeth} onChange={handleChange} disabled={!isEditing} />
              </div>
              <div>
                <label>Da liễu</label>
                <input type="text" name="dermatology" value={exam.dermatology} onChange={handleChange} disabled={!isEditing} />
              </div>
              <div>
                <label>Tai mũi họng</label>
                <input type="text" name="ent" value={exam.ent} onChange={handleChange} disabled={!isEditing} />
              </div>
              <div>
                <label>Tim phổi</label>
                <input type="text" name="heartLung" value={exam.heartLung} onChange={handleChange} disabled={!isEditing} />
              </div>
            </div>
            <div className="info-row">
              <div style={{width: '100%'}}>
                <label>Ghi chú khác</label>
                <textarea name="notes" value={exam.notes} onChange={handleChange} disabled={!isEditing} rows={3} />
              </div>
            </div>
            <div className="exam-action-buttons">
              {isEditing ? (
                <>
                  <button type="button" className="btn-black" onClick={handleSave}>Lưu</button>
                  <button type="button" className="btn-black" onClick={handleCancel}>Hủy</button>
                </>
              ) : (
                <button type="button" className="btn-blue" onClick={handleEdit}>Chỉnh sửa</button>
              )}
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MedicalExam; 