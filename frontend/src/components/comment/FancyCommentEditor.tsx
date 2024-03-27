import { RichTextEditor, Link } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
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
import { LuLink2 } from "react-icons/lu";
import { LuLink2Off } from "react-icons/lu";
import { RiFontSize2 } from "react-icons/ri";

interface FancyCommentEditorProps {
  setHTMLComment: (body: any) => void;
  formDisabled: boolean;
  setControlsVisible: (visible: boolean) => void;
  toolbarVisible: boolean;
  clearForm: boolean;
  placeholder?: string;
  autofocus?: boolean;
  setClearForm: (clear: boolean) => void;
}

export default function FancyCommentEditor({
  setHTMLComment,
  formDisabled,
  setControlsVisible,
  toolbarVisible,
  clearForm,
  placeholder,
  autofocus,
  setClearForm,
}: FancyCommentEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      SubScript,
      Placeholder.configure({ placeholder: placeholder }),
      CharacterCount.configure({
        limit: 10000,
      }),
    ],
    onUpdate({ editor }) {
      setHTMLComment(editor.getHTML());
    },
    onFocus() {
      setClearForm(false);
      setControlsVisible(true);
    },
    editable: !formDisabled,
  });

  clearForm && editor?.commands.clearContent();
  autofocus && editor?.commands.focus();

  const w = 11;
  const h = "100%";

  return (
    <div className="tiptap-editor">
      <RichTextEditor editor={editor}>
        {toolbarVisible && (
          <RichTextEditor.Toolbar sticky p={0} h={40} bg={"dark"}>
            <RichTextEditor.ControlsGroup>
              <RichTextEditor.Bold icon={ImBold} h={h} px={w} />
              <RichTextEditor.Italic icon={LuItalic} h={h} px={w} />
              <RichTextEditor.Underline
                icon={MdFormatUnderlined}
                h={h}
                px={w}
              />
              <RichTextEditor.Strikethrough
                icon={RiStrikethrough}
                h={h}
                px={w}
              />
              <RichTextEditor.Subscript icon={TbSubscript} h={h} px={w} />
              <RichTextEditor.Superscript icon={TbSuperscript} h={h} px={w} />
              <RichTextEditor.Code icon={FaCode} h={h} px={w} />
              <RichTextEditor.H2 icon={RiFontSize2} h={h} px={w} />
              <RichTextEditor.Link icon={LuLink2} h={h} px={w} />
              <RichTextEditor.Unlink icon={LuLink2Off} h={h} px={w} />
              <RichTextEditor.Blockquote icon={MdFormatQuote} h={h} px={w} />
              <RichTextEditor.BulletList
                icon={PiListBulletsBold}
                h={h}
                px={w}
              />
              <RichTextEditor.OrderedList icon={GoListOrdered} h={h} px={w} />
            </RichTextEditor.ControlsGroup>
          </RichTextEditor.Toolbar>
        )}
        <RichTextEditor.Content bg={"dark"} />
      </RichTextEditor>
    </div>
  );
}
