"use client";
import React, { useState } from "react";
import { Note } from "./note";
import NoteList from "./noteList";
import jsonFile from "./db.json";

export default function Home({}: {setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;}) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [editingNoteText, setEditingNoteText] = useState<string>("");
  const [editingNoteId, setEditingNoteId] = useState<number | null>(null);

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedColor(null);
    setEditingNoteText("");
    setEditingNoteId(null);
  };
  
  return (
    <main>
      <div className="container">
        <div className="flex-1">
          <NoteList
            notes={notes}
            editingNoteText={editingNoteText}
            setEditingNoteText={setEditingNoteText}
            editingNoteId={editingNoteId}
            setEditingNoteId={setEditingNoteId}
            openModal={openModal}
          />
        </div>
      </div>
    </main>
  )
}
