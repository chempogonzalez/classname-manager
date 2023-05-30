
export type Prettify<T> = {
  [K in keyof T]: T[K]
// eslint-disable-next-line @typescript-eslint/ban-types
} & {}


type ClassName = string | Array<string>

type PureType<T, Type> = T extends (Type | undefined) ? Type : T extends Type ? Type : T

type PureString<T> = PureType<T, string>
type PureBoolean<T> = PureType<T, boolean>


type OmitUndef<T> = T extends (string | undefined) ? Exclude<T, undefined> : T extends string ? T : never


type Schema<Props extends Record<string, unknown>> = {
  base?: ClassName
  dynamicVariants?: Prettify<{
    [propsKey in keyof Props]?: PureString<Props[propsKey]> extends string
      // String or string union ('primary' | 'secondary')
      ? Prettify<{
        [strValue in OmitUndef<Props[propsKey]>]?: {
          [propValueKey in strValue]: ClassName
        }[strValue]
      } & { DEFAULT?: Props[propsKey] }>

      // Boolean case
      : PureBoolean<Props[propsKey]> extends boolean
        ? Prettify<{
          [strValue in 'true' | 'false']?: {
            [propValueKey in strValue]: ClassName
          }[strValue]
        } & { DEFAULT?: boolean }>

        // Rest of cases
        : {
            [variantValue: string]: string
          }
  }>
  dynamicClassNames?: {
    [key: string]: boolean
  }
}

type SchemaFunction<T extends Record<string, unknown>> = (
  props: Prettify<T & { extraClassNames?: ClassName }>
) => string




/**
 * Returns a function which allows you to generate the class name string
 * based on the schema and props passed to it.
 *
 * @param schemaInitializer - A function which returns a schema object and accepts props as an argument.
 *
 * @example
 *
 * ```ts
 *
 * // Define a schema based on props
 * const getClassName = classNameManager(props => ({
 *  base: 'base-class',
 *  dynamicVariants: {
 *   variant: {
 *    DEFAULT: 'primary' // Point to the primary variant by default
 *    primary: 'primary-variant',
 *    secondary: 'secondary-variant',
 *   }
 *  },
 *  dynamicClassNames: {
 *   'is-active': props.isActive
 *  }
 *  }))
 *
 * const buttonClassName = getClassName({ variant: 'secondary', isActive: true })
 *
 * // Returns: 'base-class secondary-variant is-active'
 *
 *
 * ```
 */
export function classNameManager <T extends Record<string, unknown>> (
  schemaInitializer: (props: T) => Schema<T>
): SchemaFunction<T>


/**
 *
 * Returns a function which allows you to generate the class name string
 * based on the schema and props passed to it.
 *
 * @param schema - The schema object.
 *
 * @example
 *
 * ```ts
 *
 * // Define a schema based on props
 * const getClassName = classNameManager({
 *  base: 'base-class',
 *  dynamicVariants: {
 *   styleType: {
 *    DEFAULT: 'primary' // Point to the primary variant by default
 *    primary: 'primary-variant',
 *    secondary: 'secondary-variant',
 *   }
 *  },
 * })
 *
 * const buttonClassName = getClassName({ styleType: 'secondary', isActive: true })
 *
 * // Returns: 'base-class secondary-variant is-active'
 *
 *
 * ```
 */
export function classNameManager <T extends Record<string, unknown>> (
  schema: Schema<T>
): SchemaFunction<T>





/**
 * @internal
 */
export function classNameManager <T extends Record<string, unknown>> (
  schemaOrFunc: ((props: T) => Schema<T>) | Schema<T> = {} as unknown as ((props: T) => Schema<T>) | Schema<T>,
): SchemaFunction<T> {
  return (componentProps: any) => {
    const schemaObject = typeof schemaOrFunc === 'function'
      ? schemaOrFunc(componentProps)
      : schemaOrFunc

    const { extraClassNames } = componentProps
    const { base, dynamicVariants, dynamicClassNames } = schemaObject

    const classNameArray = [base ?? '']

    if (dynamicVariants) {
      Object.entries(dynamicVariants).forEach(([key, value]: any) => {
        const propValue = componentProps[key]
        const schemaValue = value[propValue] ?? value[value.DEFAULT]
        schemaValue && classNameArray.push(schemaValue)
      })
    }

    if (dynamicClassNames) {
      Object.entries(dynamicClassNames).forEach(([key, value]) => {
        value && classNameArray.push(key)
      })
    }

    if (extraClassNames) classNameArray.push(extraClassNames)

    return classNameArray.flat(4).join(' ').trim()
  }
}

export const cnm = classNameManager
