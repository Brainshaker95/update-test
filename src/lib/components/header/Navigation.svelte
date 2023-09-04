<script lang="ts">
  import { page } from '$app/stores';

  interface NavigationItem {
    name: string;
    path: string;
    active?: boolean;
  }

  export let items: NavigationItem[];

  $: activeStates = items.map((item) => {
    const currentPath = $page.url.pathname;
    let isActive = false;

    if (currentPath === '/') {
      isActive = item.path === '/';
    } else if (item.path !== '/') {
      isActive = currentPath.startsWith(item.path);
    }

    return isActive;
  });
</script>

<nav>
  <ul class="flex">
    {#each items as item, index (item.path)}
      <li>
        <a
          class="link relative block p-4"
          class:active="{activeStates[index]}"
          data-sveltekit-preload-data
          href="{item.path}"
        >
          {item.name}
        </a>
      </li>
    {/each}
  </ul>
</nav>

<style lang="scss">
  a {
    &::before {
      @apply
        absolute
        content-empty
        bottom-0
        left-0
        w-full
        h-1
        bg-primary
        origin-left
        scale-x-0
        transition-transform
        duration-200
      ;
    }

    &:hover,
    &:focus-visible,
    &.active {
      &::before {
        @apply scale-x-100;
      }
    }
  }
</style>
