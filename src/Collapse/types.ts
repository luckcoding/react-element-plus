export type ICollapseName = string | number
export interface ICollapseContext {
  name: string
  activeNames: Array<ICollapseName>
  handleItemClick: (name: ICollapseName) => void
}
