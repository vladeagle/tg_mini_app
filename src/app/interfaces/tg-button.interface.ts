export interface ITgButton {
  setText(text: string): void;
  show(): void;
  hide(): void;
  onClick(fn: Function): void;
  offClick(fn: Function): void;
  enable(): void;
  disable(): void;
}
