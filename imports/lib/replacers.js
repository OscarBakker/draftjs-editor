import _ from 'underscore';

export function replacePlaceholders(currentHtml, list) {
    if(!currentHtml) return;
    let newHtml = currentHtml;
  
    // Set placeholders
    let placeholders = list;

    // Set regular expression for each placeholder
    placeholders.map( placeholder => {
      let newReg = placeholder.key.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
      let reg = new RegExp("{" + newReg + "}", 'g');

      newHtml = newHtml.replace(reg, placeholder.value);
    });

    // Return new html where placeholders equal to formData keys are replaced by formData values
    return newHtml;
  }