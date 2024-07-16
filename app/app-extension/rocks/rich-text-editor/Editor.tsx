import { useState, useEffect, memo } from "react";
import { Editor, Toolbar } from "@wangeditor/editor-for-react";
import { IDomEditor, IEditorConfig, IToolbarConfig } from "@wangeditor/editor";

interface IProps {
  value?: string;
  onChange?(value: string): void;
}

const RuiEditor = memo<IProps>((props) => {
  const [editor, setEditor] = useState<IDomEditor | null>(null);

  // 工具栏配置
  const toolbarConfig: Partial<IToolbarConfig> = {};

  // 编辑器配置
  const editorConfig: Partial<IEditorConfig> = {
    placeholder: "请输入内容...",
  };

  // 及时销毁 editor ，重要！
  useEffect(() => {
    return () => {
      if (editor == null) return;
      editor.destroy();
      setEditor(null);
    };
  }, [editor]);

  return (
    <div style={{ border: "1px solid #ccc" }}>
      <Toolbar editor={editor} defaultConfig={toolbarConfig} mode="default" style={{ borderBottom: "1px solid #ccc" }} />
      <Editor
        defaultConfig={editorConfig}
        value={props.value}
        onCreated={setEditor}
        onChange={(editor) => {
          props.onChange?.(editor.getHtml());
        }}
        mode="default"
        style={{ minHeight: "300px", overflowY: "hidden" }}
      />
    </div>
  );
});

export default RuiEditor;
