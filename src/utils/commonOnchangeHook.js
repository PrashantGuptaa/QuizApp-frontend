import React, { useState } from "react";

function customUseState(initialVal) {
  const [value, setValue] = useState(initialVal);

  const reset = () => setValue(initialVal);

  const bind = {
    value,
    onChange: (event) => {
      setValue(event.target.value);
    },
  };

  return [value, bind, reset];
}

export default customUseState;
