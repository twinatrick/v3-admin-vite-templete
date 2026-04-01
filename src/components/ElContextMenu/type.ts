export type ContextMenuOptionProps = {
  value: string | number
  label: string
  disabled: boolean
  onClick: (option: ContextMenuOptionProps) => void
  children: ContextMenuOptionProps[]
}
