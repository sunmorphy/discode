import { useState } from "react";

export default function useInput(defaultValue = "") {
  const [value, setValue] = useState(defaultValue);

  const onValueChange = (event) => {
    setValue(event.target.value);
  };

  return [value, onValueChange];
}
