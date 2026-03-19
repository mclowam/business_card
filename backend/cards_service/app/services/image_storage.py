from app.core.minio_client import (
    MINIO_ENDPOINT,
    MINIO_ACCESS_KEY,
    MINIO_SECRET_KEY,
    MINIO_BUCKET,
    session_minio,
)


def _s3_client():
    return session_minio.client(
        "s3",
        endpoint_url=MINIO_ENDPOINT,
        aws_access_key_id=MINIO_ACCESS_KEY,
        aws_secret_access_key=MINIO_SECRET_KEY,
    )


class MinioImageStorage:
    async def upload(self, file_obj, key: str, content_type: str = "image/jpeg") -> None:
        async with _s3_client() as s3:
            data = file_obj.read() if hasattr(file_obj, "read") else file_obj
            await s3.put_object(
                Bucket=MINIO_BUCKET,
                Key=key,
                Body=data,
                ContentType=content_type,
            )

    async def get_bytes(self, key: str) -> tuple[bytes, str]:
        async with _s3_client() as s3:
            response = await s3.get_object(Bucket=MINIO_BUCKET, Key=key)
            data = await response["Body"].read()
            content_type = response.get("ContentType", "image/jpeg")
            return data, content_type

    async def delete(self, key: str) -> None:
        async with _s3_client() as s3:
            await s3.delete_object(Bucket=MINIO_BUCKET, Key=key)
