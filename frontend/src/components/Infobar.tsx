import { CommunityProps } from "../interfaces/communityProps";
import { FaInfoCircle } from "react-icons/fa";

interface InfobarProps {
  community?: CommunityProps;
}

function Infobar({ community }: InfobarProps) {
  const content = (
    <div>
      <h2 style={{ textAlign: "center" }}>
        Welcome to Mantine rich text editor
      </h2>
      <p>
        <code>RichTextEditor</code> component focuses on usability and is
        designed to be as simple as possible to bring a familiar editing
        experience to regular users. <code>RichTextEditor</code> is based on{" "}
        <a href="https://tiptap.dev/" rel="noopener noreferrer" target="_blank">
          Tiptap.dev
        </a>{" "}
        and supports all of its features:
      </p>
      <ul>
        <li>
          General text formatting: <strong>bold</strong>, <em>italic</em>,{" "}
          <u>underline</u>, <s>strike-through</s>{" "}
        </li>
        <li>Headings (h1-h6)</li>
        <li>
          Sub and super scripts (<sup>&lt;sup /&gt;</sup> and{" "}
          <sub>&lt;sub /&gt;</sub> tags)
        </li>
        <li>Ordered and bullet lists</li>
        <li>Text align&nbsp;</li>
        <li>
          And all{" "}
          <a
            href="https://tiptap.dev/extensions"
            target="_blank"
            rel="noopener noreferrer"
          >
            other extensions
          </a>
        </li>
      </ul>
    </div>
  );

  return (
    <div className="w-80 min-w-80 text-white overflow-hidden h-fit bg-dark-850 rounded-xl p-8">
      <p className="flex justify-center items-center gap-2 opacity-50 pb-4">
        <FaInfoCircle className="inline-block" />
        About this community
      </p>
      {content}
    </div>
  );
}

export default Infobar;
