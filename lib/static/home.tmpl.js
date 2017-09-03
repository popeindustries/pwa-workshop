'use strict';

const agent = require('superagent');
const headTmpl = require('./partials/head.tmpl.js');
const headerTmpl = require('./partials/header.tmpl.js');
const footerTmpl = require('./partials/footer.tmpl.js');

module.exports = function home(ctx) {
  return new Promise(async (resolve, reject) => {
    const data = {
      title: 'Totally Boring Norwegian News'
    };
    // Fetch api data
    resolve(render(Object.assign(data, ctx.state)));
  });
};

function render(data) {
  return /*html*/ `
<html>
  ${headTmpl(data)}
  <body>
    ${headerTmpl(data)}
    hello

    <section class="pwa-section is-active" id="home">
      <header class="pwa-header">
        <svg width="50" height="20" aria-hidden="true"><use xlink:href="#nrk-logo-nrk" /></svg>
        <a href="#settings"><svg width="21" height="21" aria-hidden="true"><use xlink:href="#nrk-settings" /></svg></a>
      </header>
      <div id="fo">
        <div class="nrk-button is-busy" style="border:0;text-align:center">Laster nyheter</div>
      </div>
    </section>
    <section class="pwa-section" id="custom">
      <header class="pwa-header">
        <h1 class="nrk-xs-12of12">Mitt utvalg</h1>
      </header>
      <div style="padding: 0 1em">
        <p>Donec efficitur velit quis consectetur blandit. Vestibulum ornare neque sed eleifend suscipit. Aenean eu erat fringilla, interdum elit ac, congue sapien. Curabitur at odio vitae metus pretium mattis a sed metus. Suspendisse consequat aliquam vestibulum. Phasellus scelerisque neque mattis metus molestie, eu pulvinar ipsum ultricies. Sed elementum vitae odio at scelerisque.</p>
        <p>Nam ac massa aliquam, gravida nibh ut, placerat mi. Mauris cursus euismod efficitur. Duis tempor ultrices velit vitae ultricies. Nam vitae convallis odio. Quisque tincidunt odio a auctor consequat. Ut euismod sit amet metus tristique facilisis. Integer lorem sem, dignissim sed euismod ut, pretium sit amet massa.</p>
      </div>
    </section>
    <section class="pwa-section" id="categories">
      <header class="pwa-header">
        <h1 class="nrk-xs-12of12">Kategorier</h1>
      </header>
      <div class="pwa-categories nrk-grid">
        <a class="nrk-xs-6of12" href="#categories"><h2>Radio</h2></a>
        <a class="nrk-xs-6of12" href="#categories"><h2>TV</h2></a>
        <a class="nrk-xs-6of12" href="#categories"><h2>Sport</h2></a>
        <a class="nrk-xs-6of12" href="#categories"><h2>Urix</h2></a>
        <a class="nrk-xs-6of12" href="#categories"><h2>Kultur</h2></a>
        <a class="nrk-xs-6of12" href="#categories"><h2>Ytring</h2></a>
        <a class="nrk-xs-6of12" href="#categories"><h2>Vitenskap</h2></a>
        <a class="nrk-xs-6of12" href="#categories"><h2>Livsstil</h2></a>
        <a class="nrk-xs-6of12" href="#categories"><h2>Fordypning</h2></a>
        <a class="nrk-xs-6of12" href="#categories"><h2>NRK Sápmi</h2></a>
        <a class="nrk-xs-6of12" href="#categories"><h2>Vær og klima</h2></a>
        <a class="nrk-xs-6of12" href="#categories"><h2>NRK Beta</h2></a>
      </div>
      <h3>Distrikt</h3>
      <div class="pwa-categories nrk-grid">
        <a class="nrk-xs-6of12" href="#categories"><h2>Buskerud</h2></a>
        <a class="nrk-xs-6of12" href="#categories"><h2>Finnmark</h2></a>
        <a class="nrk-xs-6of12" href="#categories"><h2>Hedmark og Oppland</h2></a>
        <a class="nrk-xs-6of12" href="#categories"><h2>Hordaland</h2></a>
        <a class="nrk-xs-6of12" href="#categories"><h2>Møre og Romsdal</h2></a>
        <a class="nrk-xs-6of12" href="#categories"><h2>Nordland</h2></a>
        <a class="nrk-xs-6of12" href="#categories"><h2>Rogaland</h2></a>
        <a class="nrk-xs-6of12" href="#categories"><h2>Sogn og Fjordane</h2></a>
        <a class="nrk-xs-6of12" href="#categories"><h2>Sørlandet</h2></a>
        <a class="nrk-xs-6of12" href="#categories"><h2>Telemark</h2></a>
        <a class="nrk-xs-6of12" href="#categories"><h2>Troms</h2></a>
        <a class="nrk-xs-6of12" href="#categories"><h2>Trøndelag</h2></a>
        <a class="nrk-xs-6of12" href="#categories"><h2>Vestfold</h2></a>
        <a class="nrk-xs-6of12" href="#categories"><h2>Østfold</h2></a>
        <a class="nrk-xs-6of12" href="#categories"><h2>Østlands&shy;sendingen</h2></a>
      </div>
    </section>
    <section class="pwa-section" id="settings">
      <header class="pwa-header">
        <a href="#home"><svg width="21" height="21" aria-hidden="true"><use xlink:href="#nrk-chevron-left" /></svg></a>
        <h1 class="nrk-xs-12of12">Innstillinger</h1>
        <span></span>
      </header>
      <ul>
        <li>En liste med innstillinger</li>
      </ul>
    </section>

    ${footerTmpl(data)}
  </body>
</html>
`;
}
