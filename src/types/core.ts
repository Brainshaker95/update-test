export type Nullish = null | undefined;
export type Maybe<T> = T | undefined;
export type MaybeNullish<T> = T | Nullish;
export type AllSettled<T> = Promise<PromiseSettledResult<T>[]>;

export type SvelteMouseEvent<T> = MouseEvent & {
  currentTarget: EventTarget & T;
};

export interface DropzoneDropEvent extends CustomEvent {
  detail: {
    acceptedFiles: File[];
    fileRejections: File[];
  };
}
