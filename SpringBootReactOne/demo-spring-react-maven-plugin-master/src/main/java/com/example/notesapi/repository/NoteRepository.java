package com.example.notesapi.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.notesapi.model.Note;


public interface NoteRepository extends MongoRepository<Note, String> {
}