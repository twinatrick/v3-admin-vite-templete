export enum ViewId {
  /**
   * 	All Google Drive document types.
   */
  DOCS = "all",
  /**
   * Google Drive photos.
   */
  DOCS_IMAGES = "docs-images",
  /**
   * Google Drive photos and videos.
   */
  DOCS_IMAGES_AND_VIDEOS = "docs-images-and-videos",
  /**
   * Google Drive videos.
   */
  DOCS_VIDEOS = "docs-videos",
  /**
   * 	Google Drive Documents.
   */
  DOCUMENTS = "documents",
  /**
   * Google Drive Drawings.
   */
  DRAWINGS = "drawings",
  /**
   * Google Drive Folders.
   */
  FOLDERS = "folders",
  /**
   * Google Drive Forms.
   */
  FORMS = "forms",
  /**
   * PDF files stored in Google Drive.
   */
  PDFS = "pdfs",
  /** @deprecated */
  IMAGE_SEARCH = "image-search",
  /** @deprecated */
  MAPS = "maps",
  /** @deprecated */
  PHOTOS = "photos",
  /** @deprecated */
  PHOTO_ALBUMS = "photo-albums",
  /** @deprecated */
  PHOTO_UPLOAD = "photo-upload",
  PRESENTATIONS = "presentations",
  /** @deprecated */
  RECENTLY_PICKED = "recently-picked",
  SPREADSHEETS = "spreadsheets",
  /** @deprecated */
  VIDEO_SEARCH = "video-search",
  /** @deprecated */
  WEBCAM = "webcam",
  /** @deprecated */
  YOUTUBE = "youtube"
}

export enum DocsViewMode {
  /**
   * Display documents in a thumbnail grid.
   */
  GRID = "grid",
  /**
   * Display documents in a detailed list.
   */
  LIST = "list"
}

export enum Action {
  /**
   * User canceled the Google Picker dialog.
   */
  CANCEL = "cancel",
  /**
   * The Google Picker dialog has encountered an error.
   */
  ERROR = "error",
  /**
   * User has chosen at least one item.
   */
  PICKED ="picked",
  /**
   * The Google Picker dialog has finished loading.
   */
  LOADED = 'loaded'
}


