const changingItem = document.querySelector('.item.to-click');
const items = document.querySelectorAll('.item:not(.to-click)');
const body = document.querySelector('body');
const layer = document.querySelector('.layer');

let firstRect = changingItem.getBoundingClientRect();
let otherRects = [...items].map((item) => item.getBoundingClientRect());

const duration = 300;

changingItem.addEventListener('click', (e) => {
  e.preventDefault();
  e.stopImmediatePropagation();

  firstRect = changingItem.getBoundingClientRect();
  otherRects = [...items].map((item) => item.getBoundingClientRect());

  changingItem.classList.add('active');

  animateItems();
});

function animateItems(forward = true) {
  const lastRect = changingItem.getBoundingClientRect();
  const dy = firstRect.top - lastRect.top;
  const dh = lastRect.height - firstRect.height;

  layer.animate([{
    transform: `translateY(${dh}px)`
  }, {
    transform: 'translateY(0)'
  }], duration);

  changingItem.animate([{
    transform: `translateY(${-dy}px)`
  }, {
    transform: 'translateY(0)'
  }], duration);

  items.forEach((item, i) => {
    const currentRect = item.getBoundingClientRect();

    const dy = otherRects[i].top - currentRect.top;

    item.animate([{
      transform: `translateY(${dy}px)`
    }, {
      transform: 'translateY(0)'
    }, ], duration);
  });
}

body.addEventListener('click', () => {
  changingItem.classList.remove('active');
})

// 0 a->