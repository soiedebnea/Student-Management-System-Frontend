import { useState, useEffect } from 'react';
import StudentForm from './components/StudentForm';
import StudentTable from './components/StudentTable';
import { getStudents, createStudent, updateStudent, deleteStudent } from './services/api';

export default function App() {
  const [students, setStudents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadStudents();
  }, []);

  async function loadStudents() {
    try {
      setLoading(true);
      const data = await getStudents();
      setStudents(data);
    } catch (err) {
      setError('Could not connect to the server. Is the backend running?');
    } finally {
      setLoading(false);
    }
  }

  async function handleSave(formData) {
    try {
      if (editingStudent) {
        const updated = await updateStudent(editingStudent._id, formData);
        setStudents(prev => prev.map(s => (s._id === updated._id ? updated : s)));
      } else {
        const created = await createStudent(formData);
        setStudents(prev => [created, ...prev]);
      }
      setShowForm(false);
      setEditingStudent(null);
    } catch (err) {
      alert(err.message);
    }
  }

  function handleEditClick(student) {
    setEditingStudent(student);
    setShowForm(true);
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this student?')) return;
    try {
      await deleteStudent(id);
      setStudents(prev => prev.filter(s => s._id !== id));
    } catch (err) {
      alert(err.message);
    }
  }

  function handleAddClick() {
    setEditingStudent(null);
    setShowForm(true);
  }

  function handleCancel() {
    setShowForm(false);
    setEditingStudent(null);
  }

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '2rem' }}>
      <div className="topbar">
        <div>
          <h2>Student Management System</h2>
          <p>Connected to MongoDB via Express API</p>
        </div>
        <button className="btn btn-primary" onClick={handleAddClick}>
          Add Student
        </button>
      </div>

      {error && (
        <div style={{ background: '#fee2e2', color: '#dc2626', padding: '1rem', borderRadius: '10px', margin: '1rem 0' }}>
          {error}
        </div>
      )}

      {showForm && (
        <StudentForm
          editingStudent={editingStudent}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}

      <div className="card">
        {loading ? (
          <p style={{ padding: '2rem', textAlign: 'center' }}>Loading students...</p>
        ) : (
          <StudentTable
            students={students}
            onEdit={handleEditClick}
            onDelete={handleDelete}
          />
        )}
      </div>
    </div>
  );
}
