function patch(oldVnode, newVnode) {
 // 当oldVnode不存在时
  if (!oldVnode || !newVnode) {
  	throw new Error('both parameters are required!');
  } 
  if (newVnode.isEqual(oldVnode)){
      // patch existing root node
      // 对oldVnode和vnode进行diff，并对oldVnode打patch
      patchVnode(oldVnode, newVnode);
      return oldVnode;
	} else {
		var rootEle = newVnode.render()
		document.body.appendChild(rootEle)
		return newVnode;
	} 
 
}

function patchVnode(oldVnode, newVnode) {
	if (oldVnode === vnode) {
	  return;
	}

	var oldEle = oldVnode.ele;
	var oldCh = oldVnode.children;
	var newCh = newVnode.children;
}

function updateChildren()


export patch