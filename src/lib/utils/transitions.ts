import { slide, type SlideParams, type TransitionConfig } from 'svelte/transition';

export const conditionalSlide = (
  element: Element,
  options: SlideParams & {
    condition: boolean;
  },
): TransitionConfig => (options.condition ? slide(element, options) : {});
