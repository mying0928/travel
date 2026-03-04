const tailwindcss = require('tailwindcss');
const postcss = require('postcss');
const autoprefixer = require('autoprefixer');
const fs = require('fs');

async function buildCss() {
  const inputFile = 'src/input.css';
  const outputFile = 'dist/output.css';
  
  const css = fs.readFileSync(inputFile, 'utf8');
  
  const result = await postcss([
    tailwindcss('./tailwind.config.js'),
    autoprefixer,
  ]).process(css, { from: inputFile, to: outputFile });
  
  fs.writeFileSync(outputFile, result.css);
  
  if (result.warnings()) {
    result.warnings().forEach(warn => {
      console.warn(warn.toString());
    });
  }
  
  console.log('CSS built successfully!');
}

buildCss().catch(err => console.error(err));
