'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';

const MenuBar = ({ editor }: any) => {
  if (!editor) return null;

  const btnClass = (active: boolean) => 
    `px-3 py-1.5 rounded-lg text-sm font-bold transition-all ${
      active ? 'bg-[#12AD65] text-white shadow-md' : 'bg-white border text-slate-600 hover:bg-slate-50'
    }`;

  return (
    <div className="flex flex-wrap gap-2 p-3 border-b bg-slate-50/50 rounded-t-2xl">
      <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={btnClass(editor.isActive('heading', { level: 2 }))}>H2</button>
      <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={btnClass(editor.isActive('heading', { level: 3 }))}>H3</button>
      <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className={btnClass(editor.isActive('bold'))}>B</button>
      <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} className={btnClass(editor.isActive('bulletList'))}>• List</button>
      <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()} className={btnClass(editor.isActive('orderedList'))}>1. List</button>
    </div>
  );
};

export default function TiptapEditor({ content, onChange }: any) {
  const editor = useEditor({
    extensions: [StarterKit, Link.configure({ openOnClick: false })],
    content: content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML()); // نرسل HTML نظيف لسوبابيس
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg max-w-none p-5 focus:outline-none min-h-[250px] cursor-text',
      },
    },
  });

  return (
    <div className="border-2 border-slate-100 rounded-2xl bg-white focus-within:border-[#12AD65] transition-all overflow-hidden shadow-sm">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}