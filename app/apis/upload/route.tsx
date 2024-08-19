import { NextRequest, NextResponse } from "next/server";
import { S3 } from 'aws-sdk';

const s3 = new S3({
  accessKeyId: process.env.HARSHIT_AWS_ACCESS_KEY,
  secretAccessKey: process.env.HARSHIT_AWS_SECRET_ACCESS_KEY,
  region: process.env.HARSHIT_AWS_REGION
});

async function uploadFilesToAws(files: File[]) {
  const uploadPromises = files.map(async (file) => {
    const fileName = `${Date.now()}-${file.name}`;

    // Convert Blob to Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const params = {
      Bucket: process.env.HARSHIT_AWS_BUCKET_NAME || 'mypdfreaderbucket',
      Key: fileName,
      Body: buffer,
      ContentType: file.type,
      ACL: 'public-read',
    };

    return new Promise<{ fileName: string; fileUrl: string }>((resolve, reject) => {
      s3.upload(params, (err: any, data: { Location: any; }) => {
        if (err) {
          reject(err);
        }
        resolve({ fileName, fileUrl: data.Location });
      });
    });
  });

  return Promise.all(uploadPromises);
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const files: File[] = [];
    formData.forEach((value) => {
      if (value instanceof File) {
        files.push(value);
      }
    });
    if (files.length > 0) {
      const uploadResults = await uploadFilesToAws(files);
      return NextResponse.json({ success : true , uploadedFiles: uploadResults }, { status: 200 });
    } else {
      return NextResponse.json( { success : false , message: 'No files provided' }, { status: 400 });
    }
  } catch (error) {
    console.error("Error handling request:", error);
    return NextResponse.json({ success : false,  message: 'Error processing request' }, { status: 500 });
  }
}


export function GET() {
  return NextResponse.json({ message: 'Method Not Allowed' }, { status: 405 });
}

