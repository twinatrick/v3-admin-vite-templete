import DocumentObject from './document-object'

/**
 * The response object passed to the callback method.
 * @see https://developers.google.com/drive/picker/reference/picker.responseobject
 */
interface ResponseObject {
  /**
   * A type representing the action taken by the user to dismiss the dialog.
   */
  action: string
  /**
   * An array of {@link DocumentObjects} selected by the user.
   */
  docs: DocumentObject[]
  /**
   * The parent folders for the selected items.
   */
  parents: string
  /**
   * The view the user selected these items from.
   */
  viewToken: string
}

export default ResponseObject
