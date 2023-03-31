# react-json-representation

This function takes a react element and returns an json/object representation of its props, children etc.

### Install

`npm install react-json-representation --save`

`pnpm install react-json-representation`

`yarn add react-json-representation --save`

### Usage

```jsx

import reactElementToJson from 'react-json-representation`

const jsx = <Page value="Something">
  <Section color="red">
    <Title text="My title" />
  </Section>
</Page>

const json = reactElementToJson(jsx)

/*
output:

{
  type: "Node",
  component: Node, <-- the component function/class
  props: {
    value: "Something"
  },
  children: [
    ......
  ]
}
*/

```