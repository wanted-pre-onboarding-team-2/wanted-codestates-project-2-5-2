import React, { useState, useRef, useEffect } from "react";

import { HighLightType } from "src/App";

interface ListItemProps {
  id: string;
  name: string;
  highlights: HighLightType[];
  setHighlights: React.Dispatch<React.SetStateAction<HighLightType[]>>;
}

function ListItem({ id, name, highlights, setHighlights }: ListItemProps) {
  const [highLightname, setHighLightName] = useState(name);
  const [editMode, setEditMode] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [editMode]);

  const handleEdit = () => {
    setEditMode(!editMode);
    highlights.map((item) => {
      if (item.id === id && inputRef.current) {
        item.name = inputRef.current.value;
        setHighLightName(inputRef.current.value);
        setHighlights(highlights);
      }
    });
  };

  const handleDelete = () => {
    const result = highlights.filter((highlight) => highlight.id !== id);
    setHighlights(result);
  };
  return (
    <li className="list-item">
      {editMode ? (
        <input
          placeholder="item name"
          defaultValue={highLightname}
          onClick={handleEdit}
          onBlur={handleEdit}
          ref={inputRef}
        />
      ) : (
        <p>{highLightname}</p>
      )}
      <div className="buttons">
        <button className="edit-btn" onClick={handleEdit}>
          Edit
        </button>
        <button className="delete-btn" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </li>
  );
}

export default ListItem;
