---
title: How to Build Receipts Using JavaScript

created: 07-04-24
date: July 4th, 2024

category: code
---

At [ResaleAI](https://resaleai.com/), our customers depend on us to provide them with the tools they need to run their businesses. One of the most important tools we provide is the ability to generate receipts and other printed slips for their customers and business.

Initially, these receipts were built by hand, splicing raw [ESC/POS](https://mike42.me/blog/what-is-escpos-and-how-do-i-use-it) commands into strings and sending them to the printer. Building receipts in this way was very tedious and error-prone, preventing necessary changes from being made quickly and efficiently.

To solve this problem, we needed a library capable of two things:

1. **Building receipts in a structured and reusable manner**
2. **Rendering those receipts into multiple formats**

While there are definitely many JavaScript libraries we can use to accomplish #1, we needed the ability to render the receipts into both HTML and raw ESC/POS commands. After some research, we decided to build our own library to accomplish this. Let's take a look at how you can use our library to build your own receipts.

There's a guide below, but check it out on [GitHub](https://www.github.com/resaleai/receipt-components)!

## Getting Started

First, you'll need to install the package from npm:

```bash
pnpm add @resaleai/receipt-components
```

Now we can start building receipts! This library is inspired by the component systems of popular frontend libraries like React and Vue, so building receipts should feel familiar to you if you've used those libraries before. To start, we simply define a receipt component as a simple function that returns a receipt.

```typescript
import { rc, text } from "@resaleai/receipt-components"

function FirstReceipt() {
  return rc("receipt", null, [text("Hello, World!")])
}
```

In this example, we've defined a simple receipt component that renders the text "Hello, World!". To do this, we've used the `rc` function. You can think of `rc` as a function that returns a receipt node (similar to Vue's `h` function or React's `createElement`). There are a lot more nodes you can use to build out your receipts. Read more about them on the [wiki](https://github.com/ResaleAI/receipt-components/wiki/Nodes)

```typescript
import { rc, text, render } from "@resaleai/receipt-components"

function FirstReceipt() {
  return rc("receipt", null, [text("Hello, World!")])
}

render(FirstReceipt, "escpos", null).then((result) => {
  console.log(result)
})
```

The above code will print out the ESC/POS bytes necessary to print the receipt "Hello, World!" to the console. In order to actually print this receipt, you'll need to send directly write these bytes to the printer. Using Node, this can be done by writing directly to stdout and redirecting that to the printer.

```typescript
import process from "process"

// above code stays the same

render(FirstReceipt, "escpos", null).then((result) => {
  process.stdout.write(result)
})
```

Then, you can run the script and pipe the output to your printer:

```bash
node script.js > /dev/usb/lp0 # or whatever device your printer is on
```

## Using XML to define receipts

In addition to defining receipts using JavaScript functions, you can also define receipts using XML. This can be useful if you want to define your receipts in a more declarative way.

To get started, first install the XML parser plugin:

```bash
pnpm add @resaleai/rc-xml
```

Then, we can define our receipt with XML using the `rcFromTemplate` function:

```typescript
import rcFromTemplate from "@resaleai/rc-xml"
import { render } from "@resaleai/receipt-components"

const FirstReceipt = rcFromTemplate(
  () => `
  <receipt>
    Hello, World!
  </receipt>
`,
)

// we still use the same render function as before, meaning you can compose XML and JS components together
render(FirstReceipt, "escpos", null).then((result) => {
  console.log(result)
})
```

This will print out the same ESC/POS bytes as before, but this time we've defined the receipt using XML. The main restriction with XML is that you can't easily pass objects or arrays as props. If you need to do this, you should use JavaScript functions instead.

## Using the component system

As previously mentioned, this library is inspired by the component systems of popular frontend libraries like React and Vue. This means that you can build your receipts using a component system, making them easy to read and maintain.

### Props

You may have been wondering why we have to pass `null` as the second argument to `rc`. This is because the second argument is reserved for props, which we can use to pass data to our components. This makes for a very flexible system that can be used to build complex receipts using simple building blocks.

For example, let's say we want to build a receipt that displays the total price of an order. We can define a `TotalPrice` component that takes a `price` prop and renders the total price in bold:

```typescript
interface TotalPriceProps {
  price: number
}

function TotalPrice({ price }: TotalPriceProps) {
  return rc("text", { bold: true }, [text(`Total Price: $${props.price}`)])
}
```

Now we can use this component in our receipt:

```typescript
function OrderReceipt() {
  return rc("receipt", null, [
    text("Order Receipt"),
    TotalPrice({ price: 100 }),
  ])
}
```

Or with XML:

```typescript
interface TotalPriceProps {
  price: number
}

const TotalPrice = rcFromTemplate(
  ({ price }: TotalPriceProps) => `
  <text bold="true">Total Price: ${price}</text>
`,
)

const OrderReceipt = rcFromTemplate(
  () => `
  <receipt>
    Order Receipt
    <TotalPrice price="100" />
  </receipt>
`,
  {
    components: {
      TotalPrice,
    },
  },
)
```

Notice we have to explicitly declare the `TotalPrice` component in the `components` object when using XML.

We can also let our root component take props, making it easy to reuse the same receipt template with different data:

```typescript
interface OrderReceiptProps {
  totalPrice: number
}

function OrderReceipt({ totalPrice }: OrderReceiptProps) {
  return rc("receipt", null, [
    text("Order Receipt"),
    TotalPrice({ price: totalPrice }),
  ])
}

render(OrderReceipt, "escpos", { totalPrice: 100 }).then((result) => {
  console.log(result)
})
```

### Children

In addition to props, components can also have children. This allows you to nest components inside each other, creating a tree-like structure that makes it easy to build complex receipts.

For example, let's say we want to control how the total price is displayed in our `TotalPrice` component. Rather than passing a `price` prop, we can display the total price as a child of the `TotalPrice` component:

```typescript
function TotalPrice(props: null, children: ReceiptAST[]) {
  return rc("text", { bold: true }, [text("Total Price: "), ...children])
}
```

Now we can use the `TotalPrice` component like this:

```typescript
function OrderReceipt() {
  return rc("receipt", null, [
    text("Order Receipt"),
    TotalPrice(null, [
      rc("text", { font: "2", underline: true }, [text("$100")]),
    ]),
  ])
}
```

And in XML:

```typescript
const TotalPrice = rcFromTemplate(
  (props) => `
  <text bold="true">Total Price: { children }</text>
`,
)
const OrderReceipt = rcFromTemplate(
  () => `
  <receipt>
    Order Receipt
    <TotalPrice>
      <text font="2" underline="true">$100</text>
    </TotalPrice>
  </receipt>
`,
  {
    components: {
      TotalPrice,
    },
  },
)
```

Notice when using XML, the children are passed as a string and must be interpolated into the template. This is subject to change, so be sure to check the docs for the latest information.

## Rendering an HTML preview

As a part of this library, we have included the ability to create different renderers and register them as plugins. This is very useful for rendering an HTML preview without changing the receipt component itself.

To get started, first install the HTML renderer plugin:

```bash
pnpm add @resaleai/receipt-html-renderer
```

Then, all you have to do is register the plugin with the `ReceiptComponent` instance from the base library:

```typescript
import ReceiptComponent, {
  rc,
  text,
  render,
} from "@resaleai/receipt-components"
import htmlRendererPlugin from "@resaleai/receipt-html-renderer"

ReceiptComponent.use(htmlRendererPlugin)
```

Now, all we have to do is change our `render` call to use the `html` renderer:

```typescript
render(FirstReceipt, "html", null).then((result) => {
  console.log(result)
})
```

This will return a bunch of HTML, which you can then render in your browser to see a preview of your receipt!

## Other plugins

On top of plugins for different renderers, we also support plugins for different receipt nodes. These nodes are actually concerned with building the receipt at a low level, which differs them from components.

For example, due to the differences in how the browser and Node handle canvases, we have a plugin for rendering images. To use it, first figure out which environment your code will be run in, and install one of the following plugin:

```bash
pnpm add @resaleai/receipt-image-node # if running in node
pnpm add @resaleai/receipt-image-browser # if running in the browser
```

Then, you can register the plugin and render images in your receipts:

```typescript
import ReceiptComponent, {
  rc,
  text,
  render,
} from "@resaleai/receipt-components"

import imagePlugin from "@resaleai/receipt-image-node" // or "@resaleai/receipt-image-browser"

ReceiptComponent.use(imagePlugin)

function FirstReceipt() {
  return rc("receipt", null, [
    text("Hello, World!"),
    rc("image", {
      src: "https://example.com/image.png",
      maxWidth: 0.5 /* % of receipt width */,
      align: "center",
    }),
  ])
}

render(FirstReceipt, "escpos", null).then((result) => {
  console.log(result)
})
```

## Conclusion

Building receipts is a critical part of many businesses, and it's important to have a library that makes this process as easy and efficient as possible. With our library, you can build receipts in a structured and reusable manner, and render them into multiple formats.

This library is used in production but still being actively developed, so be sure to check the docs for the latest information. If you have any issues or questions, feel free to open a [GitHub issue](https://github.com/ResaleAI/receipt-components/issues)
