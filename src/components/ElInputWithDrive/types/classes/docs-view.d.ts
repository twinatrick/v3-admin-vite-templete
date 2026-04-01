import { ViewId, DocsViewMode } from "../enums";

/**
 * Use {@link DocsView} to select files from Google Drive.
 * @see https://developers.google.com/drive/picker/reference/picker.docsview.md
 */
export default class DocsView {
  /**
   * Constructs a new instance of the {@link DocsView} class
   */
  constructor(viewId: ViewId)
  /**
   * Shows shared drives and the files they contain. Before enabling, refer to GoogleDrive API documentation for enabling shared drives.
   */
  setEnableDrives(enable: boolean): this
  /**
   * Show folders in the view items. Do not combine with setOwnedByMe. When setIncludeFolders(true) is set, setOwnedByMe is ignored.
   */
  public setIncludeFolders(included: boolean): this
  /**
   * Selects which mode the view will use to display the documents.
   */
  setMode(mode: DocsViewMode): this
  /**
   * Filters the documents based on whether they are owned by the user, or shared with the user. Do not combine this setting with setIncludeFolders. When setIncludeFolders(true) is set, setOwnedByMe is ignored.
   */
  setOwnedByMe(me: boolean): this
  /**
   * Sets the initial parent folder to display.
   */
  setParent(parentId: string): this
  /**
   * Allows the user to select a folder in Google Drive.
   */
  setSelectFolderEnabled(enabled: boolean): this
  /**
   * Filters the documents based on whether they are starred by the user.
   */
  setStarred(starred: boolean): this
}
