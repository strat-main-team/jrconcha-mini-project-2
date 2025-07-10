"use client";
// InitializedMDXEditor.tsx
import type { ForwardedRef } from "react";
import {
  UndoRedo,
  BoldItalicUnderlineToggles,
  DiffSourceToggleWrapper,
  BlockTypeSelect,
  headingsPlugin,
  // listsPlugin,
  // quotePlugin,
  // thematicBreakPlugin,
  // markdownShortcutPlugin,
  MDXEditor,
  type MDXEditorMethods,
  type MDXEditorProps,
  toolbarPlugin,
  diffSourcePlugin,
} from "@mdxeditor/editor";

// Only import this to the next file
export default function InitializedMDXEditor({
  editorRef,
  ...props
}: { editorRef: ForwardedRef<MDXEditorMethods> | null } & MDXEditorProps) {
  return (
    <MDXEditor
      plugins={[
        headingsPlugin(),
        diffSourcePlugin({
          viewMode: "rich-text",
        }),
        toolbarPlugin({
          toolbarClassName:
            "mdx-editor-toolbar flex w-full justify-items-start",
          toolbarContents: () => (
            <div className="flex w-full flex-items [&>div]:flex">
              <DiffSourceToggleWrapper>
                <UndoRedo />
                <BoldItalicUnderlineToggles />
                <BlockTypeSelect/>
              </DiffSourceToggleWrapper>
            </div>
          ),
        }),
      ]}
      {...props}
      ref={editorRef}
    />
  );
}
