
var fs = require('fs');
const execSync = require('child_process').execSync;
var showdown  = require('showdown');
var hljs = require ('highlight.js');
let pageTitle = process.argv[2] || ""
// let plausibleDomain = process.argv[3] || ""
// const highlightingStyles = require('highlight.js/styles/atom-one-light.css');
const getReadme = () => {
  // Remove directory. Compatible with node js 10. 
  const deleteDir = (dir) => {
    execSync(`if exist ${dir}\ (@RD /S /Q "${dir}")`);
  };

  const count = 10;
  for (let i = 0; i < count; i++) {
    try {
      // fs.rmSync("./__temp", { recursive: true, force: true });
      deleteDir("__temp");
      execSync("git clone --depth=1 --branch=preview https://github.com/dynamsoft-docs/capture-vision-docs-js.git __temp");
      console.log("Git clone success.")
      break;
    } catch (e) {
      if (i < count - 1) {
        console.log(`${i}: Git clone fail, try agagin.`);
        continue;
      } else {
        throw e;
      }
    }
  }
  fs.renameSync("./__temp/programming/javascript/user-guide/cvr-readme.md", "./README.md");
  // fs.rmSync("./__temp", { recursive: true, force: true });
  deleteDir("__temp");
  let text = fs.readFileSync("./README.md", 'utf8');
  const index = text.indexOf(`# Dynamsoft Capture Vision Router Module`);
  if (index !== -1) {
    text = text.slice(index);
  }
  fs.writeFileSync("./README.md", text);
};

/**
 * Make changes based on:
 * https://github.com/KrauseFx/markdown-to-html-github-style/blob/master/convert.js
 * License:
 * https://github.com/KrauseFx/markdown-to-html-github-style/blob/master/LICENSE
 */
const convertMd2Html = (mdFile, htmlFile) => {
  showdown.extension('highlight', function () {
    function htmlunencode(text) {
      return (
        text
          .replace(/&amp;/g, '&')
          .replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>')
        );
    }
    return [{
      type: "output",
      filter: function (text, converter, options) {
        var left = "<pre><code\\b[^>]*>",
            right = "</code></pre>",
            flags = "g";
        var replacement = function (wholeMatch, match, left, right) {
          match = htmlunencode(match);
          var lang = (left.match(/class=\"([^ \"]+)/) || [])[1];
          left = left.slice(0, 18) + 'hljs ' + left.slice(18);
          if (lang && hljs.getLanguage(lang)) {
            return left + hljs.highlight(lang, match).value + right;
          } else {
            return left + hljs.highlightAuto(match).value + right;
          }
        };
        return showdown.helper.replaceRecursiveRegExp(text, replacement, left, right, flags);
      }
    }];
  });
  
  const styleData = `
  body {
    font: 400 16px/1.5 "Helvetica Neue", Helvetica, Arial, sans-serif;
    color: #111;
    background-color: #fbfbfb;
    -webkit-text-size-adjust: 100%;
    -webkit-font-feature-settings: "kern" 1;
    -moz-font-feature-settings: "kern" 1;
    -o-font-feature-settings: "kern" 1;
    font-feature-settings: "kern" 1;
    font-kerning: normal;
    padding: 30px;
  }
  
  @media only screen and (max-width: 600px) {
    body {
        padding: 5px;
    }
    body>#content {
        padding: 0px 20px 20px 20px !important;
    }
  }
  
  body>#content {
    margin: 0px;
    max-width: 900px;
    border: 1px solid #e1e4e8;
    padding: 10px 40px;
    padding-bottom: 20px;
    border-radius: 2px;
    margin-left: auto;
    margin-right: auto;
  }
  
  hr {
    color: #bbb;
    background-color: #bbb;
    height: 1px;
    flex: 0 1 auto;
    margin: 1em 0;
    padding: 0;
    border: none;
  }
  
  
  /**
  * Links
  */
  
  a {
    color: #0366d6;
    text-decoration: none;
  }
  
  a:visited {
    color: #0366d6;
  }
  
  a:hover {
    color: #0366d6;
    text-decoration: underline;
  }
  
  pre {
    background-color: #f6f8fa;
    border-radius: 3px;
    font-size: 85%;
    line-height: 1.45;
    overflow: auto;
    padding: 16px;
  }
  
  
  /**
  * Code blocks
  */
  
  code {
    background-color: rgba(27, 31, 35, .05);
    border-radius: 3px;
    font-size: 85%;
    margin: 0;
    word-wrap: break-word;
    padding: .2em .4em;
    font-family: SFMono-Regular, Consolas, Liberation Mono, Menlo, Courier, monospace;
  }
  
  pre>code {
    background-color: transparent;
    border: 0;
    display: inline;
    line-height: inherit;
    margin: 0;
    overflow: visible;
    padding: 0;
    word-wrap: normal;
    font-size: 100%;
  }
  
  
  /**
  * Blockquotes
  */
  
  blockquote {
    margin-left: 30px;
    margin-top: 0px;
    margin-bottom: 16px;
    border-left-width: 3px;
    padding: 0 1em;
    color: #828282;
    border-left: 4px solid #e8e8e8;
    padding-left: 15px;
    font-size: 18px;
    letter-spacing: -1px;
    font-style: italic;
  }
  
  blockquote * {
    font-style: normal !important;
    letter-spacing: 0;
    color: #6a737d !important;
  }
  
  
  /**
  * Tables
  */
  
  table {
    border-spacing: 2px;
    display: block;
    font-size: 14px;
    overflow: auto;
    width: 100%;
    margin-bottom: 16px;
    border-spacing: 0;
    border-collapse: collapse;
  }
  
  td {
    padding: 6px 13px;
    border: 1px solid #dfe2e5;
  }
  
  th {
    font-weight: 600;
    padding: 6px 13px;
    border: 1px solid #dfe2e5;
  }
  
  tr {
    background-color: #fff;
    border-top: 1px solid #c6cbd1;
  }
  
  table tr:nth-child(2n) {
    background-color: #f6f8fa;
  }
  
  
  /**
  * Others
  */
  
  img {
    max-width: 100%;
  }
  
  p {
    line-height: 24px;
    font-weight: 400;
    font-size: 16px;
    color: #24292e;
  }
  
  ul {
    margin-top: 0;
  }
  
  li {
    color: #24292e;
    font-size: 16px;
    font-weight: 400;
    line-height: 1.5;
  }
  
  li+li {
    margin-top: 0.25em;
  }
  
  * {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    color: #24292e;
  }
  
  a:visited {
    color: #0366d6;
  }
  
  h1,
  h2,
  h3 {
    border-bottom: 1px solid #eaecef;
    color: #111;
    /* Darker */
  }
  
  code>* {
    font-family: Consolas, "Liberation Mono", Menlo, Courier, monospace !important;
  }
  `;
  const highlightingStyles = `pre code.hljs{display:block;overflow-x:auto;padding:1em}code.hljs{padding:3px 5px}.hljs{color:#383a42;background:#fafafa}.hljs-comment,.hljs-quote{color:#a0a1a7;font-style:italic}.hljs-doctag,.hljs-formula,.hljs-keyword{color:#a626a4}.hljs-deletion,.hljs-name,.hljs-section,.hljs-selector-tag,.hljs-subst{color:#e45649}.hljs-literal{color:#0184bb}.hljs-addition,.hljs-attribute,.hljs-meta .hljs-string,.hljs-regexp,.hljs-string{color:#50a14f}.hljs-attr,.hljs-number,.hljs-selector-attr,.hljs-selector-class,.hljs-selector-pseudo,.hljs-template-variable,.hljs-type,.hljs-variable{color:#986801}.hljs-bullet,.hljs-link,.hljs-meta,.hljs-selector-id,.hljs-symbol,.hljs-title{color:#4078f2}.hljs-built_in,.hljs-class .hljs-title,.hljs-title.class_{color:#c18401}.hljs-emphasis{font-style:italic}.hljs-strong{font-weight:700}.hljs-link{text-decoration:underline}`;

  const text = fs.readFileSync(mdFile, 'utf8');

  converter = new showdown.Converter({
    ghCompatibleHeaderId: true,
    simpleLineBreaks: true,
    ghMentions: true,
    extensions: ['highlight'],
    tables: true
  });

  var preContent = `
  <html>
    <head>
      <title>` + pageTitle + `</title>
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <meta charset="UTF-8">
      <style type='text/css'>` + styleData + `</style>
      <style type='text/css'>` + highlightingStyles + `</style>`

  // if (plausibleDomain.length > 0) {
  //   preContent += `
  //     <script defer data-domain="` + plausibleDomain + `" src="https://plausible.io/js/script.js"></script>
  //   `
  // }
  preContent += `
    </head>
    <body>
      <div id='content'>
  `

  let postContent = `

      </div>
    </body>
  </html>`;

  html = preContent + converter.makeHtml(text) + postContent

  converter.setFlavor('github');
  // console.log(html);

  fs.writeFileSync(htmlFile, html);
};

getReadme();
console.log("get readme.md success.");
convertMd2Html("README.md", "README.html");
console.log("convert readme.md to readme.html success.");