const aws = require('aws-sdk');
const uuid = require('uuid');

aws.config.update(
    {
        region: "eu-west-1"
    }
);

exports.handler = function(event, context, callback) {
    console.log("Running");
    var params = event["queryStringParameters"];

    var name = params.name;

    var docClient = new aws.DynamoDB.DocumentClient();
    var table = "visitors_uuid";

    var insertParams = {
        TableName: table,
        Item: {
            uuid: uuid(),
            name: name,
            created_at: Math.round((new Date()).getTime() / 1000)
        }
    }

    docClient.put(insertParams, function(err, data) {
        if (err) {
            console.error(err);
        } else {
            console.log("INSERTED!");
        }
    })

    var response = {
        body: "Hello " + name,
        isBase64Encoded: false,
        statusCode: 200,
        headers: { "Content-type": "text/plain"}
    };
    callback(null, response);
};
