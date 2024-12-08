import React from 'react';

const NotesList = ({ notes, onSelectNote }) => {
  return (
    <div>
      <h2>Notes</h2>
      <ul>
        {notes.map((note) => (
          <li key={note.id} onClick={() => onSelectNote(note.id)}>
            <h3>{note.title}</h3>
            <p>{note.content.substring(0, 50)}...</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotesList;