<script lang="ts">
  import { browser } from '$app/environment';

  import Loading from '$components/Loading.svelte';
  import Modal from '$components/modal/Modal.svelte';

  import type { UpdateInfo } from 'electron-updater';

  type State =
    'available'
    | 'cancelled'
    | 'checking'
    | 'downloaded'
    | 'error'
    | 'progress'
    | 'unavailable';

  let modal: Modal;
  let state: State | undefined;
  // eslint-disable-next-line no-undef
  let updateProgress: UpdateProgress;
  let updateInfo: UpdateInfo;

  export const handleUpdate = (): void => {
    if (window.electron && browser) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      modal.open();
      window.electron.send('handle-update');
    }
  };

  if (window.electron && browser) {
    window.electron.on('checking-for-update', () => {
      state = 'checking';
    });

    window.electron.on('update-available', (event, info) => {
      // @ts-expect-error - as
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      updateInfo = info;
      state = 'available';
      // eslint-disable-next-line no-console
      console.log(updateInfo);
    });

    window.electron.on('update-not-available', (event, info) => {
      // @ts-expect-error - as
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      updateInfo = info;
      state = 'unavailable';
      // eslint-disable-next-line no-console
      console.log(updateInfo);
    });

    window.electron.on('update-cancelled', () => {
      state = 'cancelled';
    });

    window.electron.on('update-error', () => {
      state = 'error';
    });

    window.electron.on('download-progress', (event, progress) => {
      // @ts-expect-error - as
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      updateProgress = progress;
      state = 'progress';
    });

    window.electron.on('update-downloaded', () => {
      state = 'downloaded';
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
      {#if !state}
        <Loading/>
      {:else if state === 'checking'}
        <em>Checking</em>
      {:else if state === 'available'}
        <em>Update available: {updateInfo.version}</em>
      {:else if state === 'unavailable'}
        <em>Update unavailable: {updateInfo.version}</em>
      {:else if state === 'cancelled'}
        <em>Update cancelled</em>
      {:else if state === 'error'}
        <em>Update error</em>
      {:else if state === 'progress'}
        <progress max="100" value="{updateProgress.percent}">
          {updateProgress.transferred} / {updateProgress.total}
        </progress>

        <small>
          {updateProgress.bytesPerSecond}
        </small>
      {:else if state === 'downloaded'}
        <em>Update downloaded</em>
      {/if}
    </div>
  </Content>
</Modal>
