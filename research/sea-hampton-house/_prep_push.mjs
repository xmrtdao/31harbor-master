import fs from 'fs';
const content = fs.readFileSync('index.html', 'base64');
const sha = '97c32cbf782ca4e5cb0f1585fb14da6387848cec';
fs.writeFileSync('C:\\Users\\PureTrek\\AppData\\Local\\Temp\\gh_update_payload.json', JSON.stringify({
  message: 'fix: reorder gallery numerically 1-21 + replace mailto with relay Resend API',
  content: content,
  sha: sha,
  branch: 'main'
}));
console.log('Payload written, content length:', content.length);