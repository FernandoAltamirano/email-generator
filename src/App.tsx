import {
  ChangeEventHandler,
  MouseEventHandler,
  useEffect,
  useState,
} from "react";
import { renderBody, renderFooter, renderHeader } from "./html";
import copyToClipboard from "copy-to-clipboard";
import { Content } from "./interfaces/Content";
import Editor from "./modules/editor/Editor";

function App() {
  const [content, setContent] = useState<Content[]>([]);
  const [htmlCompleteContent, setHtmlCompleteContent] = useState<string>("");
  const [editedContent, setEditedContent] = useState<string>("");
  const [showEditor, setShowEditor] = useState<boolean>(false);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    if (showEditor) {
      return window.alert(
        "You can't edit the template while you are editing the code. Please close the editor and try again."
      );
    }
    setContent((content) =>
      content.map((el) => {
        if (el.name === event.target.name) {
          return { ...el, value: event.target.value };
        }
        return el;
      })
    );
  };
  const handleAddInput: MouseEventHandler<HTMLButtonElement> = () => {
    setContent([...content, { name: `content-${Date.now()}`, value: "" }]);
  };

  const renderContent: () => string = () =>
    `${renderBody({
      header: renderHeader(),
      footer: renderFooter(),
      content,
    })}`;

  const handleCopyToTheClipboard = async () => {
    copyToClipboard(htmlCompleteContent);
    window.alert("The template has been copied to the clipboard");
  };

  const handleEditView = () => {
    setShowEditor((showEditor) => !showEditor);
    setEditedContent(htmlCompleteContent);
  };

  const handleSetEditedContent = (value: string) => {
    setEditedContent(value);
  };

  const handleSaveChanges = () => {
    setHtmlCompleteContent(editedContent);
    setEditedContent(editedContent);
    setShowEditor(false);
    content.forEach((el) => {
      const element = document.getElementById(el.name);
      console.log("🏝️ ~ content.forEach ~ element:", element);
      if (element) {
        setContent((content) =>
          content.map((el) => {
            if (el.name === element.id) {
              return { ...el, value: element.innerHTML };
            }
            return el;
          })
        );
      }
    });
  };

  const handleCancelChanges = () => {
    handleEditView();
  };

  const handleDeleteContentInput = (id: string) => {
    setContent((content) => content.filter((el) => el.name !== id));
    document.getElementById(id)?.remove();
  }

  useEffect(() => {
    setHtmlCompleteContent(renderContent());
  }, [content]);

  return (
    <div className="app">
      <section
        style={{
          maxWidth: showEditor ? "50vw" : "100vw",
          transition: "300ms all",
        }}
      >
        <div className="action-buttons-container">
          <button className="action" onClick={handleAddInput}>
            add content paragraph
          </button>
          <button className="action" onClick={handleCopyToTheClipboard}>
            Copy to the clipboard
          </button>
          <button className={`action ${showEditor ? "active" : ""}`} onClick={handleEditView}>
            Edit template code
          </button>
        </div>
        <div className="content-inputs-container">
          {content.map((el) => (
            <div className="content-item">
              <input
                type="text"
                name={el.name}
                value={el.value}
                onChange={handleChange}
              />
              <button onClick={() => handleDeleteContentInput(el.name)}>Delete</button>
            </div>
          ))}
        </div>
        <div
          dangerouslySetInnerHTML={{
            __html: showEditor ? editedContent : htmlCompleteContent,
          }}
        />
      </section>
      <section style={{
        maxWidth: showEditor ? "50vw" : "0",
        transition: "300ms all",
      }}>
        {showEditor && (
          <Editor
            html={editedContent}
            onChange={handleSetEditedContent}
            handleCancelChanges={handleCancelChanges}
            handleSaveChanges={handleSaveChanges}
          />
        )}
      </section>
    </div>
  );
}

export default App;
