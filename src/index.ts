
type ClassName = string | Array<string>


type ToBoolean<T> = T extends string
  ? T extends 'true'
    ? true
    : false
  : never

interface Schema<Props> {
  base: ClassName
  dynamicVariants?: {
    [propsKey in keyof Props]?: Props[propsKey] extends string
    // String or string union ('primary' | 'secondary')
      ? {
          [strValue in Props[propsKey]]?: {
            [propValueKey in strValue]: ClassName
          } & { DEFAULT?: strValue }
        }[Props[propsKey]]

    // Boolean case
      : Props[propsKey] extends boolean
        ? {
            [strValue in 'true' | 'false']?: {
              [propValueKey in strValue]: ClassName
            } & { DEFAULT?: ToBoolean<strValue> }
          }['true' | 'false']
        : never
  }
  dynamicClassNames?: {
    [key: string]: boolean
  }
}

type SchemaFunction<T> = (props: T & { extraClassNames?: ClassName }) => string





/**
 *
 * @param schemaWithProps
 */
export function classNameManager <T> (
  schemaWithProps: (props: T) => Schema<T>
): SchemaFunction<T>


/**
 *
 * @param schema
 */
export function classNameManager <T> (
  schema: Schema<T>
): SchemaFunction<T>



/**
 * @internal
 */
export function classNameManager <T> (
  schemaOrFunc: ((props: T) => Schema<T>) | Schema<T>,
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
