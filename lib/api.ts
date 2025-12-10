import axios from 'axios';
import type { Note, NoteTag } from '@/types/note';

function getToken(): string {
  const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
  if (!token) {
    throw new Error("NEXT_PUBLIC_NOTEHUB_TOKEN is missing");
  }
  return token;
}

const api = axios.create({
  baseURL: 'https://notehub-public.goit.study/api',
});

// Додаємо токен перед кожним запитом
api.interceptors.request.use((config) => {
  const token = getToken();
  config.headers = config.headers || {};
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface CreateNotePayload {
  title: string;
  content: string;
  tag: NoteTag;
}

export async function fetchNotes(
  params: FetchNotesParams
): Promise<FetchNotesResponse> {
  const { page = 1, perPage = 12, search } = params;

  const { data } = await api.get<FetchNotesResponse>('/notes', {
    params: { page, perPage, search },
  });

  return data;
}

export async function createNote(
  payload: CreateNotePayload
): Promise<Note> {
  const { data } = await api.post<Note>('/notes', payload);
  return data;
}

export async function deleteNote(id: string): Promise<Note> {
  const { data } = await api.delete<Note>(`/notes/${id}`);
  return data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const { data } = await api.get<Note>(`/notes/${id}`);
  return data;
}
