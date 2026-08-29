// ============================================================
// STUDENT FORM COMPONENT
// ============================================================
// A reusable form used for BOTH adding and editing students.
// The parent (App.jsx) tells it whether we're editing via
// the `editingStudent` prop.
// ============================================================

import { useState, useEffect } from 'react';

export default function StudentForm({ editingStudent, onSave, onCancel }) {
  // Local state for the form fields
  const [form, setForm] = useState({
    name: '', roll: '', email: '', phone: '',
    dept: '', year: '', grade: '', status: '',
  });

  // useEffect runs whenever `editingStudent` changes.
  // If we're editing, pre-fill the form with that student's data.
  // If we're adding (editingStudent is null), reset the form.
  useEffect(() => {
    if (editingStudent) {
      setForm({
        name: editingStudent.name,
        roll: editingStudent.roll,
        email: editingStudent.email,
        phone: editingStudent.phone || '',
        dept: editingStudent.dept,
        year: editingStudent.year,
        grade: editingStudent.grade,
        status: editingStudent.status,
      });
    } else {
      setForm({ name:'', roll:'', email:'', phone:'', dept:'', year:'', grade:'', status:'' });
    }
  }, [editingStudent]);

  // Generic change handler — works for every input using its `name` attribute
  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault(); // stop the browser's default page-reload behavior
    onSave({ ...form, grade: parseFloat(form.grade) });
  }

  return (
    <div className="card" style={{ marginBottom: '1.5rem' }}>
      <div className="card-header">
        <h3>
          <i className={editingStudent ? 'fas fa-pen' : 'fas fa-user-plus'}></i>
          {editingStudent ? ' Edit Student' : ' Add New Student'}
        </h3>
        <button className="icon-btn" onClick={onCancel}><i className="fas fa-xmark"></i></button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-grid">

          <div className="form-group">
            <label>Full Name *</label>
            <input name="name" value={form.name} onChange={handleChange} placeholder="e.g. Rahim Uddin" required />
          </div>

          <div className="form-group">
            <label>Student ID *</label>
            <input
              name="roll"
              value={form.roll}
              onChange={handleChange}
              placeholder="e.g. STD-2024-001"
              required
              disabled={!!editingStudent}
              // disabled={!!editingStudent} → can't change ID while editing
            />
          </div>

          <div className="form-group">
            <label>Email *</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="rahim@edu.com" required />
          </div>

          <div className="form-group">
            <label>Phone</label>
            <input name="phone" value={form.phone} onChange={handleChange} placeholder="+8801700000000" />
          </div>

          <div className="form-group">
            <label>Department *</label>
            <select name="dept" value={form.dept} onChange={handleChange} required>
              <option value="">Choose department…</option>
              <option value="CSE">Computer Science (CSE)</option>
              <option value="EEE">Electrical Engineering (EEE)</option>
              <option value="BBA">Business Administration (BBA)</option>
              <option value="ENG">English Literature</option>
              <option value="MED">Medical Science</option>
              <option value="LAW">Law</option>
            </select>
          </div>

          <div className="form-group">
            <label>Year *</label>
            <select name="year" value={form.year} onChange={handleChange} required>
              <option value="">Choose year…</option>
              <option value="1st Year">1st Year</option>
              <option value="2nd Year">2nd Year</option>
              <option value="3rd Year">3rd Year</option>
              <option value="4th Year">4th Year</option>
            </select>
          </div>

          <div className="form-group">
            <label>CGPA *</label>
            <input type="number" name="grade" value={form.grade} onChange={handleChange} min="0" max="4" step="0.01" required />
          </div>

          <div className="form-group">
            <label>Status *</label>
            <select name="status" value={form.status} onChange={handleChange} required>
              <option value="">Choose status…</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Graduated">Graduated</option>
              <option value="Suspended">Suspended</option>
            </select>
          </div>

        </div>

        <div className="form-footer">
          <button type="button" className="btn btn-ghost" onClick={onCancel}>Cancel</button>
          <button type="submit" className="btn btn-primary">Save Student</button>
        </div>
      </form>
    </div>
  );
}