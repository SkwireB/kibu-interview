"use client"
import React, { useState, useEffect } from 'react';
import { getMembers, getMemberNotes, createNote, Member, Note } from './api';

const MemberNotes: React.FC = () => {
  //Defining state based constants to keep track of the current members, notes, and whether we are adding a note.
  const [members, setMembers] = useState<Member[]>([]);
  const [selectedMemberId, setSelectedMemberId] = useState<string>('');
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNoteText, setNewNoteText] = useState<string>('');
  const [isAddingNote, setIsAddingNote] = useState<boolean>(false);

  //Will fetch the members immediately after the page is loaded, with the page awaiting that state.
  useEffect(() => {
    const fetchData = async () => {
      const fetchedMembers = await getMembers();
      setMembers(fetchedMembers);
    };

    fetchData();
  }, []);

  //Handler to change members, as we are using a dropdown. Will set the new notes accordingly after it fetches them with getMemberNotes, 
  const handleMemberChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const memberId = event.target.value;
    setSelectedMemberId(memberId);
    const memberNotes = await getMemberNotes(memberId);
    setNotes(memberNotes);
  };

  //function to create a new note.
  //will not update if there is no selected member or no new text to add. Triggered by selecting "Add Note"
  const handleCreateNote = async () => {
    if (!selectedMemberId || !newNoteText) return;
    try {
      await createNote(selectedMemberId, newNoteText);
      const updatedNotes = await getMemberNotes(selectedMemberId);
      setNotes(updatedNotes);
      setNewNoteText('');
    } catch (error) {
      console.error('Error creating note:', error);
    }
  };

  return (
    <div style={{ backgroundColor: 'white', color: 'black', padding: '1em', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center', fontSize: '2em', fontWeight: 'bold' }}>Member Notes</h1>
      <div style={{ marginBottom: '1em' }}>
        <label htmlFor="memberSelect">Select a Member:</label>
        <select
          id="memberSelect"
          value={selectedMemberId}
          onChange={handleMemberChange}
          style={{ marginLeft: '0.5em', padding: '0.2em', border: '2px solid black', borderRadius: '5px' }}
        >
          <option value="">Select Member</option>
          {members.map((member) => (
            <option key={member.id} value={member.id}>
              {member.firstName} {member.lastName}
            </option>
          ))}
        </select>
      </div>
      <div>
        {selectedMemberId && (
          <div>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
              {notes.map((note) => (
                <li key={note.id} style={{ marginBottom: '1em', padding: '0.5em', borderRadius: '5px' }}>{note.text}</li>
              ))}
            </ul>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1em' }}>
              {isAddingNote ? (
                <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                  <textarea
                    value={newNoteText}
                    onChange={(e) => setNewNoteText(e.target.value)}
                    placeholder="Enter new note"
                    rows={2}
                    style={{ width: '50%', marginBottom: '1em', padding: '0.5em', border: '2px solid black', borderRadius: '5px' }}
                  />
                  <button onClick={handleCreateNote} style={{ marginLeft: '0.5em', outline: '2px solid black', background: 'none', padding: '0.5em 1em', borderRadius: '5px' }}>Add Note</button>
                </div>
              ) : (
                <button onClick={() => setIsAddingNote(true)} style={{ background: 'none', padding: '0.5em 1em', borderRadius: '5px', border: '1px solid black' }}>Add New Note</button>
              )}
              <button onClick={() => setIsAddingNote(!isAddingNote)} style={{ background: 'none', padding: '0.5em 1em', borderRadius: '5px', border: '2px solid black', marginLeft: '0.5em' }}>
                {isAddingNote ? 'Hide Textbox' : 'Show Textbox'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MemberNotes;