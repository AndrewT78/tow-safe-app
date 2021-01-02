import boto3
from botocore.client import Config
import zipfile
from io import StringIO
from io import BytesIO
import mimetypes
import json

def lambda_handler(event, context):
    
    location = {
        "bucketName" : 'build.towsafeapp.info',
        "objectKey" : 'towsafeappbuild.zip'
    }
    
    job = event.get("CodePipeline.job")
    if job:
        for artifact in job["data"]["inputArtifacts"]:
            print ('Found Artifact')
            print (artifact["name"])
            if artifact["name"] == "BuildArtifact":
                location = artifact["location"]["s3Location"]
                    
    print ('Building portfolio from location ' + str(location))
  
    s3 = boto3.resource("s3", config=Config(signature_version='s3v4'))
        
    dev_bucket = s3.Bucket("dev.towsafeapp.info")
    build_bucket =s3.Bucket(location["bucketName"])        
        
    app_zip = BytesIO()
    build_bucket.download_fileobj(location["objectKey"],app_zip)
        
    with zipfile.ZipFile(app_zip) as myzip:
        for nm in myzip.namelist():
            print ('Processing file ' + nm)
            print ('File type is ' + str(mimetypes.guess_type(nm)[0]))
            obj = myzip.open(nm)
            dev_bucket.upload_fileobj(obj,nm, ExtraArgs={'ContentType': str(mimetypes.guess_type(nm)[0])})
            dev_bucket.Object(nm).Acl().put(ACL='public-read')
            
    if job:
        codepipeline = boto3.client('codepipeline')
        codepipeline.put_job_success_result(jobId=job['id'])
    
    return {
        'statusCode': 200,
        'body': json.dumps('Hello from Lambda!')
    }
