# lc-validator-IBAN

This is a [lc-form-validation](https://github.com/Lemoncode/lcFormValidation) add-on that brings validation capabilities for:
*  International Bank Account Number (IBAN).

 This validator follows the next steps:
 - Check that the total IBAN length is correct as per the country. If not, the IBAN is invalid.
 - Move the four initial characters to the end of the string.
 - Replace each letter in the string with two digits, thereby expanding the string, where A = 10, B = 11, ..., Z = 35
 - Interpret the string as a decimal integer and compute the remainder of that number on division by 97
 - If the remainder is 1, the check digit test is passed and the IBAN might be valid.
 

Please, refer to [lc-form-validation](https://github.com/Lemoncode/lcFormValidation) to know more.

## CodeSandbox example
[CodeSandbox example](https://codesandbox.io/s/l58136v14z)
## License
[MIT](./LICENSE)

# About Basefactor + Lemoncode

We are an innovating team of Javascript experts, passionate about turning your ideas into robust products.

[Basefactor, consultancy by Lemoncode](http://www.basefactor.com) provides consultancy and coaching services.

[Lemoncode](http://lemoncode.net/services/en/#en-home) provides training services.

For the LATAM/Spanish audience we are running an Online Front End Master degree, more info: http://lemoncode.net/master-frontend
