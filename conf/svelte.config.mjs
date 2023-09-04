import adapter from '@sveltejs/adapter-node';
import preprocess from 'svelte-preprocess';

const isDev = process.env.NODE_ENV === 'dev';

/**
 * @type {import('@sveltejs/kit').Config}
 */
const config = {
  preprocess: preprocess(),
  kit: {
    csrf: {
      checkOrigin: isDev,
    },
    adapter: adapter({
      precompress: !isDev,
    }),
  },
};

export default config;
