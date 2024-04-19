export function AutoGetterSetter(target: any, key: string) {
  let value: any;

  const getter = function() {
    return value;
  };

  const setter = function(newValue: any) {
    value = newValue;
  };

  Object.defineProperty(target, key, {
    get: getter,
    set: setter,
    enumerable: true,
    configurable: true,
  });
}
