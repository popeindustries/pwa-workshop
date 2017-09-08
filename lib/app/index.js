// index.js
document.addEventListener('click', (event) => {
  if(event.target.closest('a[rel="home"]')){
    event.preventDefault();
    location.href = `/${location.pathname.split('/')[1]}`;
  }
});
