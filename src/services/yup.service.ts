import * as yup from 'yup'

// yup.d.ts
declare module 'yup' {
  interface StringSchema {
    noOnlySpaces(): this
    // Declare more extensions here
  }
}

// Define your extensions here
const extensions = [
  {
    name: 'noOnlySpaces',
    fn: function (this: yup.StringSchema) {
      return this.test('no-only-spaces', 'Please enter the valid text', function (value) {
        if (typeof value === 'string' && value) {
          return value.trim().length > 0
        }
        return true
      })
    }
  }
  // Add more extensions here
]

// Add each extension method to yup.string
for (const extension of extensions) {
  yup.addMethod(yup.string, extension.name, extension.fn)
}

export default yup
