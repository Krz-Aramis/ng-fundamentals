import { FormControl } from '@angular/forms' ;

// This function takes in a Form Control object as a parameter
// It should return a JS object. In Curly braces, we see the shape
// that this object should have.
// In this case, it has a field of 'any' data type.
// This is to satisfy the interface of validators. If everything
// is fine, the validator should return null, otherwise
// a JS object of the specified shape is returned.
// Observe the 'key' field and appreciate that it is reused in the HTML
// part of the component, such as to display an adequate error message.
// In it is expected that the 'key' matches the validator's name.
// So long as this returns a function, we should be fine.
export function restrictedWords(words) {
    // Here we return a function.
    // Below uses the "fat" arrow syntax.
    // However all we did was strongly type the input and output parameters using ES6.
    return (control: FormControl): {[key: string]: any} => {
      // The way we declared the functiona allows us to use the 'words' as part of our checks.
      if (!words) { return null ; }
      // loops over all the values in the array and check if any of the items therein can be found in the control
      // if the word is found then it is returned, otherwise null is return.
      // We filter out these nulls so that the final variable only includes the restricted words.
      var invalidWords = words
                        .map(w => control.value.includes(w) ? w : null)
                        .filter(w => w != null);

      return invalidWords && invalidWords.length > 0 ?
        {'restrictedWords': invalidWords.join(', ')}
        : null ;
    } ;
}
