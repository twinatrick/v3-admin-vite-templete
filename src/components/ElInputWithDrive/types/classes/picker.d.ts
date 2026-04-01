import ResponseObject from '../interfaces/response-object';

/**
 * {@link Picker} is the top level object representing the UI action with the user. These objects are not created directly, but instead use the [PickerBuilder](./picker-builder.ts) class.
 */
class Picker{
  /**
   * Disposes the {@link Picker} object.
   */
  dispose(): void
  /**
   * Get a boolean indicating the current Picker visibility.
   */
  isVisible(): boolean
  /**
   * Specify the callback method called whenever the user has selected an item (or canceled.)
   */
  setCallback(method: (response: ResponseObject) => void): Picker;
  /**
   * Specify a relay URL to circumvent cross-domain issues.
   */
  setRelayUrl(url: string): Picker;
  /**
   * Control the visibility of the {@link Picker} object.
   */
  setVisible(visible: boolean): void;
}

export default Picker
