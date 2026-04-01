FilterTable
一、傳入參數
(1) data(Array<TableData>)(必填) : 要顯示的資料
(2) tableColumnMap(Array<TableColumnMap>)(必填) : 欄位定義檔
(3) columnWidth(String) : 欄位最小寬度，預設為 200px，參數請不要加 px 直接用數字即可(tableColumn.width 優先於此參數)
(4) checkable(Boolean) : 是否開啟多選 checkbox，預設為 false
(5) editable(Boolean) : 是否開啟欄位編輯功能，預設為 false
(6) keyReference(String) : 欄位編輯功能需要的可做為 key 值的值，預設為 "key"
(7) editOption({ [key: string]: Array<{ label:string, value:string }> }) : 欄位編輯功能中要使用的下拉選單
(8) extraColumn(Boolean) : 是否開啟最右側額外欄位，預設為 false
(9) extraWidth(String) : 最右側額外欄位寬度，預設為 80px，參數請不要加 px 直接用數字即可
(10) extraLabel(String) : 最右側額外欄位顯示名稱，預設為空字串
(11) extraHide(Boolean) : 最右側額外欄位是否開啟是否凍結欄位的按鈕，開啟時 extraLabel 會無效，預設為 false
(12) keepFilter(Boolean) : data 變更時是否保留 Filter 資料，預設為 true
(13) pageable(Boolean) : 是否開啟分頁功能，預設為 true
(14) pageSize(Number) : 每頁最多筆數，預設為 20
(15) pageSizeList(Array<Number>) : 每頁筆數下拉選單，預設為 [20, 50, 100, 200]
(16) editMode(String) : 控制開啟編輯模式的尺度，限定字串為"cell"、"row"，預設為 "row"
(17) editTrigger(String) : 控制開啟編輯模式的方式，限定字串為"dblclick"、"click"，預設為 "dblclick"
(18) cellClassName(回傳 String 的 Function) : 賦予每個格子 className，預設為 ""
(19) exportable(Boolean) : 是否開啟匯出當前畫面功能，預設為 true
二、Type
(1)TableData : {
data : 要放的資料的主物件
extraList : Array<ColumnMap>，僅自定義欄位需要
}
(2)TableColumnMap : {
name(String) : 對應到的欄位屬姓名
value(String) : 顯示在螢幕上的字串
type(String) : 查詢類型，限定字串為"string"、"select"、"date"、"number"、"hide"
fixed(String) : 是否為凍結欄位，限定字串為"left"、"right"、""，預設為""
isEditable(Boolean) : 是否開啟編輯欄位
formatter(Function) : 將資料轉換顯示
sortable(Boolean) : 是否開啟該欄位排序功能
width(String) : 欄位最小寬度，參數請不要加 px 直接用數字即可
}
三、事件
(1) editOutput : 按下 Save 按鈕後，元件會回傳修改過的物件
(2) onFocus : 點擊可編輯欄位時會回傳該筆資料(包料本身與 index)
四、元件外部控制
(1) getEditData : 獲取編輯過的資料
(2) clearSelection : 清空選項
