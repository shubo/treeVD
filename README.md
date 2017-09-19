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
let treeParams = {
  name: 'treeName',
  data: [    
    { 'text' : 'Root node', 'children' : [
        { 'text' : 'Child node 1' },
        { 'text' : 'Child node 2' }
      ]
    }
  ]};
let treeContainer = $('#container');
let treeItem;

function treeItemSelectEvent(selectedItem){

  treeItem = selectedItem;
  console.log('Selected item text: ', selectedItem.text);
  console.log('Selected item ID: ', selectedItem.id);
}

let tree = treeVD.draw(treeContainer, treeParams, treeItemSelectEvent);
```
Add new branch to selected branch

```javascript
treeVD.createBranch(tree, {label: 'newBranchLabel', id: treeItem.id});
```
or add new branch to root
```javascript
treeVD.createBranch(tree, {label: 'newBranchLabel'});
```
