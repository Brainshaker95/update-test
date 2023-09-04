<script lang="ts">
  import Navigation from '$components/header/Navigation.svelte';
  import Icon, { ICONS } from '$components/Icon.svelte';
  import { translationsStore as translations } from '$utils/stores';
</script>

<header class="sticky top-0 bg-blur border-b border-light z-40">
  <div class="container flex justify-between items-center">
    <a class="logo" data-sveltekit-preload-data href="/">
      <Icon
        icon="{ICONS.LOGO}"
        klass="w-12 h-12"
      />
    </a>

    <Navigation
      items="{[{
        path: '/',
        name: $translations.TEST,
      }]}"
    />
  </div>
</header>

<style lang="scss">
  .logo {
    @apply outline-none;

    :global(svg) {
      --clr-accent: rgb(var(--clr-dark));
      --clr-boxes: rgb(var(--clr-light));
      --clr-plus: rgb(var(--clr-light));

      @apply
        transition-colors
        duration-200
      ;
    }

    &:hover,
    &:focus-visible {
      :global(svg) {
        --clr-boxes: rgb(var(--clr-primary));
        --clr-plus: rgb(var(--clr-primary))
      }
    }
  }
</style>
