/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/

/* Amplify Params - DO NOT EDIT
	AUTH_AMPLIFYAPP7841C318_USERPOOLID
	ENV
	REGION
	STORAGE_PRODUCT_ARN
	STORAGE_PRODUCT_NAME
	STORAGE_PRODUCT_STREAMARN
Amplify Params - DO NOT EDIT */

var express = require("express");
var bodyParser = require("body-parser");
var awsServerlessExpressMiddleware = require("aws-serverless-express/middleware");
const AWS = require("aws-sdk");
const { v4: uuid } = require("uuid");

const region = process.env.REGION;
const ddb_table_name = process.env.STORAGE_PRODUCT_NAME;
const docClient = new AWS.DynamoDB.DocumentClient({ region });
const cognito = new AWS.CognitoIdentityServiceProvider({
  apiVersion: "2016-04-18",
});

const userPoolId = process.env.AUTH_AMPLIFYAPP7841C318_USERPOOLID;

// declare a new express app
var app = express();
app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());

// Enable CORS for all methods
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

const getGroupForUser = async (event) => {
  console.log("---event request identity---", event.requestContext.identity);

  let userSub =
    event.requestContext.identity.cognitoAuthenticationProvider.split(
      ":CognitoSignIn:"
    )[1];
  console.log("---user sub---", userSub);
  let userParams = {
    UserPoolId: userPoolId,
    Filter: `sub = "${userSub}"`,
  };
  let userData = await cognito.listUsers(userParams).promise();
  const user = userData.Users[0];
  let groupParams = {
    UserPoolId: userPoolId,
    Username: user.Username,
  };
  const groupData = await cognito.adminListGroupsForUser(groupParams).promise();
  console.log("---group data---", groupData);
  return groupData;
};

const canPerformAction = async (event, group) => {
  return new Promise(async (resolve, reject) => {
    if (!event.requestContext.identity.cognitoAuthenticationProvider) {
      reject();
    }

    let groupData = await getGroupForUser(event);
    const groupsForUser = groupData.Groups.map((group) => group.GroupName);
    if (groupsForUser.includes(group)) {
      resolve();
    } else {
      reject("user not in group, cannot perform action");
    }
  });
};

/********************
 * Middlewares *
 *******************/

/**********************
 * Example get method *
 **********************/

app.get("/products", async function (req, res) {
  // Add your code here
  try {
    const data = await getItems();
    res.json({ data });
  } catch (err) {
    res.json({ error: err });
  }
});

async function getItems() {
  var params = { TableName: ddb_table_name };
  const data = await docClient.scan(params).promise();
  return data;
}

app.post("/products", async function (req, res) {
  const { body } = req;
  const { event } = req.apiGateway;
  try {
    canPerformAction(event, "Admin");
    const input = { ...body, id: uuid() };
    const params = {
      TableName: ddb_table_name,
      Item: input,
    };
    await docClient.put(params).promise()
    res.json({ success: "item saved successfully" });
  } catch (err) {
    res.json({ error: err });
  }
});

app.listen(3000, function () {
  console.log("App started");
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app;
