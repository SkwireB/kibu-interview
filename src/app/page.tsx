import React, { useState, useEffect } from 'react';
import { getMembers, getMemberNotes, createNote, Member, Note } from './api';

const MemberNotes: React.FC = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [selectedMemberId, setSelectedMemberId] = useState<string>('');
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNoteText, setNewNoteText] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      const fetchedMembers = await getMembers();
      setMembers(fetchedMembers);
    };

    fetchData();
  }, []);

  const handleMemberChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const memberId = event.target.value;
    setSelectedMemberId(memberId);
    const memberNotes = await getMemberNotes(memberId);
    setNotes(memberNotes);
  };

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
    <div>
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
        <h2>Notes</h2>
        {selectedMemberId && (
          <div>
            <ul>
              {notes.map((note) => (
                <li key={note.id}>{note.text}</li>
              ))}
            </ul>
            <textarea
              value={newNoteText}
              onChange={(e) => setNewNoteText(e.target.value)}
              placeholder="Enter new note"
            />
            <button onClick={handleCreateNote}>Add Note</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MemberNotes;