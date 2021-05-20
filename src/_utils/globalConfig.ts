export interface GlobalConfig { size?: ComponentSize, zIndex?: number}

const globalConfig: GlobalConfig = {
  size: 'medium',
  zIndex: 0,
}

export function setGlobalConfig ({ size, zIndex }: GlobalConfig) {
  typeof size !== 'undefined' && (globalConfig.size = size)
  typeof zIndex !== 'undefined' && (globalConfig.zIndex = zIndex)
  Object.freeze(globalConfig)
}

export function getGlobalConfig() {
  return globalConfig
}
