# treeVD
treeVD is tool which helps to work with [jsTree](https://www.jstree.com/)

[![Build Status](https://travis-ci.org/shubo/treeVD.svg?branch=master)](https://travis-ci.org/shubo/treeVD)
[![Core Infrastructure Initiative Best Practices](https://bestpractices.coreinfrastructure.org/projects/1283/badge)](https://bestpractices.coreinfrastructure.org/projects/1283)
[![Code Climate](https://codeclimate.com/github/shubo/treeVD.svg)](https://codeclimate.com/github/shubo/treeVD)
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

```html
<div id="container"></div>
```

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
### Add new branch to selected branch

```javascript
treeVD.createBranch(tree, {label: 'newBranchLabel', id: treeItem.id});
```
or add new branch to root
```javascript
treeVD.createBranch(tree, {label: 'newBranchLabel'});
```

### Edit selected branch

```javascript
treeVD.setEditedBranch(tree, {label: 'editedBranchLabel', item: treeItem} );
```

### Delete selected branch

```javascript
treeVD.deleteBranch(tree, treeItem.id);
```

### Destroy tree

```javascript
treeVD.destroy(tree);
```
