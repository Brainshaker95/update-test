<script lang="ts">
  import { page } from '$app/stores';
</script>

<h1>
  {$page.status}
</h1>

{#if $page.error?.message && $page.error.message !== `Error: ${$page.status}`}
  <p>
    {$page.error.message}
  </p>
{/if}
