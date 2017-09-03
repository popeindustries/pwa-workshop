(() => {
  const host = 'http://192.168.1.201:3010';
  const node = document.getElementById('fo');
  const json = (json) => {try{return JSON.parse(json)}catch(e){return {}}};
  const ajax = (url, cb) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = () => cb(json(xhr.responseText));
    xhr.open('GET', url, true);
    xhr.send();
  };

  ajax(host + '/houses/152070', (data) => {
    node.innerHTML = data._embedded.floors.map((floor, key) => {
      return floor._embedded.rooms.map((room) => {
        return room.type === 'room'? `<a class="kur-room" target="_blank" href="${room.url}">
          <div style="position:relative;padding-top:56.25%;background:#c8c8c8">
            <img style="position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover;opacity:0;transition:.5s"
                 src="${room.artwork.source.replace('https://gfx-stage.nrk.no', host)}" onload="this.style.opacity=1">
          </div>
          <h2 style="margin:0 0 5px;padding:15px;line-height:1.2;background:#fff">${room.title}</h2>
        </a>` : '';
      }).join('');
    }).join('');
  });
})();
