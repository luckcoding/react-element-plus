import { createContext, useContext } from "react";
import { ICollapseContext } from './types'

export const CollapseContext = createContext<ICollapseContext>({} as ICollapseContext);
export const useCollapse = () => useContext(CollapseContext)
