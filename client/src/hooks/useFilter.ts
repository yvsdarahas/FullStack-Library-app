import { useState, useEffect } from "react";
// import _ from "lodash";

const useSort = (books: any[], input: string): any[] => {
  const [filteredContries, setFilteredContries] = useState<any[]>([...books]);
  //   const [check, setCheck] = useState(true);
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

  //   const ClickToSort = (
  //     event: React.MouseEvent<HTMLTableHeaderCellElement, MouseEvent>
  //   ) => {
  //     let button = event.target as HTMLInputElement;
  //     if (button.innerText === "FLAG") {
  //       if (check) {
  //         setFilteredContries(_.orderBy(books, ["flag"], ["asc"]));
  //       } else {
  //         setFilteredContries(_.orderBy(books, ["flag"], ["desc"]));
  //       }
  //     } else if (button.innerText === "book") {
  //       if (check) setFilteredContries(_.orderBy(books, ["title"], ["asc"]));
  //       else setFilteredContries(_.orderBy(books, ["title"], ["desc"]));
  //     } else if (button.innerText === "LANGUAGES") {
  //       if (check)
  //         setFilteredContries(
  //           _.orderBy(books, ["languages[0].title"], ["asc"])
  //         );
  //       else
  //         setFilteredContries(
  //           _.orderBy(books, ["languages[0].title"], ["desc"])
  //         );
  //     } else if (button.innerText === "POPULATION") {
  //       if (check)
  //         setFilteredContries(_.orderBy(books, ["population"], ["asc"]));
  //       else setFilteredContries(_.orderBy(books, ["population"], ["desc"]));
  //     } else if (button.innerText === "REGION") {
  //       if (check) setFilteredContries(_.orderBy(books, ["region"], ["asc"]));
  //       else setFilteredContries(_.orderBy(books, ["region"], ["desc"]));
  //     }
  //     setCheck(!check);
  //   };
  return filteredContries;
};

export default useSort;
