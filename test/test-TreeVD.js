import test from 'ava';
import treeVD from '../TreeVD';


test('test of setTree', t=>{
    
    t.true( treeVD.setTree({name: 'treeName', data: []}) );
    
    t.false( treeVD.setTree({name: {ad: "kk"}, data: "qwqwqw"}) );
    
    t.false( treeVD.setTree() );
    
    t.false( treeVD.setTree("asa") );
    
    t.false( treeVD.setTree(12) );
    
    t.false( treeVD.setTree([]) );
    
    t.false( treeVD.setTree({}) );
});

