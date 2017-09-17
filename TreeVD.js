let treeVD = (function(){

  let trees = [];

  function getRandom(min, max) {

    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min)) + min;
  };

  function getTree(treeName){

    return trees.find(function(treeObj){
      return treeObj.name == treeName;
    }) || {};
  };

  function setTree(treeName, treeData){

    let treeObj = getTree(treeName);

    if(Object.keys(treeObj).length > 0){

      treeObj.data = treeData;

    }else{

      trees.push({name: treeName, data: treeData});
    }
  };

  function draw(container, treeObj, onSelectCallback){

    let treeData;

    if(treeObj.data && Object.keys(treeObj.data).length > 0){

      treeData = treeObj.data;
      setTree(treeObj.name, treeData);

    }else{

      treeData = getTreeData(treeObj.name);
    }

    let inputDataTree = container.children();

    if(inputDataTree.length == 0){

      let id = getRandom(1, 10000);
      container.html('<div id="treeVD-'+id+'"></div>');

      inputDataTree = container.children('#treeVD-'+id);

    }else{

      inputDataTree.jstree('destroy');
    }

    inputDataTree.jstree({

      core : {
        check_callback : true,
        data : treeData
      }
    });

    onSelect(inputDataTree, onSelectCallback);

    return inputDataTree;
  };

  function getJSON(tree){

    if(tree && tree.length > 0){

      return tree.jstree(true).get_json('#', {flat:false});

    }else{

      return {};
    }
  };

  function getTreeData(treeName){

    return getTree(treeName).data || [];
  };

  function onSelect(tree, callback){

    tree.on("changed.jstree", function (e, data) {

      let treeItem = data.instance.get_node(data.selected[0]);
      callback(treeItem);
    });
  };

  function setEditedBranch(tree, branch){
    tree.jstree('rename_node', branch.item, branch.label );
  };

  function createBranch(tree, branch){
    tree.jstree().create_node(branch.id || '#', { text : branch.label }, "last");
  };

  function deleteBranch(tree, branchID){

    tree.jstree(true).delete_node([branchID]);
  };

  function destroy(tree){

    if(!tree){

      console.error('You have not created JSTree');
      return false;
    }

    tree.jstree('destroy');
    tree.remove();
  };

  return {
    setTree: setTree,
    draw: draw,
    getJSON: getJSON,
    getTreeData: getTreeData,
    destroy: destroy,
    setEditedBranch: setEditedBranch,
    createBranch: createBranch,
    deleteBranch: deleteBranch
  }
}());
