// ============================================================
// STUDENT TABLE COMPONENT
// ============================================================
// Pure "presentational" component — it just receives data
// and callback functions as props, and renders rows.
// It doesn't know HOW editing/deleting works, only that
// clicking a button should call the function it was given.
// ============================================================

export default function StudentTable({ students, onEdit, onDelete }) {
  if (students.length === 0) {
    return (
      <div className="empty-state">
        <i className="fas fa-user-graduate empty-ico"></i>
        <h3>No students found</h3>
        <p>Click "Add Student" to create your first record.</p>
      </div>
    );
  }

  return (
    <div className="table-wrap">
      <table className="tbl">
        <thead>
          <tr>
            <th>Name</th>
            <th>Student ID</th>
            <th>Department</th>
            <th>CGPA</th>
            <th>Year</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/*
            .map() loops over the students array and returns
            one <tr> per student. The `key` prop is REQUIRED
            by React — it helps React track which row is which
            when the list changes (add/remove/reorder).
          */}
          {students.map(s => (
            <tr key={s._id}>
              <td>
                <strong>{s.name}</strong><br />
                <span style={{ fontSize:'0.75rem', color:'#94a3b8' }}>{s.email}</span>
              </td>
              <td><code>{s.roll}</code></td>
              <td>{s.dept}</td>
              <td>{Number(s.grade).toFixed(2)}</td>
              <td>{s.year}</td>
              <td>
                <span className={`badge badge-${s.status.toLowerCase()}`}>{s.status}</span>
              </td>
              <td>
                <div className="action-cell">
                  {/*
                    onClick={() => onEdit(s)}  → arrow function so we can
                    PASS the student object when clicked.
                    Without the arrow function, onEdit would run
                    immediately on render instead of on click.
                  */}
                  <button className="btn btn-sm btn-edit" onClick={() => onEdit(s)}>
                    <i className="fas fa-pen"></i> Edit
                  </button>
                  <button className="btn btn-sm btn-del" onClick={() => onDelete(s._id)}>
                    <i className="fas fa-trash"></i> Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}