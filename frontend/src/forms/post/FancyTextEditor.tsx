import { RichTextEditor, Link } from "@mantine/tiptap";
import { JSONContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Superscript from "@tiptap/extension-superscript";
import SubScript from "@tiptap/extension-subscript";
import Placeholder from "@tiptap/extension-placeholder";
import CharacterCount from "@tiptap/extension-character-count";
import { ImBold } from "react-icons/im";
import { LuItalic } from "react-icons/lu";
import { MdFormatUnderlined } from "react-icons/md";
import { RiStrikethrough } from "react-icons/ri";
import { FaCode } from "react-icons/fa6";
import { MdFormatQuote } from "react-icons/md";
import { PiListBulletsBold } from "react-icons/pi";
import { GoListOrdered } from "react-icons/go";
import { TbSubscript } from "react-icons/tb";
import { TbSuperscript } from "react-icons/tb";
import { BsThreeDots } from "react-icons/bs";
import { LuLink2 } from "react-icons/lu";
import { LuLink2Off } from "react-icons/lu";
import { MdFormatAlignLeft } from "react-icons/md";
import { MdOutlineFormatAlignRight } from "react-icons/md";
import { MdOutlineFormatAlignCenter } from "react-icons/md";
import { MdOutlineFormatAlignJustify } from "react-icons/md";
import { GrUndo } from "react-icons/gr";
import { GrRedo } from "react-icons/gr";
import { RiFontSize2 } from "react-icons/ri";

interface FancyTextEditorProps {
  content: string;
  setContent: (content: string) => void;
  setHTMLbody: (body: any) => void;
  formDisabled: boolean;
}

export default function FancyTextEditor({
  content,
  setContent,
  setHTMLbody,
  formDisabled,
}: FancyTextEditorProps) {
  const sample =
    '<h2 style="text-align: center;">Welcome to Mantine rich text editor</h2><p><code>RichTextEditor</code> component focuses on usability and is designed to be as simple as possible to bring a familiar editing experience to regular users. <code>RichTextEditor</code> is based on <a href="https://tiptap.dev/" rel="noopener noreferrer" target="_blank">Tiptap.dev</a> and supports all of its features:</p><ul><li>General text formatting: <strong>bold</strong>, <em>italic</em>, <u>underline</u>, <s>strike-through</s> </li><li>Headings (h1-h6)</li><li>Sub and super scripts (<sup>&lt;sup /&gt;</sup> and <sub>&lt;sub /&gt;</sub> tags)</li><li>Ordered and bullet lists</li><li>Text align&nbsp;</li><li>And all <a href="https://tiptap.dev/extensions" target="_blank" rel="noopener noreferrer">other extensions</a></li></ul>';

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      SubScript,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Placeholder.configure({ placeholder: "Text (optional)" }),
      CharacterCount.configure({
        limit: 4000,
      }),
    ],
    content,
    onUpdate({ editor }) {
      setContent(editor.getText());
      setHTMLbody(editor.getHTML());
    },
    editable: !formDisabled,
  });

  const w = 9;
  const h = "100%";

  return (
    <div className="tiptap-editor">
      <RichTextEditor editor={editor}>
        <RichTextEditor.Toolbar sticky p={0} h={40} bg={"dark"}>
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Bold icon={ImBold} h={h} px={w} />
            <RichTextEditor.Italic icon={LuItalic} h={h} px={w} />
            <RichTextEditor.Underline icon={MdFormatUnderlined} h={h} px={w} />
            <RichTextEditor.Strikethrough icon={RiStrikethrough} h={h} px={w} />
            <RichTextEditor.Subscript icon={TbSubscript} h={h} px={w} />
            <RichTextEditor.Superscript icon={TbSuperscript} h={h} px={w} />
            <RichTextEditor.Code icon={FaCode} h={h} px={w} />
            <RichTextEditor.H2 icon={RiFontSize2} h={h} px={w} />
            <RichTextEditor.Link icon={LuLink2} h={h} px={w} />
            <RichTextEditor.Unlink icon={LuLink2Off} h={h} px={w} />
            <RichTextEditor.Blockquote icon={MdFormatQuote} h={h} px={w} />
            <RichTextEditor.Hr icon={BsThreeDots} h={h} px={w} />
            <RichTextEditor.BulletList icon={PiListBulletsBold} h={h} px={w} />
            <RichTextEditor.OrderedList icon={GoListOrdered} h={h} px={w} />
            <RichTextEditor.AlignLeft icon={MdFormatAlignLeft} h={h} px={w} />
            <RichTextEditor.AlignCenter
              icon={MdOutlineFormatAlignCenter}
              h={h}
              px={w}
            />
            <RichTextEditor.AlignJustify
              icon={MdOutlineFormatAlignJustify}
              h={h}
              px={w}
            />
            <RichTextEditor.AlignRight
              icon={MdOutlineFormatAlignRight}
              h={h}
              px={w}
            />
            <RichTextEditor.Undo icon={GrUndo} h={h} px={13} />
            <RichTextEditor.Redo icon={GrRedo} h={h} px={14} />
          </RichTextEditor.ControlsGroup>
        </RichTextEditor.Toolbar>

        <RichTextEditor.Content bg={"dark"} className="text-lg" mih={95} />
      </RichTextEditor>
      <span className={`inline-block w-full text-end opacity-75`}>
        {content?.length}/4000
      </span>
    </div>
  );
}
