const path = require('path');
const fs = require('fs');

/**
* escapeHTML
* @param {String} str A string with potential html tokens
* @return {String} Escaped HTML string according to OWASP recomendation
*/
const ESCAPE_HTML_MAP = {'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', '/': '&#x2F;', '\'': '&#x27;'};
const escapeHTML = (str = '') => String(str).replace(/[&<>"'/]/g, (char) => ESCAPE_HTML_MAP[char]);

/**
* getByPath
* @param {Object} object An source
* @param {String} keyPath A dot separated key path
* @return {Mixed} Value of key path
*/
const getByPath = (object, keyPath, fallback) =>
  keyPath.split('.').reduce((acc, key) => acc && acc[key], object) || fallback;

const getFromApi = (id) => {
  const file = path.join(__dirname, 'api', `${id}.json`);
  try{return JSON.parse(fs.readFileSync(file))}catch(err){return {}}
};

const renderImg = ({srcset = {}, alt = '', sizes = '100vw'}) => {
  const src = srcset && escapeHTML(Object.keys(srcset).map((size) => `${srcset[size]} ${size}w`));
  // no 'crossorigin' to generate opaque responses
  return src? `<img alt="${escapeHTML(alt)}" sizes="${escapeHTML(sizes)}" srcset="${src}">` : '';
};

module.exports = {
  escapeHTML,
  getByPath,
  getFromApi,
  renderImg
};
