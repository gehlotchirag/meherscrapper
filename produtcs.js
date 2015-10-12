var xray = require('x-ray');

/*
 xray('http://mumbai.yellowpages.co.in/grocery+store')
 .select([{
 $root: 'li.clearfix',
 title: '.w305 a',
 }])
 .paginate('ul.pagination > li:last-child a[href]')
 .limit(50)
 .write('see.json');
 */

xray('http://www.cromaretail.com/Mobile-Phones-c-10.aspx#!SO=BESTSELLER')
    .select([{
      $root: 'article',
      name: 'article h2',
      price: 'article h3',
      info: xray('article h2 a[href]')
          .select({
            $root: '.product',
            keyfeture: '.kf'
          })
    }])
    .format(function(obj) {
      console.log(obj);
      return obj;
    })
    .delay(5000)
    .write('chroma.json')
    .on('close', function() {
      console.log('all done');
    })


 
