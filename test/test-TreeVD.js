import test from 'ava';
import treeVD from '../TreeVD';


test('setTree', t=>{
    
    t.true( treeVD.setTree({name: 'treeName', data: []}) );
    
    t.false( treeVD.setTree({name: {ad: "kk"}, data: "qwqwqw"}) );
    
    t.false( treeVD.setTree() );
    
    t.false( treeVD.setTree("asa") );
    
    t.false( treeVD.setTree(12) );
    
    t.false( treeVD.setTree([]) );
    
    t.false( treeVD.setTree({}) );
});

test('getTree', t => {
    
    treeVD.setTree({name: 'treeName', data: [{id: 1, text: 'root', children:[]}]})
    
    t.deepEqual( treeVD.getTreeData(), [] );
    
    t.deepEqual( treeVD.getTreeData([]), [] );
    
    t.deepEqual( treeVD.getTreeData({}), [] );
    
    t.deepEqual( treeVD.getTreeData(121), [] );
    
    t.deepEqual( treeVD.getTreeData("sds"), [] );
    
    t.true(Array.isArray(treeVD.getTreeData("treeName")) );
});