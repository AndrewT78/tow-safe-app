import boto3
from botocore.client import Config
import zipfile
from io import StringIO
from io import BytesIO
import mimetypes

s3 = boto3.resource("s3", config=Config(signature_version='s3v4'))
        
dev_bucket = s3.Bucket("dev.towsafeapp.info")
build_bucket =s3.Bucket("build.towsafeapp.info")        
        
app_zip = BytesIO()
build_bucket.download_fileobj('towsafeappbuild.zip',app_zip)
        
with zipfile.ZipFile(app_zip) as myzip:
    for nm in myzip.namelist():
        obj = myzip.open(nm)
        dev_bucket.upload_fileobj(obj,nm, ExtraArgs={'ContentType': mimetypes.guess_type(nm)[0]})
        dev_bucket.Object(nm).Acl().put(ACL='public-read')
                
                
        