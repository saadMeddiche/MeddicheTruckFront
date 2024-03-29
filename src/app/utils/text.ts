
export function getSingularName(string : string) : string {
  return upperCaseFirstLetter(removeLastCharacter(string));
}

export function upperCaseFirstLetter(str : string) : string {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function removeLastCharacter(str : string) : string {
    return str.slice(0, -1);
}

