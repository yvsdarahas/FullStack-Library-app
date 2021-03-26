import { useState, useEffect } from "react";
import { Book } from "../types";

const useSort = (books: Book[], input: string): Book[] => {
  const [filteredContries, setFilteredContries] = useState<Book[]>([...books]);
  useEffect(() => {
    setFilteredContries(
      books.filter(
        (book) =>
          book.title.toUpperCase().includes(input) ||
          book.title.toLowerCase().includes(input) ||
          book.title.includes(input) ||
          book.author.toLowerCase().includes(input) ||
          book.author.toUpperCase().includes(input) ||
          book.author.includes(input)
      )
    );
  }, [input, books]);

  return filteredContries;
};

export default useSort;
