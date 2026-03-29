const fs = require('fs');
const path = require('path');

const styleGuide = fs.readFileSync(
  path.join(__dirname, '..', 'spec', 'style-guide', 'code.md'),
  'utf-8'
);

const prompt = [
  { role: 'system', content: styleGuide },
  { role: 'user', content: '{{prompt}}' },
];

fs.writeFileSync(
  path.join(__dirname, 'prompts', 'chat.json'),
  JSON.stringify(prompt, null, 2)
);
