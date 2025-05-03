## 思路

先UI，后数据逻辑

### UI

实现一个高度自定义的editable的div

header h1 h2 h3
text
有序列表
无序列表

### 疑难

实现placeholder ✅
处理各种特殊事件，粘贴、全选...
实现方向键上下左右方向键的移动
实现按照起始文本正则自动匹配BlockType

### 性能

经常修改的用Map格式，不经常修改的用数组格式

### 笔记

Range和Selection控制光标的位置，要注意一个点，文本本身是作为textNode存在在dom中的，它们也是可以作为range参数的node。
