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
  xray('http://www.justdial.com/Delhi-NCR/Medical-Shops-%3Cnear%3E-green-park/ct-3722')
    .select([{
      $root: '.rslwrp #tab-5',
      name: 'span.jcn',
      phone: '.contact-info a',
      address: '.mrehover',
      loc:'.rsmap [onclick]'
    }])
    .format(function(obj) {
        console.log(obj)
      obj.name = obj.name.trim();
      obj.address = obj.address.trim();
      var str = obj.loc;
      obj.city = "Delhi";
      //  console.log(str.substring(str.indexOf(",") + 1));
      // obj.location = str.substr(str.indexOf(",") + 1);


      if(str !== undefined)
      {
        var temp = new Array();
// this will return an array with strings "1", "2", etc.
        temp = str.split(",");
        var Latitude = temp[3].trim();
        Latitude = Latitude.substring(1, 14);
        Latitude = parseFloat(Latitude).toFixed(12)
        Longitude = temp[4].trim();
        Longitude = Longitude.substring(1, 14);
        Longitude = parseFloat(Longitude).toFixed(12);
        obj.loc ={};
        obj.loc.type = "Point";
        obj.loc.coordinates = [];
        obj.loc.coordinates.push(+Longitude);
        obj.loc.coordinates.push(+Latitude);
        // Latitude = parseFloat(Latitude).toFixed(12);
// Longitude = parseFloat(Longitude).toFixed(12);
//delete obj.location;
        // console.log(obj.loc.coordinates[0]);
      }//     console.log(str.substring(str.indexOf(",") + 1));
       //   console.log(str.substring(str.indexOf(',',str.indexOf(',')+1)));

      var ph = obj.phone;
      if(ph !== undefined)
      {
        temphone = ph.split("-");
        for (var i in temphone) {
          var phstr = (temphone[i]);
          console.log(">>"+phstr)
          var processedphone = phstr.substring(phstr.indexOf("-") + 1);
          console.log("*******"+processedphone)
          //if(processedphone.indexOf('-') === -1)
          //{
            if (processedphone.length == 10)
            {
              obj.mobile = processedphone;
              obj.preference = 1;
            }
            else
            {
              obj.mobile = "0";
              obj.preference = 0;
            }
          //}
          //console.log(obj.mobile);
        }
      }
      //console.log(obj.mobile);
      if (obj.preference == 1)
      {
        delete obj.preference;
        return obj;
      }
      else
        return null;
    })
    .paginate('div#srchpagination > a:last-child[href]')
    .delay(2000)
    .write('delhimedical.json')
    .on('close', function() {
      console.log('all done');
    })


 
