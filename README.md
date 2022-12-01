# 🖌️ classname-manager
[![npm version](https://img.shields.io/npm/v/classname-manager?color=blue&style=flat-square)](https://www.npmjs.com/package/classname-manager)
[![bundle-size](https://img.shields.io/bundlephobia/minzip/classname-manager/latest?color=orange&style=flat-square)](https://bundlephobia.com/package/classname-manager@latest)

ClassNames manager to easily get classes for component variants



> Super tiny manager to merge, extend and dynamically add class names focused on variations
>
> 
## 🚀 **Features**
- ✅ Super simple and minimalistic
- 🔑 Type-safe (Typescript)
- ❌ No more manual matching classes to props or adding types
- 🧬 TailwindCSS Intellisense support

## 📦 **Install**
```bash
# NPM
npm install classname-manager

# YARN
yarn add classname-manager

# PNPM
pnpm add classname-manager
```
## 💻 **Usage example**

```tsx
import { classNameManager } from 'classname-manager'

interface ButtonProps {
  type: 'primary' | 'secondary'
  color: 'light' | 'dark'
  disabled: boolean
}

/**
 * Define once the class schema
 * based on possible values from props
 * 
 * @example 
 *  - props: { type: 'primary', color: 'light' }
 *    Result: 'btn btn-primary text-black bg-white'
 * 
 */
const getButtonClassName = classNameManager<ButtonProps>({
  base: 'btn',
  dynamicVariants: {
    type: {
      primary: 'btn-primary',
      secondary: 'btn-secondary',
    },
    color: {
      light: 'text-black bg-white',
      dark: 'text-white bg-black',
    },
    disabled: {
      true: 'btn-disabled bg-gray'
    }
  }
})


const Button = (props: ButtonProps) => {
  const btnClassName = getButtonClassName(props)

  return (
    <button className={btnClassName}>{props.label}</button>
  )
}
```

<br>




## 🧬 TailwindCSS Plugin config _(VSCode)_
In order to allow the tailwindcss plugin intellisense to work properly with `classname-manager` you will need to add the following code to your **`settings.json`** file

```jsonc
// your project > .vscode (folder) > settings.json
{
  "tailwindCSS.experimental.classRegex": [
    [ "cnm\\(([^ç]*?)\\}\\)", "[\"'`]([^\"'`]*).*?[\"'`]" ],
    [ "classNameManager\\(([^ç]*?)\\}\\)", "[\"'`]([^\"'`]*).*?[\"'`]" ]
  ]
}
```
<br>

---

<br>

## 📖 Documentation

The package exports 2 names for the main function, both executes the same:
- `classNameManager`
- `cnm` _(Reduced name)_



### ⭐ Initialization

```tsx
import { cnm } from 'classname-manager'

// By schema object
const getClassName = cnm({ /** Your schema */ })

// By callback returning the schema object
const getClassName = cnm((props) => ({ /** Your schema */ }))

```

<br>

### 🛠️ SCHEMA object properties

> All schema properties values can be either a string or an array of strings

#### 🟣 `base` _(string | Array\<string\>)_
Class to be placed at the beginning of the returned value

```ts
const getClassName = cnm({ base: 'btn', /*...*/ })
// Result: 'btn (other classes)'
```

<br>

#### 🟣 `dynamicVariants` _(object)_
Here is where you define your classes based on props passed in to the function. <br>_(For boolean values the expected properties are: true and false)_
```ts
const getClassName = cnm({
  base: 'btn',
  dynamicVariants: {
    type: {
      primary: 'btn-primary',
      secondary: 'btn-secondary',
    }
    enabled: {
      true: 'bg-transparent',
      false: 'bg-gray',
    }
  }
})

getClassName({ type: 'secondary' })
```
<br>

#### 🟣 `dynamicClassNames` _(object)_
In case you need to apply some logic to calculate if some classes should be added, you can add it like the example below:

```ts
const getClassName = cnm(({ status }) => {
  const isDisabled = isButtonDisabled(status)
  return {
    base: 'btn',
    dynamicVariants: {
      type: {
        primary: 'btn-primary',
        secondary: 'btn-secondary',
      }
    },
    dynamicClassNames: {
      'btn--disabled': isDisabled
    }
  }
})
// -----------------------------------

getClassName({ status: 'triggered' })
```

<br>
<br>

> Created with Typescript! ⚡ and latin music 🎺🎵
