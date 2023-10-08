import { Pagination } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";

import { useAppDispatch, useAppSelector } from "../../hooks";
import { itemAction } from "../../redux";
import { Item } from "../Item/Item";
import css from "./items.module.css";

const Items: FC = () => {
  const { items, page, totalPages } = useAppSelector(
    (state) => state.itemReducer
  );

  const [query, setQuery] = useSearchParams({ page: "1" });
  const dispatch = useAppDispatch();
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);
  const [sortedBy, setSortedBy] = useState<string>("createAt");
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const currentSortOption = query.get("sortedBy") || "createAt";
    setSortedBy(currentSortOption);

    // Отримайте значення searchQuery з параметру пошуку
    const searchQueryParam = query.get("search");
    setSearchQuery(searchQueryParam || "");

    // Виконайте запит на сервер тільки тоді, коли searchQuery не порожній
    if (searchQueryParam) {
      dispatch(
        itemAction.getAll({
          page: Number(query.get("page")),
          sortedBy: currentSortOption,
          search: searchQueryParam,
        })
      );
    } else {
      // Якщо searchQuery порожній, ви можете відобразити всі айтеми
      // або виконати інші дії за вашим власним бажанням
      dispatch(
        itemAction.getAll({
          page: Number(query.get("page")),
          sortedBy: currentSortOption,
          search: searchQuery || "", // Додаємо searchQuery або порожній рядок, якщо searchQuery порожній
        })
      );
    }
  }, [dispatch, query]);

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    setQuery({ page: "1", sortedBy, search: searchQuery });
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setQuery({ page: "1", sortedBy, search: "" });
  };

  const handleSortChange = (newSortOption: string) => {
    setSortedBy(newSortOption);
    setQuery({ page: "1", sortedBy: newSortOption });
  };

  const sortOptions = [
    { value: "createAt", label: "Даті додавання" },
    { value: "price", label: "Ціна" },
    { value: "quantity", label: "Кількість" },
  ];

  const handlePageChange = (newPage: number) => {
    setQuery({ page: newPage.toString() });
  };

  const handleItemSelection = (itemId: string) => {
    if (selectedItems.includes(itemId)) {
      setSelectedItems(selectedItems.filter((id) => id !== itemId));
    } else {
      setSelectedItems([...selectedItems, itemId]);
    }
  };

  const openDeleteConfirmation = () => {
    setIsDeleteConfirmationOpen(true);
  };
  const closeDeleteConfirmation = () => {
    setIsDeleteConfirmationOpen(false);
  };

  const handleDeleteSelectedItems = () => {
    openDeleteConfirmation();
  };

  const handleConfirmDelete = () => {
    selectedItems.forEach((itemId) => {
      dispatch(
        itemAction.remove({
          id: itemId,
          page: Number(query.get("page")),
          sortedBy: "",
          search: "",
        })
      );
    });
    setSelectedItems([]);
    closeDeleteConfirmation();
  };

  return (
    <div className={css.block}>
      <input
        type="text"
        placeholder="Пошук"
        value={searchQuery}
        onChange={handleSearchInputChange}
      />
      <button onClick={handleSearch}>Пошук</button>
      <button onClick={handleClearSearch}>Скинути пошук</button>
      <select
        value={sortedBy}
        onChange={(e) => handleSortChange(e.target.value)}
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {isDeleteConfirmationOpen && (
        <div className={css.overlay}>
          <div className={css.deleteConfirmation}>
            <div className={css.confirmationContainer}>
              {`Ви впевнені, що хочете видалити наступні товари?`}
              <div>
                <div className={css.itemTable}>
                  <div className={css.confirmName}>
                    <div>артикул</div>
                    <div>назва</div>
                    <div>бренд</div>
                  </div>
                  {selectedItems.map((itemId) => {
                    const item = items.find((item) => item._id === itemId);
                    return item ? (
                      <div key={itemId} className={css.deleteInfo}>
                        <div className={css.deleteInfoBlock}>{item.article}</div>
                        <div className={css.deleteInfoBlock}>{item.itemName}</div>
                        <div className={css.deleteInfoBlock}>{item.brand}</div>
                      </div>
                    ) : null;
                  })}
                </div>
              </div>
              <div className={css.confirmationButtons}>
                <button onClick={handleConfirmDelete} className={css.delete}>Підтвердити</button>
                <button onClick={closeDeleteConfirmation} className={css.cancel}>Скасувати</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className={css.nameBlock}>
        <div className={css.par}>
          <div className={css.deleteBlock}>
            <button
              className={css.deleteBtn}
              onClick={handleDeleteSelectedItems}
              disabled={selectedItems.length === 0}
            >
              <DeleteIcon />
            </button>
          </div>
        </div>
        <div className={css.par}>
          <b>назва</b>
        </div>
        <div className={css.par}>
          <b>бренд</b>
        </div>
        <div className={css.par}>
          <b>артикул</b>
        </div>
        <div className={css.par}>
          <b>розмір</b>
        </div>
        <div className={css.par}>
          <b>кількість</b>
        </div>
        <div className={css.par}>
          <b>ціна</b>
        </div>
        <div className={css.par}>
          <b>категорія</b>
        </div>
        <div className={css.par}>
          <b>відділ</b>
        </div>
        <div className={css.par}>
          <b>дата додання</b>
        </div>
      </div>

      <div>
        {items.map((item) => (
          <Item
            key={item._id}
            item={item}
            isSelected={selectedItems.includes(item._id)}
            onSelect={handleItemSelection}
          />
        ))}
      </div>
      <div className={css.pagination}>
        <Pagination
          count={totalPages || 1}
          page={Number(query.get("page"))}
          onChange={(event, value) => handlePageChange(value)}
          disabled={
            page === null ||
            page <= 0 ||
            (totalPages !== null && page >= totalPages + 1)
          }
          color="standard"
          shape="rounded"
          size="large"
          showFirstButton
          showLastButton
        />
      </div>
    </div>
  );
};

export { Items };
