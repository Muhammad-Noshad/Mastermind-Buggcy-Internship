// Adds a class to an element
export function addToClassList(element, className){
  element.classList.add(className);
}

// Removes a class from the element
export function removeFromClassList(element, className){
  element.classList.remove(className);
}

// Replaces a class in the element
export function replaceInClassList(element, oldClass, newClass){
  element.classList.replace(oldClass, newClass);
}