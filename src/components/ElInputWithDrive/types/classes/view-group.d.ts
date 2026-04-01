import { ViewId } from '../enums'
import DocsView from './docs-view'

/**
 * A {@link ViewGroup} is a visual grouping of views in the navigation pane.
 * @see https://developers.google.com/drive/picker/reference/picker.viewgroup.md
 */
class ViewGroup {
  constructor(viewOrId: DocsView | ViewId)
  /**
   * Add a view to the ViewGroup. The view can be represented by a view-derived object, or simply by ViewId.
   */
  addView(viewOrId: DocsView | ViewId): ViewGroup
  /**
   * Nest a ViewGroup within the current ViewGroup.
   */
  addViewGroup(viewGroup: ViewGroup): ViewGroup
  /**
   * Add a label to this ViewGroup.
   */
  addLabel(label: string): ViewGroup
}

export default ViewGroup
