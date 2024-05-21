import axios, { AxiosResponse } from 'axios';

//base_url that will be used by all functions.
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

//api function to get a list members, as type Member[]. Will await a response from the json Server.
export const getMembers = async (): Promise<Member[]> => {
  const response: AxiosResponse<Member[]> = await axios.get(`${API_BASE_URL}/members`);
  return response.data;
};

//api function to get a list notes, as type Notes[]. Is dependent on the memberId, which is required to retrieve the notes.
//Notes without a assigned memberId cannot be retrieved. Will await a response from the json Server.
export const getMemberNotes = async (memberId: string): Promise<Note[]> => {
  const response: AxiosResponse<Note[]> = await axios.get(`${API_BASE_URL}/notes?member=${memberId}`);
  return response.data;
};

//Will create a note with the inputs of memberId and String. Will generate a random Id between 1 and 1000 to assign to each text id.
export const createNote = async (memberId: string, text: string): Promise<Note> => {
  const newNote: Note = {
    id: (Math.floor(Math.random() * 1000)).toString(), // Generate a unique ID for the new note
    member: memberId,
    text,
  };
  await axios.post(`${API_BASE_URL}/notes`, newNote);
  return newNote;
};