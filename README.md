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
  styleType: 'primary' | 'secondary'
  color: 'light' | 'dark'
  disabled: boolean
}

/**
 * Define once the class schema
 * based on possible values from props
 * 
 * @example 
 *  - props: { styleType: 'primary', color: 'light' }
 *    Result: 'btn btn-primary text-black bg-white'
 * 
 */
const getButtonClassName = classNameManager<ButtonProps>({
  base: 'btn',
  dynamicVariants: {
    styleType: {
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
    [ "cnm([^ç]*?(base\\:|dynamicVariants\\:)+[^ç]*?)\\}\\);?(\r\n|\r|\n)", "[\"'`]([^\"'`]*).*?[\"'`]" ],
    [ "classNameManager([^ç]*?(base\\:|dynamicVariants\\:)+[^ç]*?)\\}\\);?(\r\n|\r|\n)", "[\"'`]([^\"'`]*).*?[\"'`]" ]
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
<br>


### 🔖 SCHEMA object properties

> All schema properties values can be either a string or an array of strings

<br>

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
    styleType: {
      primary: 'btn-primary',
      secondary: 'btn-secondary',
    },
    enabled: {
      true: 'bg-transparent',
      false: 'bg-gray',
    }
  }
})

getClassName({ styleType: 'secondary' })
// Result: 'btn btn-secondary'
```

The example above doesn't return any value from the `enabled` property because it's not passed in the function call. You can handle this by adding a `DEFAULT` property to the schema object values
##### - DEFAULT dynamicVariant value

```diff
const getClassName = cnm({
  base: 'btn',
  dynamicVariants: {
    styleType: {
      primary: 'btn-primary',
      secondary: 'btn-secondary',
    },
    enabled: {
+     DEFAULT: false,
      true: 'bg-transparent',
      false: 'bg-gray',
    }
  }
})

getClassName({ styleType: 'secondary' })
+ // Result: 'btn btn-secondary bg-gray'
```

> **Note:** Although you can use the `DEFAULT` property, it is optional. <br>In most cases it's recommended to initialize props with a _`default value from js/ts`_ side to have a better control if you need to use it in other places



<br>

#### 🟣 `dynamicClassNames` _(object)_
In case you need to apply some logic to calculate if some classes should be added, you can add it like the example below:

```ts
const getClassName = cnm(({ status }) => {
  const isDisabled = isButtonDisabled(status)
  return {
    base: 'btn',
    dynamicVariants: {
      styleType: {
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
// Result: 'btn btn--disabled'
```

<br>

### ⏬ Returned function
When you define your schema, it returns another function that you can use to get the class names based on the props passed in. You can pass an extra property:

#### 🟣 `extraClassNames` _property (string | Array\<string\>)_
You can add extra classes to the end of the returned value by using the `extraClassNames` property

```ts
interface ButtonProps {
  styleType: 'primary' | 'secondary'
}

const getClassName = cnm<ButtonProps>({
  base: 'btn',
  /* your schema */
})

/**
 * It allows you to pass extra classes at
 * the end of the returned value
 */
getClassName({ styleType: 'primary', extraClassNames: 'font-bold' })
// Result: 'btn btn-primary font-bold'
```


<br>
<br>

> Created with Typescript! ⚡ and latin music 🎺🎵
