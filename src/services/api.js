// ============================================================
// API SERVICE
// ============================================================
// This file is the ONLY place in the entire frontend that
// knows the backend's URL. Every component imports functions
// from here instead of calling fetch() directly.
//
// WHY? If the backend URL ever changes (e.g. when you deploy
// to a real server), you only update it in ONE place.
// ============================================================

const API_URL = 'http://localhost:5000/api/students';

// ── GET all students ──
export async function getStudents() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error('Failed to fetch students');
  return res.json();
}

// ── CREATE a new student ──
export async function createStudent(studentData) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(studentData),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'Failed to create student');
  }
  return res.json();
}

// ── UPDATE an existing student ──
export async function updateStudent(id, studentData) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(studentData),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'Failed to update student');
  }
  return res.json();
}

// ── DELETE a student ──
export async function deleteStudent(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete student');
  return res.json();
}