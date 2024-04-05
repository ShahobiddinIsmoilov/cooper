import { Textarea } from "@mantine/core";
import { useState } from "react";
import validator from "validator";
import { LinkPreview } from "@dhaiwat10/react-link-preview";

interface Props {
  link: string;
  setLink: (link: string) => void;
  formDisabled: boolean;
}

export default function LinkInput({ link, setLink, formDisabled }: Props) {
  const [isUrl, setIsUrl] = useState(false);

  function validateUrl(url: string) {
    validator.isURL(url) ? setIsUrl(true) : setIsUrl(false);
    isUrl && setLink(url);
  }

  return (
    <>
      <Textarea
        onKeyDown={(e) => {
          e.key === "Enter" && e.preventDefault();
        }}
        onChange={(e) => validateUrl(e.target.value)}
        readOnly={formDisabled}
        variant="unstyled"
        maxLength={200}
        bg={"dark"}
        data-autofocus
        autosize
        placeholder="Link"
        size="lg"
        className="flex-grow border border-[#424242] rounded-[4px] px-4 read-only:"
      />
      {isUrl ? (
        <LinkPreview
          url="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
          width="400px"
        />
      ) : (
        <span className="text-red-400">Incorrect URL address</span>
      )}
    </>
  );
}
