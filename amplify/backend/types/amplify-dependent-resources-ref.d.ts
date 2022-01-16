export type AmplifyDependentResourcesAttributes = {
    "function": {
        "cryptofunction": {
            "Name": "string",
            "Arn": "string",
            "Region": "string",
            "LambdaExecutionRole": "string"
        },
        "S3Trigger676d5399": {
            "Name": "string",
            "Arn": "string",
            "Region": "string",
            "LambdaExecutionRole": "string"
        }
    },
    "api": {
        "cryptoapi": {
            "RootUrl": "string",
            "ApiName": "string",
            "ApiId": "string"
        },
        "notesapi": {
            "GraphQLAPIKeyOutput": "string",
            "GraphQLAPIIdOutput": "string",
            "GraphQLAPIEndpointOutput": "string"
        }
    },
    "auth": {
        "amplifyapp86a1f49b": {
            "IdentityPoolId": "string",
            "IdentityPoolName": "string",
            "UserPoolId": "string",
            "UserPoolArn": "string",
            "UserPoolName": "string",
            "AppClientIDWeb": "string",
            "AppClientID": "string"
        }
    },
    "storage": {
        "s3c49af81d": {
            "BucketName": "string",
            "Region": "string"
        }
    }
}