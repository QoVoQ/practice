function Compiler(el, vm) {
  this.vm = vm;
  this.el = document.querySelector(el);
  this.init();
}

Compiler.prototype = Object.assign(
  Compiler.prototype, {
    init: function() {
      this.el ? this.compileElement(this.el) : console.error('Dom元素不存在');
    },
    compileElement: function compileElement(el) { // 解析模板
      var childNodes = el.childNodes;
      var self = this;
      [].slice.call(childNodes).forEach(function(node) { // 遍历子元素
        var reg = /\{\{(.*)\}\}/;
        var text = node.textContent;

        if (self.isTextNode(node) && reg.test(text)) {
          // 判断是否是符合这种形式{{}}的指令
          self.compileText(node, reg.exec(text)[1].trim());
        }

        if (node.childNodes && node.childNodes.length) {
          self.compileElement(node); // 继续递归遍历子节点
        }
      });
    },
    compileText: function compileText(node, exp) {
      var self = this;
      var initText = this.vm[exp];
      this.updateText(node, initText); // 将初始化的数据初始化到视图中
      new Watcher(this.vm, exp, function updateDOM(value) { // 生成订阅器并绑定更新函数
        self.updateText(node, value);
      });
    },
    updateText: function updateText(node, value) { //  更新节点内文字信息
      node.textContent = typeof value == 'undefined' ? '' : value;
    },
    isTextNode: function isTextNode(node) {
      return node.nodeType == 3;
    }
  });
