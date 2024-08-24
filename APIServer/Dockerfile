# Python 3.11 slim 이미지를 사용
FROM python:3.11-slim

# 작업 디렉토리 설정
WORKDIR /app

# 빌드에 필요한 패키지 설치
RUN apt-get update && apt-get install -y \
    build-essential \
    default-libmysqlclient-dev \
    pkg-config \
    && rm -rf /var/lib/apt/lists/*

# 의존성 파일 복사
COPY requirements.txt /app/

# pip로 필요한 패키지 설치
RUN pip install --no-cache-dir -r requirements.txt

# 프로젝트 파일 복사
COPY . /app/

# 환경 변수 설정
ENV PYTHONUNBUFFERED=1

# Django 서버 실행
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
