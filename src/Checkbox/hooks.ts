import { createContext, useCallback, useContext, useEffect, useMemo, useRef } from "react";
import { FormContext, FormItemContext } from "../Form/hooks";
import { useGlobalConfig } from "../_utils/util"
import { ICheckboxGroupContext, CheckboxProps, ElCheckboxGroup } from "./types";

export const CheckboxGroupContext = createContext<ICheckboxGroupContext>(undefined);

export const useCheckboxGroup = () => {
  const globalConfig = useGlobalConfig()
  const form = useContext(FormContext)
  const formItem = useContext(FormItemContext)
  const checkboxGroup = useContext(CheckboxGroupContext)
  const isGroup = useMemo(() => checkboxGroup?.name === ElCheckboxGroup, [checkboxGroup?.name])
  const formItemSize = useMemo(() => formItem?.size, [formItem?.size])
  return {
    isGroup,
    globalConfig,
    checkboxGroup,
    form,
    formItem,
    formItemSize,
  }
}

const useModel = (props: CheckboxProps) => {
  let selfModel = false

  const { isGroup, checkboxGroup } = useCheckboxGroup()
  const isLimitExceeded = useRef(false)
  const store = useMemo(() => {
    return checkboxGroup ? checkboxGroup.value : props.value
  }, [checkboxGroup?.value, props.value])

  const value = useMemo(() => {
    return isGroup ? store : props.value ?? selfModel
  }, [isGroup, props.value])

  const setValue = useCallback((val: unknown) => {
    if (isGroup && Array.isArray(val)) {
      isLimitExceeded.current = false

      if (checkboxGroup.min !== undefined && val.length < checkboxGroup.min) {
        isLimitExceeded.current = true
      }
      if (checkboxGroup.max !== undefined && val.length > checkboxGroup.max) {
        isLimitExceeded.current = true
      }

      isLimitExceeded.current === false && checkboxGroup.changeEvent?.(val)
    } else {
      // todo
      // emit(UPDATE_MODEL_EVENT, val)
      selfModel = val as boolean
    }
  }, [isGroup])

  return {
    value,
    setValue,
    isLimitExceeded: false,
  }
}

const useCheckboxStatus = (props: CheckboxProps, model: PartialReturnType<typeof useModel>) => {
  const { isGroup, checkboxGroup, formItemSize, globalConfig } = useCheckboxGroup()
  const focus = useRef(false)
  const size = useMemo(() => checkboxGroup?.checkboxGroupSize || formItemSize || globalConfig.size, [
    checkboxGroup?.checkboxGroupSize, formItemSize, globalConfig.size
  ])
  const isChecked = useMemo(() => {
    const value = model.value
    if (typeof value === 'boolean') {
      return value
    } else if (Array.isArray(value)) {
      return value.includes(props.label)
    } else if (value !== null && value !== undefined) {
      return value === props.trueLabel
    }
  }, [model.value, props.label, props.trueLabel])
  const checkboxSize = useMemo(() => {
    const temCheckboxSize = props.size || formItemSize || globalConfig.size
    return isGroup ? checkboxGroup?.checkboxGroupSize || temCheckboxSize : temCheckboxSize
  }, [props.size, formItemSize, globalConfig.size, isGroup, checkboxGroup?.checkboxGroupSize])

  return {
    isChecked,
    focus,
    size,
    checkboxSize,
  }
}

export const useDisabled = (
  props: CheckboxProps,
  model: PartialReturnType<typeof useModel>,
  isChecked: PartialReturnType<typeof useCheckboxStatus>
) => {
  const { form, isGroup, checkboxGroup } = useCheckboxGroup()

  const isLimitDisabled = useMemo(() => {
    const max = checkboxGroup?.max
    const min = checkboxGroup?.min

    return !!(max || min)
      && (Array.isArray(model.value) && model.value.length >= max && !isChecked)
      || (Array.isArray(model.value) && model.value.length <= min && !isChecked)
  }, [])

  const isDisabled = useMemo(() => {
    const disabled = props.disabled || form?.disabled
    return isGroup
      ? checkboxGroup.disabled || disabled || isLimitDisabled
      : props.disabled || form?.disabled;
  }, [isGroup, props.disabled, form?.disabled, isLimitDisabled])

  return {
    isDisabled
  }
}

const setStoreValue = (props: CheckboxProps, model: PartialReturnType<typeof useModel>) => {
  function addToStore() {
    if (Array.isArray(model.value) && !model.value.includes(props.label)) {
      model.value.push(props.label)
    } else {
      model.value = props.trueLabel || true
    }
  }
  props.checked && addToStore()
}

const useEvent = (props: CheckboxProps, { isLimitExceeded }: PartialReturnType<typeof useModel>) => {
  const { formItem } = useCheckboxGroup()

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (isLimitExceeded) return
    const value = e.target.checked
      ? props.trueLabel ?? true
      : props.falseLabel ?? false

    props.onChange?.(value, e)
  }

  useEffect(() => {
    // todo
    // elFormItem.formItemMitt?.emit('el.form.change', [val])
  }, [props.value])

  return {
    handleChange,
  }
}

export const useCheckbox = (props: CheckboxProps) => {
  const { value, isLimitExceeded } = useModel(props)
  const { focus, size, isChecked, checkboxSize } = useCheckboxStatus(props, { value })
  const { isDisabled } = useDisabled(props, { value }, { isChecked })
  const { handleChange } = useEvent(props, { isLimitExceeded })

  setStoreValue(props, { value })

  return {
    isChecked,
    isDisabled,
    checkboxSize,
    value,
    handleChange,
    focus,
    size,
  }
}
