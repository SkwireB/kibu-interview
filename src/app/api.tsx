import axios, { AxiosResponse } from 'axios';

const API_BASE_URL = 'http://localhost:3000';

export interface Member {
  id: string;
  firstName: string;
  lastName: string;
}

export interface Note {
  id: string;
  member: string;
  text: string;
}

export const getMembers = async (): Promise<Member[]> => {
  const response: AxiosResponse<Member[]> = await axios.get(`${API_BASE_URL}/members`);
  return response.data;
};

export const getMemberNotes = async (memberId: string): Promise<Note[]> => {
  const response: AxiosResponse<Note[]> = await axios.get(`${API_BASE_URL}/notes?member=${memberId}`);
  return response.data;
};

export const createNote = async (memberId: string, text: string): Promise<Note> => {
  const newNote: Note = {
    id: (Math.floor(Math.random() * 1000)).toString(), // Generate a unique ID for the new note
    member: memberId,
    text,
  };
  await axios.post(`${API_BASE_URL}/notes`, newNote);
  return newNote;
};