import { memoize, set } from "lodash";

export class ExpressionInterpreter {
  interprete(expressionString: string, rootVars: Record<string, any>) {
    const varNames = [];
    const varValues = [];
    for (const name in rootVars) {
      varNames.push(name);
      varValues.push(rootVars[name]);
    }

    let result;
    try {
      const expression = genExpression(varNames, expressionString);
      result = expression(...varValues);
    } catch (err: any) {
      console.error(`Expression interprete error. expression: '${expressionString}', error:`, err.message);
    }
    return result;
  }
}

const genExpression = memoize((varNames: string[], expressionString: string) => {
  // eslint-disable-next-line no-new-func
  return new Function(...varNames, `return (${expressionString})`);
}, (varNames, expressionString) => {
  return varNames.join(',') + ":" + expressionString;
})


export function interpreteConfigExpressions(config: { $exps: Record<string, string>}, vars: Record<string, any>) {
  const interpreter = new ExpressionInterpreter();
  const propExpressions = config.$exps;
  if (propExpressions) {
    const expVars = Object.assign({}, vars);

    for(const propName in propExpressions) {
      const propValue = interpreter.interprete(propExpressions[propName], expVars);
      set(config, propName, propValue);
    }
  }
}