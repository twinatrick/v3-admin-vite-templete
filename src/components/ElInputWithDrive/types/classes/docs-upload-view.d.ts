/**
 * Use {@link DocsUploadView} to upload files to Google Drive.
 */
export default class DocsUploadView {
  /**
   * Allows the user to select a folder in Google Drive to upload to.
   */
  setIncludeFolders(included: boolean): this
  /**
   * Sets the upload destination to the specified folder. This overrides setIncludeFolders to false.
   */
  setParent(parentId: string): this
}
