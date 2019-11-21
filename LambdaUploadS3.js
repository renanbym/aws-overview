    
   const AWS = require('aws-sdk');
   const s3 = new AWS.S3();
    
  function getRandomIntInclusive(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    } 
exports.handler = async (event, context, callback) => {
  try {
   
  const base64 = event.base64;
  const base64Data = new Buffer.from(base64.replace(/^data:image\/\w+;base64,/, ""), 'base64');
  const type = base64.split(';')[0].split('/')[1];


  const nameImages = ['neptuno', 'aubay', 'test', 'aws'];
 
  const params = {
    Bucket: 'teste-aubay',
    Key: `${nameImages[getRandomIntInclusive(0,3)]}.${type}`, // type is not required
    Body: base64Data,
    ACL: 'public-read',
    ContentEncoding: 'base64', // required
    ContentType: `image/${type}` // required. Notice the back ticks
  }

  let location = '';
  let key = '';
 
    const { Location, Key } = await s3.upload(params).promise();
    location = Location;
    key = Key;
    
     const response = {
        statusCode: 200,
        body: JSON.stringify(Location),
    };
    return response;
    
  } catch (error) {
      
    const response = {
        statusCode: 400,
        body: JSON.stringify(error),
    };
  
  }
  
};
