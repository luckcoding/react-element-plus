import { createContext, useContext } from "react";
import { IBreadcrumbContext } from './types'

export const BreadcrumbContext = createContext<IBreadcrumbContext>({} as IBreadcrumbContext);
export const useBreadcrumb = () => useContext(BreadcrumbContext)
