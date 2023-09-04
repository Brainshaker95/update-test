import { isNumberLike } from '$utils/number';
import { objectKeys } from '$utils/object';

import theScssVars from '$scss/modules/scss-variables.module.scss';

import type { ScssVars } from '$types/scss-vars';
import type { JsonValue } from 'type-fest';

export const scssVars = <ScssVars>objectKeys(theScssVars).reduce((combined, key) => {
  const segments = String(key).split('-');
  let currentTarget: Record<string, JsonValue> = combined;

  segments.forEach((segment, index) => {
    if (!currentTarget[segment]) {
      currentTarget[segment] = {};
    }

    if (index !== segments.length - 1) {
      currentTarget = <Record<string, JsonValue>>currentTarget[segment];
    } else {
      let scssVar: string | number = (theScssVars[key] ?? '').replace(/"/g, '');

      if (isNumberLike(scssVar.at(0))) {
        scssVar = parseFloat(scssVar);
      }

      currentTarget[segment] = scssVar;
    }
  });

  return combined;
}, {});
