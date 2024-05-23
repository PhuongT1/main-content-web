import createComponentContext from '@/utils/create-component-context'

export const EducationalContext = createComponentContext<{ handleDirty: (data: boolean) => void }>('EducationalWrapper')
