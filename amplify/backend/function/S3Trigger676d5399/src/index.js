// eslint-disable-next-line

const aws = require("aws-sdk");
const sharp = require("sharp");

const s3 = new aws.S3();

exports.handler = async function (event, context) {
  // if the event method is delete return from the function
  if (event.Records[0].eventName === "ObjectRemoved:Delete") return;

  // get the bucket & key from the event
  const bucket = event.Records[0].s3.bucket.name;
  const key = event.Records[0].s3.object.key;

  try {
    let image = await s3.getObject({ Bucket: bucket, Key: key }).promise();
    image = await sharp(image.Body);
    // get metadata from the image including the width & height
    const metadata = await image.Metadata();
    if (metadata.width > 1000) {
      // if the width is greater than 1000 the image is resized
      const resizedImage = await image.resize({ width: 1000 }).toBuffer();
      await s3
        .putObject({
          Key: key,
          Bucket: bucket,
          Body: resizedImage,
        })
        .promise();
      return;
    }
    return;
  } catch (err) {
    context.fail(`Error getting files: ${err}`);
  }
};
