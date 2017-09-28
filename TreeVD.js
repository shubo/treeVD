let treeVD = (function(){

  let trees = [];

  function getRandom(min, max) {

    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min)) + min;
  }

  function getTreeItemByName(tree, itemName){

    let instance = tree.jstree(true);
    let branchCont = instance._model.data;

    for(let branchKey in branchCont) {

      let branch = branchCont[branchKey];

      if(branch.text && branch.text.split(':')[0] === itemName) {

        return branch;
      }
    }
  }

  function selectTreeItemByName(tree, itemName){

    let treeItem = getTreeItemByName(tree, itemName);
    tree.jstree(true).select_node(treeItem.id);
  }

  function getTree(treeName){

    return trees.find(function(treeObj){
      return treeObj.name === treeName;
    }) || {};
  }

  function setTree(treeParams){

    if(!treeParams || !treeParams.name || !treeParams.data){

      console.error('Tree params has not properly setted: ', treeParams.toSource());
      return false;
    }

    let treeObj = getTree(treeParams.name);

    if(Object.keys(treeObj).length > 0){

      treeObj.data = treeParams.data;

    }else{

      trees.push(treeParams);
    }
  }

  function draw(container, treeParams, onSelectCallback){

    if(!treeParams || !treeParams.name){

      console.error('Tree params has not properly setted: ', treeParams.toSource());
      return false;
    }

    let treeData;

    if(treeParams.data && Object.keys(treeParams.data).length > 0){

      treeData = treeParams.data;

    }else{

      treeData = getTreeData(treeParams.name);
    }

    let inputDataTree = container.children();

    if(inputDataTree.length === 0){

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

    inputDataTree.onSelect(onSelectCallback);

    return inputDataTree;
  }

  function getJSON(tree){

    if(tree && tree.length > 0){

      return tree.jstree(true).get_json('#', {flat:false});

    }else{

      return [];
    }
  }

  function getTreeData(treeName){

    return getTree(treeName).data || [];
  }

  $.fn.onSelect = function(callback){

    $(this).on("changed.jstree", function (e, data) {

      callback( data.instance.get_node(data.selected[0]) );
    });
  }

  function setEditedBranch(tree, branch){
    tree.jstree('rename_node', branch.item, branch.label );
  }

  function editBranchData(treeName, oldVar, newVar){

    function edit(treeData, oldVar, newVar){

      if(treeData.length){

        let searchedRootTag = treeData.find(function(data){
          return data.text.split(':')[0].trim() === oldVar;
        });

        if(searchedRootTag){

          let txt = searchedRootTag.text;
          let splitterIndex = txt.indexOf(':');
          let branchVal = txt.substring(splitterIndex, txt.length);
          searchedRootTag.text = newVar + branchVal;

          return true;

        }else{

          for(let data of treeData){

            if( edit(data.children || [], oldVar, newVar) ){
              return true;
            }

          }
        }

      }
    }

    let treeData = getTreeData(treeName);
    // [{id: '', text: '', children: [{id, text, children}] }, {}]

    return edit(treeData, oldVar, newVar);
  }

  function createBranch(tree, branch){
    tree.jstree().create_node(branch.id || '#', { text : branch.label }, "last");
  }

  function deleteBranch(tree, branchID){

    tree.jstree(true).delete_node([branchID]);
  }

  function destroy(tree){

    if(!tree){

      console.error('You have not created JSTree');
      return false;
    }

    tree.jstree('destroy');
    tree.remove();
  }

  return {
    setTree: setTree,
    draw: draw,
    getJSON: getJSON,
    getTreeData: getTreeData,
    getTreeItemByName: getTreeItemByName,
    selectTreeItemByName: selectTreeItemByName,
    destroy: destroy,
    setEditedBranch: setEditedBranch,
    editBranchData: editBranchData,
    createBranch: createBranch,
    deleteBranch: deleteBranch
  };
}());
