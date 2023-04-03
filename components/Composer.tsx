import { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";

export function Composer({ showCastButtonByDefault = false, placeholder = "Start typing a new cast here..." }) {
  const [value, setValue] = useState<string>("");
  const [isFocused, setIsFocused] = useState<boolean>(false);

  return (
    <>
      <TextareaAutosize
        value={value}
        onChange={(e) => setValue(e.currentTarget.value)}
        minRows={2}
        className="composer"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
      />
      {(isFocused || showCastButtonByDefault) && (
        <div className="row-fe-c" style={{ width: "100%" }}>
          <button className="styled blue">Cast</button>
        </div>
      )}
    </>
  );
}
