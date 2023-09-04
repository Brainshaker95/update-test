<script lang="ts">
  import { SvelteToast } from '@zerodevx/svelte-toast';
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';

  import { browser } from '$app/environment';

  import Header from '$components/header/Header.svelte';
  import Loading from '$components/Loading.svelte';
  import UpdateModal from '$components/UpdateModal.svelte';
  import { injectCustomProperties } from '$utils/custom-properties';
  import { UnreachableError } from '$utils/errors/UnreachableError';
  import { translationsStore as translations } from '$utils/stores';
  import { toast } from '$utils/toast';
  import { zodClient } from '$utils/zod';

  import '$scss/entrypoints/global.scss';

  import type { Translations } from '$schemas/Translations';
  import type { Maybe, MaybeNullish } from '$types/core';

  const LOCALE_LENGTH = 2;

  let ready = false;
  let errorMessage: Maybe<string>;
  let updateModal: UpdateModal;

  if (window.electron && browser) {
    const handshake = crypto.randomUUID();

    window.electron.on('handshake', (event, data) => {
      if (handshake !== data) {
        throw new UnreachableError('Handshake failed.');
      }
    });

    window.electron.send('handshake', handshake);
  }

  const handleUpdate = (): void => {
    if (window.electron && browser) {
      // TODO
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      updateModal.handleUpdate();
    }
  };

  injectCustomProperties();

  onMount(() => {
    if (<MaybeNullish<Translations>>$translations) {
      ready = true;

      return;
    }

    (async (): Promise<void> => {
      const locale = Intl.DateTimeFormat().resolvedOptions().locale.slice(0, LOCALE_LENGTH);

      translations.set(<Translations>(await zodClient.getTranslations({ locale })));

      ready = true;
    })().catch((err) => {
      toast(err);

      errorMessage = 'An error occurred while loading the translations';
    });
  });
</script>

{#if ready}
  <Header/>

  <main class="container w-full my-8-em md:my-12-em">
    <slot/>
  </main>

  <button type="button" on:click="{handleUpdate}">
    TODO: handleUpdate
  </button>

  <UpdateModal bind:this="{updateModal}"/>
  <SvelteToast/>
{:else}
  <div class="grid place-items-center h-screen">
    {#if errorMessage}
      <div class="h4" role="alert">
        {errorMessage}
      </div>
    {:else}
      <div transition:fade="{{ duration: 100 }}">
        <Loading heightClass="h-16" widthClass="w-16"/>
      </div>
    {/if}
  </div>
{/if}
