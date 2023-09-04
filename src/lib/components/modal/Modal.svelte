<script lang="ts">
  import { onDestroy, onMount } from 'svelte';
  import { fade } from 'svelte/transition';

  import Icon, { ICONS } from '$components/Icon.svelte';
  import Content from '$components/modal/Content.svelte';
  import Title from '$components/modal/Title.svelte';
  import { translationsStore as translations } from '$utils/stores';

  export let isVisible: boolean;
  export let isClosable = true;
  export let activatorTitle = '';

  $: document.body.classList.toggle('overflow-hidden', isVisible);

  export const open = (): void => {
    isVisible = true;
  };

  export const close = (): void => {
    isVisible = false;
  };

  const errorRequiredSlot = (slot: string): never => {
    throw new Error(`Slot "${slot}" is required`);
  };

  const onKeyDown = (event: KeyboardEvent): void => {
    if (!isClosable) {
      return;
    }

    if (event.key === 'Escape') {
      isVisible = false;
    }
  };

  onMount(() => {
    document.addEventListener('keydown', onKeyDown);
  });

  onDestroy(() => {
    document.removeEventListener('keydown', onKeyDown);
  });
</script>

<!-- eslint-disable @typescript-eslint/explicit-function-return-type -->

{#if isVisible}
  <div
    class="
      fixed
      top-1/2
      left-1/2
      -translate-x-1/2
      -translate-y-1/2
      flex
      flex-col
      gap-8
      w-[calc(100vw-4em)]
      max-w-5xl
      max-h-[calc(100vh-4em)]
      p-6
      bg-dark
      border
      border-primary
      overflow-y-auto
      z-50
    "
    data-modal
    transition:fade="{{ duration: 200 }}"
  >
    {#if isClosable}
      <button
        class="absolute right-6 top-6 hover:text-primary focus-visible:text-primary outline-none translate-colors duration-200"
        title="{$translations.TEST}"
        type="button"
        on:click="{close}"
      >
        <Icon icon="{ICONS.CLOSE}" klass="w-10 h-10"/>
      </button>
    {/if}

    <slot {Content} {Title}/>
  </div>

  <div
    class="fixed inset-0 bg-blur z-40"
    on:keydown="{onKeyDown}"
    on:click="{() => isClosable && close()}"
    transition:fade="{{ duration: 200 }}"
  ></div>
{/if}

{#if activatorTitle}
  <button
    class="button"
    data-modal-activator
    title="{activatorTitle}"
    type="button"
    on:click="{() => { isVisible = true; }}">
    <slot name="activator">
      {errorRequiredSlot('activator')}
    </slot>
  </button>
{/if}
