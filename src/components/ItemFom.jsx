import React, { useState, useEffect } from "react";
import { CreateItem, GetItems, UpdateItem, DeleteItem } from "../Api/allApi";

const ItemForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await GetItems();
        if (response.status >= 200 && response.status < 300) {
          setItems(response.data);
        } else {
          console.error("Failed to fetch items");
        }
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItems();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const fullData = { name, description };

    try {
      if (editingItem) {
        const response = await UpdateItem(editingItem.id, fullData);

        if (response.status >= 200 && response.status < 300) {
          alert('Item updated successfully');
          setItems(items.map(item => item.id === editingItem.id ? response.data : item));
          setEditingItem(null);
        } else {
          alert("Something went wrong");
        }
      } else {
        const response = await CreateItem(fullData);

        if (response.status >= 200 && response.status < 300) {
          alert('Item created successfully');
          setItems([...items, response.data]);
        } else {
          alert("Something went wrong");
        }
      }

      setName("");
      setDescription("");
    } catch (error) {
      console.error("Error creating/updating item:", error);
      alert("Something went wrong");
    }
  };

  const handleEdit = (item) => {
    setName(item.name);
    setDescription(item.description);
    setEditingItem(item);
  };

  const handleDelete = async (id) => {
    try {
      const response = await DeleteItem(id);

      if (response.status >= 200 && response.status < 300) {
        alert('Item deleted successfully');
        setItems(items.filter(item => item.id !== id));
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      console.error("Error deleting item:", error);
      alert("Something went wrong");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>Description:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button type="submit">{editingItem ? "Update Item" : "Create Item"}</button>
      </form>

      <h2>Items List</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name}: {item.description}
            <button onClick={() => handleEdit(item)}>Edit</button>
            <button onClick={() => handleDelete(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemForm;
