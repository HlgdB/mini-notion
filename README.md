# Mini Notion

## Setup and run

**Prerequisites**: 确保你的电脑上安装了最新版本的`nodejs`和`pnpm`包管理器。

1. `pnpm install`
2. `pnpm dev`
3. `open http://localhost:5173/` (*It's best to open it in chrome*)

## Design

### Main technical stack
- Vite + React + TypeScript
- TailwindCSS + shadcn/ui
- jotai

### Implemented features

- 以块为单位构成文章，每个块都支持行内编辑；
- 实现了H1, H2, H3, Text, Numbered List, Bulleted List等类型的块；
- **鼠标右键单击块的任意位置唤出contextmenu**，以在不同块类型之间切换；
- 通过`Enter`键向下添加块，通过在块首按下`Backspace`键删除块；
- 将光标移至块首左侧区域唤起drag按钮，按住drag按钮并上下拖动以重新排序；
- 点击左上角Save按钮将文章保存到localStorage中。

### Major decisions

- 数据流：用一个记录所有blockId及顺序的数组，和记录每个blockId对应blockData数据的Map，管理所有数据。
  - 每个block采取非受控组件的模式，不会用state专门去记录它的textContent，而是在需要的时候直接通过dom操作读取。
  - 使用`crypto.randomUUID()`为每个block生成一个唯一的id。
  - 每个block在创建之时它的type和config就已确定，要修改一个block的类型，实际上进行的操作是：保留这个block的文本内容，将原来的blockId及其blockData从list和map中移除，创建一个新的blockId和blockData插入。这样做的目的是保证block只在id发生变化时进行重新渲染。
- 每次渲染block列表之前，会先按顺序遍历所有blockId，确定每个type为Numbered List的序号，并以map的形式缓存起来。这样做的目的是以O(n)时间复杂度的算法，保证所有Numbered List Item序号的准确性。
- 不使用`atomWithStorage`管理状态，而是记录文章是否发生更改的状态，并在网页关闭/刷新时提醒用户，避免过度的`localStorage`操作。
- 自己实现了一个简单的`useDraggble`给每个block添加拖拽功能。因为目前比较主流的draggable js库都会在拖拽时就更改id数组的顺序并触发重新渲染，但我的目标是只在拖拽结束确定最后放置位置时改变id数组顺序一次，也只重新渲染一次，自己编写hook实现达到这个目的。

## TODO

- 优化拖动块之前保存所有文本的逻辑，提升性能
- 引入react-window构造虚拟列表进一步优化性能
- 处理各种特殊键盘快捷键事件，如粘贴、全选等
- 实现上下左右方向键在相邻block之间的移动
- ...
