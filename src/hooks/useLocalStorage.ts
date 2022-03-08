// "highlights":[{highlight: {id:1, x: 1, y: 1, width: 1, height: 1, name: 'lipstick'},{},{}]
import { HighLightType } from "../App";
import { useState } from "react";

export const useLocalStorage = (key: string, initialValue: HighLightType[]) => {
  const getLocalStorage = () => {
    try {
      const items = localStorage.getItem(key);
      const validItems = items ? JSON.parse(items) : initialValue;
      return validItems;
    } catch (e) {
      console.error(e);
      return initialValue;
    }
  };

  const [storageItems, setStorageItems] = useState(() => getLocalStorage());

  const setLocalStorage = (value: HighLightType[]) => {
    try {
      if (!value) return;
      localStorage.setItem(key, JSON.stringify(value));
      setStorageItems(value);
    } catch (e) {
      console.error(e);
      localStorage.setItem(key, JSON.stringify(initialValue));
      setStorageItems(initialValue);
    }
  };

  return [storageItems, setLocalStorage];
};


