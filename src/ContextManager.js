// React class with CRUD methods for a generic context object



const API_URL = 'http://localhost:3001/people';

class ContextManager {
  // Create
  async create(item) {
    // Define all possible fields
    const allFields = [
      'firstname',
      'lastname',
      'birthdate',
      'children',
      'spouse',
      'father',
      'mother'
    ];
    const newItem = { ...item };
    for (const field of allFields) {
      if (!(field in newItem)) {
        // children should default to []
        newItem[field] = field === 'children' ? [] : null;
      }
    }
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newItem)
    });
    return await res.json();
  }

  // Read (all or by id)
  async read(id = null) {
    if (id === null) {
      const res = await fetch(API_URL);
      return await res.json();
    } else {
      const res = await fetch(`${API_URL}/${id}`);
      if (!res.ok) return null;
      return await res.json();
    }
  }

  // Update by id
  async update(id, updates) {
    const res = await fetch(`${API_URL}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    });
    if (!res.ok) return null;
    return await res.json();
  }

  // Delete by id
  async delete(id) {
    const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    return res.ok;
  }
}

export { ContextManager };
