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
  //will not update if there is no selected member or n
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
    <div style={{ backgroundColor: 'white', color: 'black', padding: '1em', fontFamily: 'Arial, sans-serif'}}>
      <h1>Member Notes</h1>
      <div>
        <label htmlFor="memberSelect">Select a Member:</label>
        <select id="memberSelect" value={selectedMemberId} onChange={handleMemberChange}>
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
              <li key={note.id} style={{ marginBottom: '1em' }}>{note.text}</li>
            ))}
          </ul>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1em' }}>
            {isAddingNote ? (
              <div style={{ width: '100%', marginRight: '0.5em' }}>
                <textarea
                  value={newNoteText}
                  onChange={(e) => setNewNoteText(e.target.value)}
                  placeholder="Enter new note"
                  style={{ width: '100%', marginBottom: '1em' }}
                />
                <button onClick={handleCreateNote} style={{ outline: '2px solid black', background: 'none', padding: '0.5em 1em', borderRadius: '5px' }}>Add Note</button>
              </div>
            ) : (
              <button onClick={() => setIsAddingNote(true)} style={{ background: 'none', padding: '0.5em 1em', borderRadius: '5px' }}>Add New Note</button>
            )}
            <button onClick={() => setIsAddingNote(!isAddingNote)} style={{ background: 'none', padding: '0.5em 1em', borderRadius: '5px', border: '2px solid black' }}>
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