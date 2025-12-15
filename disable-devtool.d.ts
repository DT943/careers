declare module "disable-devtool" {
  type DisableDevtoolOptions = {
    disableMenu?: boolean;
    disableSelect?: boolean;
    disableCopy?: boolean;
    ondevtoolopen?: () => void;
  };

  /**
   * When called with options, enables protections.
   * When called with `false`, disables protections.
   */
  export default function disableDevtool(
    options: DisableDevtoolOptions | false
  ): void;
}


