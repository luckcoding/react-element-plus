type ValueType = string | boolean | number

export interface CheckboxProps {
  value: ValueType
  label?: string | boolean | number
  trueLabel?: string | number
  falseLabel?: string | number
  indeterminate?: boolean
  disabled?: boolean
  checked?: boolean
  name?: string
  id?: string
  controls?: string
  border?: boolean
  size?: ComponentSize

  onChange?: (value: ValueType, label: React.ReactNode) => void
  className?: string
  children?: React.ReactNode
}

export interface ICheckboxGroupContext {
  name?: string
  value?: Array<ValueType>
  disabled?: boolean
  min?: number
  max?: number
  size?: ComponentSize
  fill?: string
  textColor?: string
  checkboxGroupSize?: ComponentSize
  changeEvent?: (val: any) => void

  // onChange?: (checked: boolean, label: string) => void
}

export const ElCheckboxGroup = 'ElCheckboxGroup'
