// React class with CRUD methods for a generic context object
// Initial context data for a family tree

const initialContext = [
  {
    id: "1",
    firstname: "John",
    lastname: "Doe",
    birthdate: "1980-01-01",
    children: ["2", "3"],
    spouse: "4",
    father: "5",
    mother: "6"
  },
  {
    id: "2",
    firstname: "Jane",
    lastname: "Doe",
    birthdate: "2010-05-12",
    children: [],
    spouse: null,
    father: "1",
    mother: "4"
  },
  {
    id: "3",
    firstname: "Jack",
    lastname: "Doe",
    birthdate: "2012-08-20",
    children: [],
    spouse: null,
    father: "1",
    mother: "4"
  },
  {
    id: "4",
    firstname: "Mary",
    lastname: "Doe",
    birthdate: "1982-03-15",
    children: ["2", "3"],
    spouse: "1",
    father: null,
    mother: null
  },
  {
    id: "5",
    firstname: "Robert",
    lastname: "Doe",
    birthdate: "1950-11-11",
    children: ["1"],
    spouse: null,
    father: null,
    mother: null
  },
  {
    id: "6",
    firstname: "Linda",
    lastname: "Doe",
    birthdate: "1952-07-07",
    children: ["1"],
    spouse: null,
    father: null,
    mother: null
  }
];

class ContextManager {
  constructor(initialData = []) {
    this.data = initialData;
    this.nextId = initialData.length > 0 ? Math.max(...initialData.map(item => parseInt(item.id, 10) || 0)) + 1 : 1;
  }

  // Create
  create(item) {
    const newItem = { ...item, id: String(this.nextId++) };
    this.data.push(newItem);
    return newItem;
  }

  // Read (all or by id)
  read(id = null) {
    if (id === null) return this.data;
    return this.data.find(item => item.id === id) || null;
  }

  // Update by id
  update(id, updates) {
    const idx = this.data.findIndex(item => item.id === id);
    if (idx === -1) return null;
    this.data[idx] = { ...this.data[idx], ...updates };
    return this.data[idx];
  }

  // Delete by id
  delete(id) {
    const idx = this.data.findIndex(item => item.id === id);
    if (idx === -1) return false;
    this.data.splice(idx, 1);
    return true;
  }
}

export { ContextManager, initialContext };
