export const IDirection = ['horizontal', 'vertical'] as const
export const IStatus = ['wait', 'process', 'finish', 'error', 'success'] as const

export type IStatus = typeof IStatus[number]

export interface IStepsProps {
  space?: string
  active?: number
  direction?: typeof IDirection[number]
  alignCenter?: boolean
  simple?: boolean
  processStatus?: IStatus
  finishStatus?: IStatus
}
