import { ReactNode, createContext, useContext } from 'react'

// Function to create a dynamic context and its associated hook with generic types
export function createComponentContext<T>(ComponentName: string) {
  const hookName = `use${ComponentName}Context`

  const Context = createContext<T | undefined>(undefined)

  interface ProviderProps {
    children: ReactNode
    value: T
  }

  const Provider = ({ children, value }: ProviderProps) => {
    return <Context.Provider value={value}>{children}</Context.Provider>
  }

  const useContextHook = (): T => {
    const context = useContext(Context)
    if (!context) {
      throw new Error(`${hookName} should be used within the scope of ${ComponentName} component`)
    }
    return context
  }

  return { Provider, useContextHook }
}

export default createComponentContext
