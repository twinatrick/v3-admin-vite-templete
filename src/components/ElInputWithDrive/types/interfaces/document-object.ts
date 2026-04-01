/**
 * {@link DocumentObject} is an interface describing the attributes of a selected item.
 * @see https://developers.google.com/drive/picker/reference/picker.documentobject
 */
interface DocumentObject {
  /**
   * A user-contributed description of the selected item.
   */
  description: string
  /**
   * A URL to download this item.
   */
  downloadUrl: string
  /**
   * The error code for the request to pre-open the document in Google Drive.
   */
  driveError: string
  /**
   * Whether the request to pre-open the document in Google Drive was successful.
   */
  driveSuccess: boolean
  /**
   * The duration of a selected video.
   */
  duration: string
  /**
   * A URL for this item suitable for embedding in a web page.
   */
  embedUrl: string
  /**
   * A URL to an icon for this item.
   */
  iconUrl: string
  /**
   * The ID for the selected item.
   */
  id: string
  /**
   * Returns true if the selected item was just uploaded.
   */
  isNew: boolean
  /**
   * Whether the item is shared.
   */
  isShared: boolean
  /**
   * The timestamp describing when this item was last edited.
   */
  lastEditedUtc: string
  /**
   * The latitude of the selected item.
   */
  latitude: number
  /**
   * The longitude of the selected item.
   */
  longitude: number
  /**
   * The MIME type of this item.
   */
  mimeType: string
  /**
   * The name of this item.
   */
  name: string
  /**
   * Display name for the owning organization.
   */
  organizationDisplayName: string
  /**
   * The parent ID of this item. For example, the folder containing this file.
   */
  parentId: string
  /**
   * The phone numbers of the selected item.
   */
  phoneNumbers: string[]
  /**
   * The resource key for the item, if present. Empty string otherwise
   */
  resourceKey: string
  /**
   * An id describing the service this item was selected from.
   */
  serviceId: string
  /**
   * Size of the picked item in bytes. The value is not returned when the item is uploaded during the Picker session.
   */
  sizeBytes: number
  /**
   * An array of Thumbnails which describe the attributes of a photo or video. Thumbnails aren't returned if the selected items belong to Google Drive.
   */
  thumbnails: string[]
  /**
   * The type of the selected item.
   */
  type: string
  /**
   * The item order in the upload session.
   */
  uploadId: string
  /**
   * The state of the upload.
   */
  uploadState: string
  /**
   * A URL to this item.
   */
  url: string
}

export default DocumentObject
