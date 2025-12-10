'use client';

type Props = {
  error: Error;
  reset: () => void; 
};

export default function NoteError({ error }: Props) { 
  return (
    <div>
      <h2>Помилка при завантаженні</h2>
      <p>{error.message}</p>
    </div>
  );
}