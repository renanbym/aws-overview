const AWS = require("aws-sdk");

exports.handler = async (event, context, callback) => {
  
   AWS.config.update({ region: "eu-west-2" });
  console.log('Handling confirmation email to', event);
  
  if (!event.email.match(/^[^@]+@[^@]+$/)) {
    console.log('Not sending: invalid email address', event);
    context.done(null, "Failed");
    return;
  }
  
    const eventData = event;
    
       const params = {
        Destination: {ToAddresses: ["renanmariano@ymail.com"] },
        Message: {
            Body: {Text: { Data: "Test"}},
            Subject: { Data: "Test Email"}
        },
        Source: "renanmariano@ymail.com"
    };
    
     const sendPromise = new AWS.SES({ apiVersion: "2010-12-01" })
    .sendEmail(params)
    .promise();
    
    
    sendPromise
    .then(data => {
      console.log(data.MessageId);
      context.done(null, "Success");
    })
    .catch(err => {
      console.error(err, err.stack);
      context.done(null, "Failed");
    });
  
 
    return callback(null, 'success')
    
};
