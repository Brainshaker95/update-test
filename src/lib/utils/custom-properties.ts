import { objectEntries } from '$utils/object';
import { scssVars } from '$utils/scss-vars';

import customProperties from '$scss/modules/custom-properties.module.scss';

export const injectCustomProperties = (): void => {
  const pixelsPerRem = parseInt(getComputedStyle(document.documentElement).fontSize, 10);
  const fsScaleMinWidth = scssVars.fsScaleMinWidth / pixelsPerRem;
  const fsScaleMaxWidth = scssVars.fsScaleMaxWidth / pixelsPerRem;

  const buildClamp = (minFontSize: number, maxFontSize: number): string => {
    const slope = (maxFontSize - minFontSize) / (fsScaleMaxWidth - fsScaleMinWidth);
    const yAxisIntersection = -fsScaleMinWidth * slope + minFontSize;

    return `clamp(${minFontSize}rem, ${yAxisIntersection}rem + ${slope * 100}vw, ${maxFontSize}rem)`;
  };

  const buildFontProperties = (identifier: 'fs' | 'lh'): string => objectEntries(scssVars[identifier])
    .map(([bp, { min, max }]) => `  --${identifier}-${bp}: ${buildClamp(min, max)};`)
    .join(' ');

  const createStyleTag = (): HTMLStyleElement => {
    const fontProperties = document.createElement('style');

    fontProperties.setAttribute('type', 'text/css');

    let css = objectEntries(customProperties)
      .reduce((string, [key, value]) => `${string}${key}: ${value};`, '');

    css = `:root, *::before, *::after {${css}${buildFontProperties('fs')}${buildFontProperties('lh')}}`;

    fontProperties.innerHTML = css
      .replace(/\s\s+/g, ' ')
      .replace(/\n+/g, ' ');

    return fontProperties;
  };

  document.head.appendChild(createStyleTag());
};
