# Mini Notion

## Setup and run

**Prerequisites**: 确保你的电脑上安装了最新版本的`nodejs`和`pnpm`包管理器。

1. `pnpm install`
2. `pnpm dev`
3. `open http://localhost:5173/` (_It's best to open it in chrome_)

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
  - 用一个全局state记录当前focus的blockId，许多操作其实只需要基于当前focus的blockId以及blockId列表去完成就好，不需要记录太多的状态变量。
- 每次渲染block列表之前，会先按顺序遍历所有blockId，确定每个type为Numbered List的序号，并以map的形式缓存起来。这样做的目的是以O(n)时间复杂度的算法，保证所有Numbered List Item序号的准确性。
- 不使用`atomWithStorage`管理状态，而是记录文章是否发生更改的状态，并在网页关闭/刷新时提醒用户，避免过度的`localStorage`操作。
- 自己实现了一个简单的`useDraggble`给每个block添加拖拽功能。因为目前比较主流的draggable js库都会在拖拽时就更改id数组的顺序并触发重新渲染，但我的目标是只在拖拽结束确定最后放置位置时改变id数组顺序一次，也只重新渲染一次，自己编写hook实现达到这个目的。

### AI

我主要使用AI工具对我不熟悉的领域进行探索和最小demo的搭建，用来帮助我快速上手这个领域相关的api或者是js库等。

举个例子，在这个mini-notion项目中，涉及到了很多光标相关的操作，比如将当前光标移动到指定的block开头处。我会用gemini这样的大模型为我输出一份js光标操作相关的精简api文档，并让它为我搭建一个最小demo：在输入Enter键时，将光标移动到指定dom节点的指定offset处。

通过文档和演示demo，我能够快速一个对我来说是比较陌生的技术领域。我不会直接用AI+IDE比如cursor或是trae等的builder模式完成我的复杂需求，因为一般这样出现bug的时候会让我有点摸不着头脑的感觉，而且也没有加深我对某个专门的领域的熟悉度，通常是代码paste上去以后就忘掉了。

比较像的场景还有实现一个content editable的div的placeholder等等。

总而言之，我会用AI充当帮助我快速熟悉某个我当前正要实践但我又不是很熟悉的领域的导师，当我通过AI对这个领域快速熟悉以后，再去解决实际问题就会轻松很多了，并且当遇到bug的时候我也能更加详细的说明bug产生的原因和我的推测，而不是仅仅抛出表面现象让AI猜测，这也能让我更快地解决一些我在不熟悉的领域遇到的bug。

## TODO

- 优化拖动块之前保存所有文本的逻辑，提升性能
- 引入react-window构造虚拟列表进一步优化性能
- 处理各种特殊键盘快捷键事件，如粘贴、全选等
- 实现上下左右方向键在相邻block之间的移动
- ...
