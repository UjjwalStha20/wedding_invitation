import {
  createContext,
  createElement,
  useContext,
  type ReactNode,
} from 'react'
import { weddingConfig, type WeddingConfig } from '../config/wedding'

const WeddingConfigContext = createContext<WeddingConfig>(weddingConfig)

interface WeddingConfigProviderProps {
  config: WeddingConfig
  children: ReactNode
}

export function WeddingConfigProvider({
  config,
  children,
}: WeddingConfigProviderProps) {
  return createElement(
    WeddingConfigContext.Provider,
    { value: config },
    children,
  )
}

export function useWeddingConfig() {
  return useContext(WeddingConfigContext)
}
