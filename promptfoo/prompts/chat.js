const fs = require('fs');
const path = require('path');

const styleGuide = fs.readFileSync(
  path.join(__dirname, '../../style-guide/code.md'),
  'utf-8'
);

module.exports = function (vars) {
  return [
    { role: 'system', content: styleGuide },
    { role: 'user', content: vars.prompt },
  ];
};
