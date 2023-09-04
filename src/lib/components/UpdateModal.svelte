<script lang="ts">
  import { browser } from '$app/environment';

  import Loading from '$components/Loading.svelte';
  import Modal from '$components/modal/Modal.svelte';

  let modal: Modal;
  let loading = true;

  export const handleUpdate = (): void => {
    if (window.electron && browser) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      modal.open();
      window.electron.send('handle-update');
    }
  };

  if (window.electron && browser) {
    window.electron.on('checking-for-update', () => {
      // eslint-disable-next-line no-console
      console.log('Checking for update');
    });

    window.electron.on('update-available', (event, info) => {
      // eslint-disable-next-line no-console
      console.log(info);
      loading = false;
    });

    window.electron.on('update-not-available', (event, info) => {
      // eslint-disable-next-line no-console
      console.log(info);
      loading = false;
    });

    window.electron.on('update-cancelled', () => {
      // eslint-disable-next-line no-console
      console.log('Update was cancelled');
      loading = false;
    });

    window.electron.on('update-error', () => {
      // eslint-disable-next-line no-console
      console.log('Error while updating');
      loading = false;
    });

    window.electron.on('download-progress', (event, progress) => {
      // @ts-expect-error - as
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      let message = `Download speed: ${progress.bytesPerSecond}`;
      // @ts-expect-error - as
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      message = `${message} - Downloaded ${progress.percent}%`;
      // @ts-expect-error - as
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      message = `${message} (${progress.transferred} / ${progress.total})`;

      // eslint-disable-next-line no-console
      console.log(message);
    });

    window.electron.on('update-downloaded', (event, info) => {
      // eslint-disable-next-line no-console
      console.log(info);
      loading = false;
    });
  }
</script>

<Modal
  bind:this="{modal}"
  isClosable="{false}"
  isVisible="{false}"
  let:Content
>
  <Content>
    <div class="grid place-items-center">
      {#if loading}
        <Loading/>
      {/if}
    </div>
  </Content>
</Modal>
