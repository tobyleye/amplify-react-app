
/* eslint-disable-line */ const aws = require('aws-sdk');

const cognitoidentityserviceprovider = new aws.CognitoIdentityServiceProvider({
  apiVersion: '2016-04-18',
});

exports.handler = async event => {
  const adminEmails = ['krisella74@gmail.com']
  let isAdmin = false;

  if (adminEmails.includes(event.request.userAttributes.email)) {
    isAdmin == true;
  }
  
  if (!isAdmin) return event;

  const groupParams = {
    GroupName: 'Admin',
    UserPoolId: event.userPoolId,
  };
  const addUserParams = {
    GroupName: 'Admin',
    UserPoolId: event.userPoolId,
    Username: event.userName,
  };
  /**
   * Check if the group exists; if it doesn't, create it.
   */
  try {
    await cognitoidentityserviceprovider.getGroup(groupParams).promise();
  } catch (e) {
    await cognitoidentityserviceprovider.createGroup(groupParams).promise();
  }
  /**
   * Then, add the user to the group.
   */
  await cognitoidentityserviceprovider.adminAddUserToGroup(addUserParams).promise();

  return event;
};
