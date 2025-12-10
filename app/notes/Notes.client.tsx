'use client';
import { useState } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';
import css from './NotesPage.module.css';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import NoteList from '@/components/NoteList/NoteList';
import Modal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';
import Loader from '@/components/Loader/Loader';
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';
import { fetchNotes } from '@/lib/api';
import type { FetchNotesResponse } from '@/lib/api';

const PER_PAGE = 12;

export default function App() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [debouncedSearch] = useDebounce(search, 500);
  
  const { data, isLoading, isError, isFetching } =
    useQuery<FetchNotesResponse>({
      queryKey: ['notes', page, debouncedSearch],
      queryFn: () =>
        fetchNotes({
          page,
          perPage: PER_PAGE,
          search: debouncedSearch || undefined,
        }),
      placeholderData: keepPreviousData, 
    });

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 0;
  
  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1); 
  };

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const showList = notes.length > 0;
  const showPagination = totalPages > 1;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={search} onChange={handleSearchChange} />

        {showPagination && (
          <Pagination
            page={page}
            totalPages={totalPages}
            onChange={setPage}
          />
        )}

        <button
          type="button"
          className={css.button}
          onClick={handleOpenModal}
        >
          Create note +
        </button>
      </header>

      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {!isLoading && !isError && showList && <NoteList notes={notes} />}
      {isFetching && !isLoading && <Loader />}

      {isModalOpen && (
        <Modal onClose={handleCloseModal}>
          <NoteForm onClose={handleCloseModal} />
        </Modal>
      )}
    </div>
  );
}