import {
  ChangeEventHandler,
  MouseEventHandler,
  useEffect,
  useState,
} from "react";
import { renderBody, renderFooterEN, renderFooterES, renderHeader } from "./html";
import copyToClipboard from "copy-to-clipboard";
import { Editor, FormContent } from "./modules/modules";
import { Content } from "./interfaces/Content";

function App(): JSX.Element {
  const [content, setContent] = useState<Content[]>([]);
  const [htmlCompleteContent, setHtmlCompleteContent] = useState<string>("");
  const [editedContent, setEditedContent] = useState<string>("");
  const [showEditor, setShowEditor] = useState<boolean>(false);
  const [lang, setLang] = useState<string>("es");

  const handleAddInput: MouseEventHandler<HTMLButtonElement> = () => {
    setContent([...content, { name: `content-${Date.now()}`, value: "" }]);
  };

  const defaultRenderContent: () => string = () =>
    `${renderBody({
      header: renderHeader(),
      footer: lang === "en" ? renderFooterEN() : renderFooterES(),
      content,
      lang,
    })}`;

  const handleCopyToTheClipboard = async () => {
    copyToClipboard(htmlCompleteContent.replace(/<\/tr>,<tr>/g, "<\/tr><tr>"));
    window.alert("El contenido ha sido copiado al portapapeles.");
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

  const handleChangeLang: ChangeEventHandler<HTMLInputElement> = (ev) => {
    console.log(ev.target.id)
    if (ev.target.id === "es") {
      setLang("es");
    } else {
      setLang("en");
    }
  }

  useEffect(() => {
    setHtmlCompleteContent(defaultRenderContent());
  }, [content, lang]);

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
            Añadir nuevo párrafo
          </button>
          <button className="action" onClick={handleCopyToTheClipboard}>
            Copiar al portapapeles
          </button>
          <button className={`action ${showEditor ? "active" : ""}`} onClick={handleEditView}>
            Editar código HTML
          </button>
          <div className="lang-container">
            <label htmlFor="es">ES<input checked={lang === "es"} id="es" type="radio" name="lang" onChange={handleChangeLang} /></label>
            <label htmlFor="en">EN<input checked={lang === "en"} id="en" type="radio" name="lang" onChange={handleChangeLang} /></label>
          </div>
        </div>
        <div className="content-inputs-container">
          <FormContent showEditor={showEditor} content={content} setContent={setContent} />
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
