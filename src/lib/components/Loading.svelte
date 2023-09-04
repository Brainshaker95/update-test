<script lang="ts">
  export let widthClass = 'w-8';
  export let heightClass = 'h-8';
  export let additionalClass = '';
</script>

<div
  class="
    {widthClass}
    {heightClass}
    {additionalClass}
    border-4
    border-t-transparent
    border-light
    rounded-full
    animate-[spin_1s_linear_infinite]
  "
></div>
