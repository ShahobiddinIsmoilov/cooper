import { TextInputProps } from "../../interfaces/textInputProps";

function TextInput({
  id,
  name,
  charLimit,
  autoFocus,
  placeholder,
  width,
}: TextInputProps) {
  return (
    <input
      autoFocus={autoFocus}
      type="text"
      id={id}
      name={name}
      maxLength={charLimit}
      placeholder={placeholder}
      className={`input w-[${width}px]`}
    />
  );
}

export default TextInput;
