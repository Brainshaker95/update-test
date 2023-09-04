/// <reference types="@sveltejs/kit" />
/// <reference types="vite/client" />

interface UpdateProgress {
  bytesPerSecond: number;
  percent: number;
  transferred: number;
  total: number;
}
