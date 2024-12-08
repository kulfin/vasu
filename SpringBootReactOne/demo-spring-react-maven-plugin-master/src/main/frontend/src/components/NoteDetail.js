import React, { useState } from 'react';

const NoteDetail = ({ note, onSave }) => {
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);

  const handleSave = () => {
    onSave({ ...note, title, content });
  };

  return (
    <div>
      <h2>Edit Note</h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default NoteDetail;