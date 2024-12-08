import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');
  const [notes, setNotes] = useState([]);
  const [editingNoteId, setEditingNoteId] = useState(null);

  // Fetch all notes when the component mounts
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch('/api/notes');
        if (response.ok) {
          const notesData = await response.json();
          setNotes(notesData);
        } else {
          console.error('Failed to fetch notes:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching notes:', error);
      }
    };

    fetchNotes();
  }, []);

  const handleTitleChange = (e) => {
    setNoteTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setNoteContent(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Create a note object
    const newNote = {
      title: noteTitle,
      content: noteContent,
    };

    try {
      // If editing, send a PUT request; otherwise, send a POST request
      const response = editingNoteId
        ? await fetch(`/api/notes/${editingNoteId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newNote),
          })
        : await fetch('/api/notes/saveNotes', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newNote),
          });

      if (response.ok) {
        const savedNote = await response.json();
        if (editingNoteId) {
          // Update the existing note in the state
          setNotes(notes.map(note => (note.id === editingNoteId ? savedNote : note)));
          setEditingNoteId(null); // Reset editing state
        } else {
          // Add the new note to the state
          setNotes([...notes, savedNote]);
        }
        // Clear the input fields
        setNoteTitle('');
        setNoteContent('');
      } else {
        console.error('Failed to save note:', response.statusText);
      }
    } catch (error) {
      console.error('Error saving note:', error);
    }
  };

  const handleEdit = (note) => {
    setNoteTitle(note.title);
    setNoteContent(note.content);
    setEditingNoteId(note.id);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/notes/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Remove the deleted note from the state
        setNotes(notes.filter(note => note.id !== id));
      } else {
        console.error('Failed to delete note:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  return (
    <div className="App">
      <h1>Notes App</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter note title"
          value={noteTitle}
          onChange={handleTitleChange}
        />
        <textarea
          placeholder="Enter note content"
          value={noteContent}
          onChange={handleContentChange}
        />
        <button type="submit">{editingNoteId ? 'Update Note' : 'Save Note'}</button>
      </form>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            <h2>{note.title}</h2>
            <p>{note.content}</p>
            <button onClick={() => handleEdit(note)}>Edit</button>
            <button onClick={() => handleDelete(note.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;