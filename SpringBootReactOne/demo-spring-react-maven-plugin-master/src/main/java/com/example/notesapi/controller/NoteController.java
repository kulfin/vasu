package com.example.notesapi.controller;

import com.example.notesapi.model.Note;
import com.example.notesapi.repository.NoteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;



@RestController
@RequestMapping("/api/notes")
public class NoteController {

    @Autowired
    private NoteRepository noteRepository;

    // Create a Note
    @PostMapping("/saveNotes")
    public Object createNote(@RequestBody Note note) {
    	Note savedNote = null;
    	try {
        savedNote = noteRepository.save(note);
    	}catch(Exception e) {
    		e.printStackTrace();
    	}
      return savedNote;
    }

    // Get All Notes
    @GetMapping
    public List<Note> getAllNotes() {
        return noteRepository.findAll();
    }

    // Get a Single Note
    @GetMapping("/{id}")
    public ResponseEntity<Note> getNoteById(@PathVariable String id) {
        Optional<Note> note = noteRepository.findById(id);
        return note.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Update a Note
    @PutMapping("/{id}")
    public ResponseEntity<Note> updateNote(@PathVariable String id, @RequestBody Note noteDetails) {
        Optional<Note> optionalNote = noteRepository.findById(id);
        if (optionalNote.isPresent()) {
            Note note = optionalNote.get();
            note.setTitle(noteDetails.getTitle());
            note.setContent(noteDetails.getContent());
            Note updatedNote = noteRepository.save(note);
            return ResponseEntity.ok(updatedNote);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Delete a Note
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNote(@PathVariable String id) {
        if (noteRepository.existsById(id)) {
            noteRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}