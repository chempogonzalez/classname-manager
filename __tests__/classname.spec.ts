import { describe, it, expect } from 'vitest'

import { classNameManager } from '../src'



type ButtonProps = {
  styleType?: 'primary' | 'secondary'
  isEnabled?: boolean
}

describe('<< classNameManager >>', () => {
  describe('------------------- [base] --------------------', () => {
    it('- is filled', () => {
      const result = 'btn-base'

      const getClassName = classNameManager<ButtonProps>({
        base: 'btn-base',
      })

      const className = getClassName({ styleType: 'primary' })
      expect(className).toBe(result)
    })

    it('- not filled', () => {
      const result = ''


      const getClassNameEmptyObj = classNameManager<ButtonProps>({})
      /* @ts-expect-error - undefined is not allowed */
      const getClassNameUndefined = classNameManager<ButtonProps>(undefined)
      /* @ts-expect-error - expect 1 argument and is 0 */
      const getClassNameNoArgs = classNameManager<ButtonProps>()


      const className = getClassNameEmptyObj({ styleType: 'primary' })
      const className1 = getClassNameUndefined({ styleType: 'primary' })
      const className2 = getClassNameNoArgs({ styleType: 'primary' })

      expect(className).toBe(result)
      expect(className1).toBe(result)
      expect(className2).toBe(result)
    })
  })


  describe('--------------- [dynamicVariants] -------------', () => {
    it('- is filled', () => {
      const result = 'btn-base btn-primary'

      const getClassName = classNameManager<ButtonProps>({
        base: 'btn-base',
        dynamicVariants: {
          styleType: {
            DEFAULT: 'primary',
            primary: 'btn-primary',
            secondary: 'btn-secondary',
          },
        },
      })

      const className = getClassName({ styleType: 'primary' })
      expect(className).toBe(result)
    })

    it('- is filled with boolean', () => {
      const result = 'btn-base btn-primary btn-enabled'

      const getClassName = classNameManager<ButtonProps>({
        base: 'btn-base',
        dynamicVariants: {
          styleType: {
            DEFAULT: 'primary',
            primary: 'btn-primary',
            secondary: 'btn-secondary',
          },
          isEnabled: {
            DEFAULT: true,
            true: '',
          },
        },
      })

      const className = getClassName({ styleType: 'primary', isEnabled: true })
      expect(className).toBe(result)
    })

    it('- is filled with array', () => {
      const result = 'btn-base btn-primary btn-primary-2 btn-enabled btn-enabled-2'

      const getClassName = classNameManager<ButtonProps>({
        base: 'btn-base',
        dynamicVariants: {
          styleType: {
            primary: [
              'btn-primary',
              'btn-primary-2',
            ],
            secondary: 'btn-secondary',
          },
          isEnabled: {
            DEFAULT: true,
            true: ['btn-enabled', 'btn-enabled-2'],
            false: '',
          },
        },
      })

      const className = getClassName({ styleType: 'primary', isEnabled: true })
      expect(className).toBe(result)
    })

    it('- not valid values', () => {
      const result = ''

      const getClassNameEmptyObj = classNameManager<ButtonProps>({ dynamicVariants: {} })

      const getClassNameUndefined = classNameManager<ButtonProps>({ dynamicVariants: undefined })
      /* @ts-expect-error - Is not a string */
      const getClassNameNoArgs = classNameManager<ButtonProps>({ dynamicVariants: '' })


      const className = getClassNameEmptyObj({ styleType: 'primary' })
      const className1 = getClassNameUndefined({ styleType: 'primary' })
      const className2 = getClassNameNoArgs({ styleType: 'primary' })

      expect(className).toBe(result)
      expect(className1).toBe(result)
      expect(className2).toBe(result)
    })
  })


  describe('-------------- [dynamicClassNames] -------------', () => {
    it('- is filled', () => {
      const result = 'btn-base dynamic-class'

      const getClassName = classNameManager<ButtonProps>(props => ({
        base: 'btn-base',
        dynamicClassNames: {
          'dynamic-class': props.styleType === 'primary',
        },
      }))

      const className = getClassName({ styleType: 'primary' })
      expect(className).toBe(result)
    })
  })
  describe('-------------- [extraClassNames] ---------------', () => {
    it('- is filled', () => {
      const result = 'btn-base dynamic-class extra-class'

      const getClassName = classNameManager<ButtonProps>(props => ({
        base: 'btn-base',
        dynamicClassNames: {
          'dynamic-class': props.styleType === 'primary',
        },
      }))

      const className = getClassName({ styleType: 'primary', extraClassNames: 'extra-class' })
      expect(className).toBe(result)
    })
  })
})
