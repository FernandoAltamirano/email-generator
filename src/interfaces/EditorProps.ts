
export interface EditorProps {
  html: string
  onChange: (html:string) => void
  handleCancelChanges: () => void
  handleSaveChanges: () => void
}