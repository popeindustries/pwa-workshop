(() => {
  const ROOT = document.getElementById('fo');

  function ajax({
    url,
    data = null,
    headers = {},
    method = 'GET',
    type = '',
    onload = Function.prototype,
    onerror = Function.prototype
  }){
    const xhr = new XMLHttpRequest();
    xhr.onload = () => onload(xhr.responseText, xhr);
    xhr.onerror = () => onerror(xhr.status, xhr);
    xhr.open(method, url, true);
    Object.keys(headers).forEach((key) => xhr.setRequestHeader(key, headers[key]));
    // xhr.send(data);
    return xhr;
  }

  ajax({
    url: '/api/86224',
    onload: (data) => {
      ROOT.innerHTML = JSON.parse(data)._embedded.floors.map((floor, key) =>
        floor._embedded.rooms
          .filter((room) => room.type === 'room')
          .map((room) => /*html*/ `
            <a class="kur-room" target="_blank" href="${room.url}">
              <div><img src="${room.artwork.source.replace('https://gfx-stage.nrk.no', host)}" alt=""></div>
              <h2>${room.title}</h2>
            </a>`
        ).join('')
      ).join('')
    }
  });
})();
