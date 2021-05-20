import { createContext } from "react";
import { IFormContext, IFormItemContext } from './types'

export const FormContext = createContext<IFormContext>(undefined);
export const FormItemContext = createContext<IFormItemContext>(undefined);
