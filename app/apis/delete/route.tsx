import { S3 } from "aws-sdk";
import { NextResponse, NextRequest } from "next/server";

const s3 = new S3({
  accessKeyId: process.env.HARSHIT_AWS_ACCESS_KEY,
  secretAccessKey: process.env.HARSHIT_AWS_SECRET_ACCESS_KEY,
  region: process.env.HARSHIT_AWS_REGION,
});

async function checkIfFileExists(fileName: string): Promise<boolean> {
  const params = {
    Bucket: process.env.HARSHIT_AWS_BUCKET_NAME || 'mypdfreaderbucket',
    Key: fileName,
  };

  return new Promise((resolve, reject) => {
    s3.headObject(params, (err, data) => {
      if (err) {
        if (err.code === 'NotFound') {
          resolve(false);
        } else {
          reject(err);
        }
      } else {
        resolve(true);
      }
    });
  });
}

async function deleteFileFromAws(fileName: string): Promise<any> {
  const params = {
    Bucket: process.env.HARSHIT_AWS_BUCKET_NAME || 'mypdfreaderbucket',
    Key: fileName,
  };

  return new Promise((resolve, reject) => {
    s3.deleteObject(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

export async function POST(req: NextRequest) {
  try {
    const requestBody = await req.json();
    let { fileName } = requestBody;

    if (!fileName) {
      return NextResponse.json({ success: false, message: 'No file name provided' }, { status: 400 });
    }
    fileName = fileName.replace(/\+/g, ' ');
    // Check if the file exists
    const fileExists = await checkIfFileExists(fileName);
    if (!fileExists) {
      return NextResponse.json({ success: false, message: 'File does not exist' }, { status: 404 });
    }

    try {
      const deleteBook = await deleteFileFromAws(fileName);
      console.log('deleteBook', deleteBook);

      return NextResponse.json({ success: true, fileName: fileName }, { status: 200 });

    } catch (err) {
      console.error("Failed to delete the file from S3:", err);
      return NextResponse.json({ success: false, message: 'Failed to delete the file' }, { status: 500 });
    }

  } catch (error) {
    console.error("Error handling request:", error);
    return NextResponse.json({ success: false, message: 'Error processing request' }, { status: 500 });
  }
}
