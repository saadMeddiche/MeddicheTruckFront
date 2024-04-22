
export function getSingularName(string : string) : string {
  return upperCaseFirstLetter(removeLastCharacter(string));
}

export function upperCaseFirstLetter(str : string) : string {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function lowerCaseFirstLetter(str : string) : string {
    return str.charAt(0).toLowerCase() + str.slice(1);
}

export function removeLastCharacter(str : string) : string {
    return str.slice(0, -1);
}

export function replaceUpperCaseWithSpace(str : string) : string {
    return str.replace(/([A-Z])/g, ' $1').trim();
}

