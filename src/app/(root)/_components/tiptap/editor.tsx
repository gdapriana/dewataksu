import React, { useEffect } from "react";
import { useEditor, EditorContent, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Superscript from "@tiptap/extension-superscript";
import Subscript from "@tiptap/extension-subscript";
import Highlight from "@tiptap/extension-highlight";
import ImageExt from "@tiptap/extension-image";
import { Button } from "@/components/ui/button";
import {
  Undo,
  Redo,
  Bold,
  Italic,
  Strikethrough,
  Code,
  Link2,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  List,
  ListOrdered,
  Heading1,
  Image,
  Highlighter,
  UnderlineIcon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";

const MenuBar = ({ editor }: { editor: Editor | null }) => {
  if (!editor) return null;

  const addLink = () => {
    const url = window.prompt("Enter URL:");
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  const addImage = () => {
    const url = window.prompt("Enter image URL:");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  return (
    <div className="border-b p-2 flex items-center gap-1 flex-wrap">
      <Button
        variant="ghost"
        type="button"
        size="sm"
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().undo()}
        className="h-8 w-8 p-0"
      >
        <Undo className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        type="button"
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().redo()}
        className="h-8 w-8 p-0"
      >
        <Redo className="h-4 w-4" />
      </Button>

      <Separator orientation="vertical" className="h-6 mx-1" />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button type="button" variant="ghost" size="sm" className="h-8">
            <Heading1 className="h-4 w-4 mr-1" />
            <span className="text-xs">▼</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            onClick={() => editor.chain().focus().setParagraph().run()}
          >
            Normal Text
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
          >
            Heading 1
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
          >
            Heading 2
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
          >
            Heading 3
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Separator orientation="vertical" className="h-6 mx-1" />

      <Button
        variant="ghost"
        size="sm"
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`h-8 w-8 p-0 ${
          editor.isActive("bold") ? "bg-gray-200" : ""
        }`}
      >
        <Bold className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`h-8 w-8 p-0 ${
          editor.isActive("italic") ? "bg-gray-200" : ""
        }`}
      >
        <Italic className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        type="button"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={`h-8 w-8 p-0 ${
          editor.isActive("strike") ? "bg-gray-200" : ""
        }`}
      >
        <Strikethrough className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        type="button"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={`h-8 w-8 p-0 ${
          editor.isActive("underline") ? "bg-gray-200" : ""
        }`}
      >
        <UnderlineIcon className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        type="button"
        onClick={() => editor.chain().focus().toggleCode().run()}
        className={`h-8 w-8 p-0 ${
          editor.isActive("code") ? "bg-gray-200" : ""
        }`}
      >
        <Code className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        type="button"
        onClick={() => editor.chain().focus().toggleHighlight().run()}
        className={`h-8 w-8 p-0 ${
          editor.isActive("highlight") ? "bg-gray-200" : ""
        }`}
      >
        <Highlighter className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        type="button"
        onClick={addLink}
        className={`h-8 w-8 p-0 ${
          editor.isActive("link") ? "bg-gray-200" : ""
        }`}
      >
        <Link2 className="h-4 w-4" />
      </Button>

      <Separator orientation="vertical" className="h-6 mx-1" />

      <Button
        variant="ghost"
        size="sm"
        type="button"
        onClick={() => editor.chain().focus().toggleSuperscript().run()}
        className={`h-8 w-8 p-0 ${
          editor.isActive("superscript") ? "bg-gray-200" : ""
        }`}
      >
        x²
      </Button>
      <Button
        variant="ghost"
        size="sm"
        type="button"
        onClick={() => editor.chain().focus().toggleSubscript().run()}
        className={`h-8 w-8 p-0 ${
          editor.isActive("subscript") ? "bg-gray-200" : ""
        }`}
      >
        x₂
      </Button>

      <Separator orientation="vertical" className="h-6 mx-1" />

      <Button
        variant="ghost"
        size="sm"
        type="button"
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
        className={`h-8 w-8 p-0 ${
          editor.isActive({ textAlign: "left" }) ? "bg-gray-200" : ""
        }`}
      >
        <AlignLeft className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        type="button"
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
        className={`h-8 w-8 p-0 ${
          editor.isActive({ textAlign: "center" }) ? "bg-gray-200" : ""
        }`}
      >
        <AlignCenter className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        type="button"
        size="sm"
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
        className={`h-8 w-8 p-0 ${
          editor.isActive({ textAlign: "right" }) ? "bg-gray-200" : ""
        }`}
      >
        <AlignRight className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        type="button"
        onClick={() => editor.chain().focus().setTextAlign("justify").run()}
        className={`h-8 w-8 p-0 ${
          editor.isActive({ textAlign: "justify" }) ? "bg-gray-200" : ""
        }`}
      >
        <AlignJustify className="h-4 w-4" />
      </Button>

      <Separator orientation="vertical" className="h-6 mx-1" />

      <Button
        variant="ghost"
        size="sm"
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`h-8 w-8 p-0 ${
          editor.isActive("bulletList") ? "bg-gray-200" : ""
        }`}
      >
        <List className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`h-8 w-8 p-0 ${
          editor.isActive("orderedList") ? "bg-gray-200" : ""
        }`}
      >
        <ListOrdered className="h-4 w-4" />
      </Button>

      <Separator orientation="vertical" className="h-6 mx-1" />

      <Button
        variant="ghost"
        size="sm"
        type="button"
        onClick={addImage}
        className="h-8 w-8 p-0"
      >
        <Image className="h-4 w-4" />
      </Button>
    </div>
  );
};
interface TiptapEditorProps {
  content?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
}
export default function TiptapEditor({
  content = "<p>Start typing your content here...</p>",
  onChange,
  disabled = false,
}: TiptapEditorProps) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Superscript,
      Subscript,
      Highlight,
      ImageExt,
    ],
    content,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange?.(html);
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl focus:outline-none min-h-[400px] p-4",
      },
    },
  });

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  if (!editor)
    return <div className="border p-4 rounded-md">Loading editor...</div>;

  return (
    <div className="w-full h-full mx-auto">
      <div className="border rounded-lg overflow-hidden shadow-sm">
        <MenuBar editor={editor} />
        <EditorContent
          editor={editor}
          className="min-h-[400px] h-full overflow-y-auto"
        />
      </div>

      <style jsx global>{`
        .ProseMirror {
          min-height: 400px;
          padding: 1rem;
        }

        .ProseMirror:focus {
          outline: none;
        }

        .ProseMirror p {
          margin: 0.5rem 0;
        }

        .ProseMirror h1 {
          font-size: 2em;
          font-weight: bold;
          margin: 1rem 0;
        }

        .ProseMirror h2 {
          font-size: 1.5em;
          font-weight: bold;
          margin: 0.75rem 0;
        }

        .ProseMirror h3 {
          font-size: 1.25em;
          font-weight: bold;
          margin: 0.5rem 0;
        }

        .ProseMirror ul,
        .ProseMirror ol {
          padding-left: 2rem;
          margin: 0.5rem 0;
        }

        .ProseMirror code {
          background-color: #f3f4f6;
          padding: 0.2rem 0.4rem;
          border-radius: 0.25rem;
          font-family: monospace;
        }

        .ProseMirror mark {
          background-color: #fef08a;
          padding: 0.1rem 0.2rem;
        }

        .ProseMirror a {
          color: #3b82f6;
          text-decoration: underline;
          cursor: pointer;
        }

        .ProseMirror img {
          max-width: 100%;
          height: auto;
          border-radius: 0.5rem;
          margin: 1rem 0;
        }
      `}</style>
    </div>
  );
}
