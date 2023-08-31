import { useState } from "react";

export default function useQuillInput(defaultValue = "") {
  const [value, setValue] = useState(defaultValue);

  const onValueChange = (value) => {
    setValue(value);
  };

  const clearValue = () => {
    setValue("")
  }

  return [value, onValueChange, clearValue];
}
