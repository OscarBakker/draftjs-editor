import _ from 'underscore';

export function replacePlaceholders(currentHtml, formData) {
    if(!currentHtml) return;
    let newHtml = currentHtml;
  
    // Set placeholders
    let placeholders = _.allKeys(formData);

    // Set regular expression for each placeholder
    placeholders.map( placeholder => {
      let newReg = placeholder.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
      let reg = new RegExp("{" + newReg + "}", 'g');

      newHtml = newHtml.replace(reg, formData[placeholder]);
    });

    // Return new html where placeholders equal to formData keys are replaced by formData values
    return newHtml;
  }