import React, { ComponentType, ReactElement } from 'react'

export type ReactElementJSON = {
  type: string
  component?: ComponentType
  props: Record<string, any>
  children: (ReactElementJSON | null)[] | null
  value?: any
}

export default function reactElementToJson<T>(
  element: ReactElement | null
): ReactElementJSON | null {
  if (!element) {
    return null
  }

  const { type, props, key } = element

  const children = React.Children.toArray(props.children).map((child) => {
    if (React.isValidElement(child)) {
      return reactElementToJson(child as ReactElement)
    } else {
      return {
        type: typeof child,
        props: {},
        children: [],
        value: child,
      } as ReactElementJSON
    }
  })

  return {
    type:
      typeof type === 'string'
        ? type
        : type.name || ((type as ComponentType).displayName as string),
    component: typeof type === 'string' ? undefined : type,
    props: { ...props, key, children: undefined },
    children,
  }
}
