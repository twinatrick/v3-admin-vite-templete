import DocsUploadView from './classes/docs-upload-view'
import DocsView from './classes/docs-view'
import Picker from './classes/picker'
import PickerBuilder from './classes/picker-builder'
import ResourceId from './classes/resource-id'
import ViewGroup from './classes/view-group'
import { Action, DocsViewMode, ViewId } from './enums'

/**
 * The Google Picker API uses a builder pattern with {@link PickerBuilder} and {@link Picker}.
 * @example
 * const picker = new google.picker.PickerBuilder()
    .setOAuthtoken('TOKEN_FOR_USER')
    .setAppId('1234567890')  // Cloud Project number
    .addView(google.picker.ViewId.DOCS)
    .setCallback((data) => {
      console.log(data);
    })
    .build();

  picker.setVisible(true);
 *
 * @see https://developers.google.com/drive/picker/reference/picker
 */
declare interface GooglePickerAPI {
  DocsUploadView: typeof DocsUploadView
  DocsView: typeof DocsView
  Picker: typeof Picker
  PickerBuilder: typeof PickerBuilder
  ResourceId: typeof ResourceId
  ViewGroup: typeof ViewGroup

  ViewId: typeof ViewId
  DocsViewMode: typeof DocsViewMode
  Action: typeof Action
}

export default GooglePickerAPI
