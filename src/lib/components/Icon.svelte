<script context="module" lang="ts">
  export const ICONS = <const>{
    ANGLE_DOWN: 'angle-down',
    ANGLE_UP: 'angle-up',
    BACK: 'back',
    CLOSE: 'close',
    CONTROLLER: 'controller',
    DELETE: 'delete',
    HOME: 'home',
    LABEL: 'label',
    LOGO: 'logo',
    NO_IMAGE: 'no-image',
    PERSON: 'person',
    TEXT: 'text',
    TREES: 'trees',
    UPLOAD: 'upload',
  };

  export type Icon = typeof ICONS[keyof typeof ICONS];
</script>

<script lang="ts">
  export let icon: Icon;
  export let klass = '';
  export let style = '';
</script>

<!-- eslint-disable svelte/require-optimized-style-attribute, svelte/no-at-html-tags -->

{#if icon === ICONS.ANGLE_DOWN}
  <svg
    {style}
    class="{klass}"
    fill="currentColor"
    height="24px"
    viewBox="0 0 24 24"
    width="24px"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M0 0h24v24H0V0z" fill="none"/>
    <path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14l-6-6z"/>
  </svg>
{:else if icon === ICONS.ANGLE_UP}
  <svg
    {style}
    class="{klass}"
    fill="currentColor"
    height="24px"
    viewBox="0 0 24 24"
    width="24px"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M24 24H0V0h24v24z" fill="none"/>
    <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6-1.41-1.41z"/>
  </svg>
{:else if icon === ICONS.BACK}
  <svg
    {style}
    class="{klass}"
    fill="currentColor"
    height="24px"
    viewBox="0 0 24 24"
    width="24px"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M0 0h24v24H0V0z" fill="none"/>
    <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
  </svg>
{:else if icon === ICONS.CLOSE}
  <svg
    {style}
    class="{klass}"
    fill="currentColor"
    height="24px"
    viewBox="0 0 24 24"
    width="24px"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M0 0h24v24H0V0z" fill="none"/>
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
  </svg>
{:else if icon === ICONS.CONTROLLER}
  <svg
    {style}
    class="{klass}"
    fill="currentColor"
    height="24px"
    viewBox="0 0 24 24"
    width="24px"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect fill="none" height="24" width="24"/>
    <path d="M21.58,16.09l-1.09-7.66C20.21,6.46,18.52,5,16.53,5H7.47C5.48,5,3.79,6.46,3.51,8.43l-1.09,7.66 C2.2,17.63,3.39,19,4.94,19h0c0.68,0,1.32-0.27,1.8-0.75L9,16h6l2.25,2.25c0.48,0.48,1.13,0.75,1.8,0.75h0 C20.61,19,21.8,17.63,21.58,16.09z M19.48,16.81C19.4,16.9,19.27,17,19.06,17c-0.15,0-0.29-0.06-0.39-0.16L15.83,14H8.17 l-2.84,2.84C5.23,16.94,5.09,17,4.94,17c-0.21,0-0.34-0.1-0.42-0.19c-0.08-0.09-0.16-0.23-0.13-0.44l1.09-7.66 C5.63,7.74,6.48,7,7.47,7h9.06c0.99,0,1.84,0.74,1.98,1.72l1.09,7.66C19.63,16.58,19.55,16.72,19.48,16.81z"/>
    <polygon points="9,8 8,8 8,10 6,10 6,11 8,11 8,13 9,13 9,11 11,11 11,10 9,10"/>
    <circle cx="17" cy="12" r="1"/>
    <circle cx="15" cy="9" r="1"/>
  </svg>
{:else if icon === ICONS.DELETE}
  <svg
    {style}
    class="{klass}"
    fill="currentColor"
    height="24px"
    viewBox="0 0 24 24"
    width="24px"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M0 0h24v24H0V0z" fill="none"/>
    <path d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z"/>
  </svg>
{:else if icon === ICONS.HOME}
  <svg
    {style}
    class="{klass}"
    fill="currentColor"
    height="24px"
    viewBox="0 0 24 24"
    width="24px"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M0 0h24v24H0z" fill="none"/>
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
  </svg>
{:else if icon === ICONS.LABEL}
  <svg
    {style}
    class="{klass}"
    enable-background="new 0 0 24 24"
    fill="currentColor"
    height="24px"
    viewBox="0 0 24 24"
    width="24px"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M0 0h24v24H0V0z" fill="none"/>
    <path d="m21.41 11.58-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58s1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41s-.23-1.06-.59-1.42zM13 20.01 4 11V4h7v-.01l9 9-7 7.02z"/>
    <circle cx="6.5" cy="6.5" r="1.5"/>
  </svg>
{:else if icon === ICONS.LOGO}
  <svg
    {style}
    class="{klass}"
    fill="var(--clr-boxes)"
    height="56"
    stroke-width="0.75"
    viewBox="0 0 56 56"
    width="56"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="m0,0l16,0l0,16l-16,0l0,-16z" fill="none" stroke="var(--clr-plus)"/>
    <path d="m20,0l16,0l0,16l-16,0l0,-16z" fill="none" stroke="var(--clr-plus)"/>
    <path d="m0,20l16,0l0,16l-16,0l0,-16z" fill="none" stroke="var(--clr-plus)"/>
    <path d="m20,20l16,0l0,16l-16,0l0,-16z" fill="none" stroke="var(--clr-plus)"/>

    <path d="m0,0l16,0l0,2.41823l-13.54903,13.31635l-2.45097,0.26542l0,-16z"/>
    <path d="m20,0l16,0l0,16l-2.11777,-0.07791l-13.6485,-13.63429l-0.23373,-2.2878z"/>
    <path d="m0,20l2.00001,0.05148l13.91489,14.09403l0.08511,1.85449l-16,0l0,-16l-0.00001,0z"/>
    <path d="m33.62075,20.07966l2.37925,-0.07966l0,16l-16,0l0.15931,-2.18529l13.46144,-13.73505z"/>

    <path d="m40,0l16,0l0,16l-16,0l0,-16z"/>
    <path d="m40,20l16,0l0,16l-16,0l0,-16z"/>
    <path d="m0,40l16,0l0,16l-16,0l0,-16z"/>
    <path d="m20,40l16,0l0,16l-16,0l0,-16z"/>
    <path d="m40,40l16,0l0,16l-16,0l0,-16z"/>

    <path
      d="m33.24228,29.51162l-1.99455,0l-0.70693,-0.68168c2.47425,-2.8782 3.96384,-6.61482 3.96384,-10.67965c0,-9.06381 -7.34699,-16.41081 -16.41081,-16.41081s-16.41081,7.34699 -16.41081,16.41081s7.34699,16.41081 16.41081,16.41081c4.06483,0 7.80145,-1.48959 10.67965,-3.96384l0.68168,0.70693l0,1.99455l12.6237,12.59844l3.76186,-3.76186l-12.59844,-12.6237l-0.00001,0.00001l0.00001,-0.00001zm-15.14844,0c-6.2866,0 -11.36133,-5.07472 -11.36133,-11.36133s5.07472,-11.36133 11.36133,-11.36133s11.36133,5.07472 11.36133,11.36133s-5.07472,11.36133 -11.36133,11.36133z"
      fill="var(--clr-accent)"
    />
  </svg>
{:else if icon === ICONS.NO_IMAGE}
  <svg
    {style}
    class="{klass}"
    fill="currentColor"
    height="24px"
    viewBox="0 0 24 24"
    width="24px"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M0 0h24v24H0V0z" fill="none"/>
    <path d="M19,5v11.17l2,2V5c0-1.1-0.9-2-2-2H5.83l2,2H19z"/>
    <path d="M2.81,2.81L1.39,4.22L3,5.83V19c0,1.1,0.9,2,2,2h13.17l1.61,1.61l1.41-1.41L2.81,2.81z M5,19V7.83l7.07,7.07L11.25,16 L9,13l-3,4h8.17l2,2H5z"/>
  </svg>
{:else if icon === ICONS.PERSON}
  <svg
    {style}
    class="{klass}"
    fill="currentColor"
    height="24px"
    viewBox="0 0 24 24"
    width="24px"
    xmlns="http://www.w3.org/2000/svg"
  >
    <slot name="title"/>
    <path d="M0 0h24v24H0V0z" fill="none"/>
    <path d="M12 6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2m0 10c2.7 0 5.8 1.29 6 2H6c.23-.72 3.31-2 6-2m0-12C9.79 4 8 5.79 8 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 10c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
  </svg>
{:else if icon === ICONS.TEXT}
  <svg
    {style}
    class="{klass}"
    fill="currentColor"
    height="24px"
    viewBox="0 0 24 24"
    width="24px"
    xmlns="http://www.w3.org/2000/svg"
  >
    <slot name="title"/>
    <rect fill="none" height="24" width="24"/>
    <path d="M3,10h11v2H3V10z M3,8h11V6H3V8z M3,16h7v-2H3V16z M18.01,12.87l0.71-0.71c0.39-0.39,1.02-0.39,1.41,0l0.71,0.71 c0.39,0.39,0.39,1.02,0,1.41l-0.71,0.71L18.01,12.87z M17.3,13.58l-5.3,5.3V21h2.12l5.3-5.3L17.3,13.58z"/>
  </svg>
{:else if icon === ICONS.TREES}
  <svg
    {style}
    class="{klass}"
    fill="currentColor"
    height="24px"
    viewBox="0 0 24 24"
    width="24px"
    xmlns="http://www.w3.org/2000/svg"
  >
    <slot name="title"/>
    <rect fill="none" height="24" width="24"/>
    <path d="M24,18l-3.86-6H22L15,2l-3,4.29L9,2L2,12h1.86L0,18h7v4h4v-4h2v4h4v-4H24z M15,5.49L18.16,10h-1.68l3.86,6h-3.62l-2.57-4 H16l-2.78-3.97L15,5.49z M3.66,16l3.86-6H5.84L9,5.49L12.16,10h-1.68l3.86,6H3.66z"/>
  </svg>
{:else if icon === ICONS.UPLOAD}
  <svg
    {style}
    class="{klass}"
    fill="currentColor"
    height="24px"
    viewBox="0 0 24 24"
    width="24px"
    xmlns="http://www.w3.org/2000/svg"
  >
    <slot name="title"/>
    <path d="M0 0h24v24H0V0z" fill="none"/>
    <path d="M18,15v3H6v-3H4v3c0,1.1,0.9,2,2,2h12c1.1,0,2-0.9,2-2v-3H18z M7,9l1.41,1.41L11,7.83V16h2V7.83l2.59,2.58L17,9l-5-5L7,9z"/>
  </svg>
{/if}
