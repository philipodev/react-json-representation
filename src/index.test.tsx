import { PropsWithChildren } from "react"
import { assert, expect, test } from 'vitest'
import reactElementToJson from '.'

test('simple tree', () => {
  const jsx = (
    <Node prop1="testProp1">
      <Node prop2={1}>
        <Node prop3 />
      </Node>
    </Node>
  )

  const output = reactElementToJson(jsx)

  assert.isNotNull(output)

  expect(output?.props['prop1']).toBe('testProp1')
  expect(output?.children).toHaveLength(1)

  const child = output?.children && output.children[0]
  expect(child?.props['prop2']).toBe(1)

  const grandChild = child?.children && child.children[0]
  expect(grandChild?.props['prop3']).toBe(true)
})

test('one node', () => {
  const jsx = <Node />

  const output = reactElementToJson(jsx)

  assert.isNotNull(output)
  expect(output?.children).toHaveLength(0)
})

test('null', () => {
  const jsx = null

  const output = reactElementToJson(jsx)

  expect(output).toBeNull()
})

test("string children", () => {
  const jsx = <Node>test</Node>

  const output = reactElementToJson(jsx)

  assert.isNotNull(output)
  expect(output?.children).toHaveLength(1)

  const child = output?.children && output.children[0]
  expect(child?.type).toBe('string')
  expect(child?.value).toBe('test')
});

test("get component", () => {
  const jsx = <Node/>

  const output = reactElementToJson(jsx)
  assert.isNotNull(output)

  expect(output?.component).toBe(Node);
});

interface NodeProps {
  prop1?: string
  prop2?: number
  prop3?: boolean
}

export function Node({ children }: PropsWithChildren<NodeProps>) {
  return <>{children}</>
}
