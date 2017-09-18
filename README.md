# treeVD
treeVD is tool which helps to work with [jsTree](https://www.jstree.com/)

## Before starting you need add jQuery and jsTree

```html
<script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>

<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/jstree/3.3.3/themes/default/style.min.css" />
<script src="//cdnjs.cloudflare.com/ajax/libs/jstree/3.3.3/jstree.min.js"></script>
```
Then you can simply download and include treeVD.js

```html
<script src="res/treeVD.js"></script>
```

## Getting Started
### For create tree

```javascript
let treeParams = {name: 'treeName', data: jsTreeJSONData};
let treeContainer = $('#container');

function treeItemSelectEvent(selectedItem){
  console.log(selectedItem.text);
}

let tree = treeVD.draw(treeContainer, treeParams, treeItemSelectEvent);
```
