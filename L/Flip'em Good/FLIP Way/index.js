var elem = document.querySelectorAll('.element');

for (i = 0; i < elem.length; i++) {

  elem[i].addEventListener('click', function() {

    if (this.classList.contains('collapsed')) {

      var that = this;

      that.classList.add('expanding');
      that.classList.remove('collapsed');
      that.classList.add('expanded');
      var collapsed = that.getBoundingClientRect();
      that.classList.remove('expanded');
      that.classList.add('collapsed');
      var expanded = that.getBoundingClientRect();
      that.classList.add('transition');

      console.log('collapsed', collapsed);
      console.log('expanded', expanded);

      var invertedTop = collapsed.top - expanded.top;
      var invertedLeft = collapsed.left - expanded.left;
      var invertedWidth = collapsed.width / expanded.width;
      var invertedHeight = collapsed.height / expanded.height;

      that.style.transformOrigin = 'top left';

      that.style.transform = 'translateX(' + invertedLeft +
        'px) translateY(' + invertedTop + 'px) translateZ(0) scaleX(' +
        invertedWidth + ') scaleY(' + invertedHeight + ')';

      that.addEventListener('transitionend', function handler(event) {
        that.style.transform = '';
        that.style.transformOrigin = '';
        that.classList.remove('transition');
        that.classList.remove('expanding');
        that.classList.remove('collapsed');
        that.classList.add('expanded');
        that.removeEventListener('transitionend', handler);
      });

    } else if (this.classList.contains('expanded') && !this.classList.contains(
        'collapsing')) {

      var that = this;

      requestAnimationFrame(function() {

        that.classList.add('collapsing');
        that.classList.remove('expanded');
        that.classList.add('collapsed');
        var collapsed = that.getBoundingClientRect();
        that.classList.remove('collapsed');
        that.classList.add('expanded');
        var expanded = that.getBoundingClientRect();
        that.classList.add('transition');

        var invertedTop = collapsed.top - expanded.top;
        var invertedLeft = collapsed.left - expanded.left;
        var invertedWidth = collapsed.width / expanded.width;
        var invertedHeight = collapsed.height / expanded.height;

        that.style.transformOrigin = 'top left';
        that.style.transform = 'translate(' + invertedLeft + 'px, ' +
          invertedTop + 'px) scale(' + invertedWidth + ', ' +
          invertedHeight + ')';

        that.addEventListener('transitionend', function handler(event) {
          that.style.transform = '';
          that.style.transformOrigin = '';
          that.style.webkitTransform = '';
          that.style.webkitTransformationOrigin = '';
          that.classList.remove('transition');
          that.classList.remove('collapsing');
          that.classList.remove('expanded');
          that.classList.add('collapsed');
          that.removeEventListener('transitionend', handler);
        });

      });

    }

  });

};
