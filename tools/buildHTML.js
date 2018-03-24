import fs from 'fs';
import cheerio from 'cheerio';
import colors from 'colors';

/*eslint-disable no-console*/

fs.readFile('src/index.html', 'utf-8', (err,markup)=>{
  if(err){
    return console.log(err);
  }else{
    const $ = cheerio.load(markup);

    //somce a seprate spreadsheet is only utilized for prod so need to dynamically inject them in prod.
    $('head').prepend('<linl rel="stylesheet" href="styles.css">');

    fs.writeFile('dist/index.html', $.html(), 'utf-8', function(err){
      if(err){
        return console.log(err);
      }else{
        console.log('index.html written to /dist'.green);
      }
    });
  }
});
