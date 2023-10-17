import React, {FC} from "react";

interface SearchComponentProps {
  searchQuery: string;
  handleSearchInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleClearSearch: () => void;
}

const SearchComponent: FC<SearchComponentProps> = ({searchQuery, handleSearchInputChange, handleClearSearch,}) => {
  return (
    <div>
      <input
        type="text"
        placeholder="Пошук"
        value={searchQuery}
        onChange={handleSearchInputChange}
      />
      <button onClick={handleClearSearch}>
        Очистити пошук
      </button>
    </div>
  );
};

export {SearchComponent};
