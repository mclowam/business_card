import os
import aioboto3
from botocore.exceptions import ClientError

MINIO_ENDPOINT = os.getenv("MINIO_ENDPOINT", "http://minio:9000")
MINIO_ACCESS_KEY = os.getenv("MINIO_ACCESS_KEY", "admin")
MINIO_SECRET_KEY = os.getenv("MINIO_SECRET_KEY", "password123")
MINIO_BUCKET = os.getenv("MINIO_BUCKET", "avatars")

session_minio = aioboto3.Session()


async def ensure_bucket() -> None:
    async with session_minio.client(
        "s3",
        endpoint_url=MINIO_ENDPOINT,
        aws_access_key_id=MINIO_ACCESS_KEY,
        aws_secret_access_key=MINIO_SECRET_KEY,
    ) as s3:
        try:
            await s3.head_bucket(Bucket=MINIO_BUCKET)
        except ClientError as e:
            if e.response["Error"]["Code"] in ("404", "NoSuchBucket"):
                await s3.create_bucket(Bucket=MINIO_BUCKET)
            else:
                raise
