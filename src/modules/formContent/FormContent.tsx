import { useState, ChangeEventHandler } from "react";
import { Content } from "../../interfaces/Content";

interface FormContentProps{
  showEditor: boolean;
  content: Content[];
  setContent: React.Dispatch<React.SetStateAction<Content[]>>;
}
function FormContent(props: FormContentProps) {
  const {content, setContent, showEditor} = props;
  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    if (showEditor) {
      return window.alert(
        "No puedes editar el contenido mientras estás en la vista de edición HTML. Cierra el panel derecho para poder editar el contenido."
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

  const handleDeleteContentInput = (id: string) => {
    setContent((content) => content.filter((el) => el.name !== id));
    document.getElementById(id)?.remove();
  }

  return (
    <>
    {content.map((el) => (
            <div className="content-item">
              <input
                type="text"
                name={el.name}
                value={el.value}
                onChange={handleChange}
              />
              <button onClick={() => handleDeleteContentInput(el.name)}>Borrar</button>
            </div>
          ))}
    </>
  )
}

export default FormContent