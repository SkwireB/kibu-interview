"use client";
import React, { useState } from "react";
import { NoteComponent, Note } from "./note";

interface NoteListProps {
  notes: Note[];
  editingNoteText: string;
  setEditingNoteText: (text: string) => void;
  editingNoteId: number | null;
  setEditingNoteId: (id: number | null) => void;
  openModal: () => void;
}

function NotesGrid({
  notes,
  editingNoteText,
  setEditingNoteText,
  editingNoteId,
  setEditingNoteId,
  openModal,
}: NoteListProps) {
  const [isEditingNote, setIsEditingNote] = useState(false);
  console.log("Received notes:", notes);

  const openNoteEditModal = (note: Note) => {
    setEditingNoteText(note.text);
    setEditingNoteId(note.id);
    setIsEditingNote(true);
    openModal();
  };

  const openNewNoteModal = () => {
    setEditingNoteText("");
    setEditingNoteId(null);
    setIsEditingNote(true);
  };

  const closeNoteEditModal = () => {
    setEditingNoteText("");
    setEditingNoteId(null);
    setIsEditingNote(false);
  };

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {notes.map((note) => (
          <div key={note.id}>
            <div
              style={{
                height: 400,
                marginTop: 10,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
              className="h-auto max-w-full rounded-lg"
            >
              <NoteComponent note={note} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NotesGrid;