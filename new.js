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

//xray('http://www.justdial.com/Mumbai/Grocery-Stores/ct-70444')
//    .select([{
//      $root: 'section.jgbg',
//      name: 'span.jcn',
//      phone: '.jrcw',
//      address: '.mrehover',
//      loc:'.rsmap [onclick]'
//    }])
//    .delay(2000)
//    .write('out.json')
//    .on('close', function() {
//      console.log('all done');
//    })


xray('http://www.justdial.com/Mumbai/Grocery-Stores/ct-70444')
    .select([{
      $root: '.jbbg',
      name: '.jcn a'
    }])
    .write('house-hold.json')
    .on('close', function() {
      console.log('all done');
    });

