## 빌드 배포 

환경 : Ubuntu 20.04.4 LTS

### git 설치

```bash
$ sudo apt-get install git
$ sudo apt install git

# 버전확인
$ git --version

# push 했을 때 올라갈 내 정보 입력
$ git config --global user.name [이름]
$ git config --global user.mail [메일 주소]

# /home/ubuntu에서
$ mkdir pjt-dev # 파일 따로 만들어서 쓰는게 편해서 만들어서 썼습니다.
$ cd pjt-dev

# 받아오기
$  git clone [url 주소]
```

### react 배포

#### node 설치

```bash
$ curl -sL https://deb.nodesource.com/setup_16.x | sudo bash -

$ sudo apt-get install -y nodejs
$ sudo apt install npm

# 버전확인
$ node -v
$ npm -v
```



#### nginx 설치

```bash
$ sudo apt update
$ sudo apt upgrade

# 설치
$ sudo apt install nginx

# nginx 실행 
$ systemctl start nginx

# nginx 상태보기
$ systemctl start nginx
```



#### nginx conf 파일 설정 

```bash
# 처음에 원래 있는 파일 삭제 후 새로 생성, 이름은 아무거나
$ vi /etc/nginx/sites-avaliable/defalut.conf

# 실질적으로 적용되는 설정 파일은 sites-enabled에 있는 파일이기 떄문에 심볼릭 링크를 설정해줍니다.
$ ln -s /etc/nginx/sites-available/default.conf /etc/nginx/sites-enabled/
```



#### default.conf

```bash
server {

  #listen  80; # 80번 포트로 서버 오픈 (ipv4)
  #listen  [::]:80; # 80번 포트로 서버 오픈 (ipv6)

  # 설정할 도메인/IP 지정
  server_name i7a809.p.ssafy.io;

  # 엑세스 로그, 오류 로그를 남길 파일 경로
  # 로그를 남기지 않을경우, 삭제
  access_log /var/log/nginx/access.log;
  error_log /var/log/nginx/error.log;

  # 정적 파일이 위치할 루트를 설정
  # root /home/ubuntu/pjt-dev/frontend/build; # react build 파일 경로(pull 받았을 때)
  root /home/ubuntu/pjt-dev/S07P12A809/frontend/build; # react build 파일 경로(clone 받았을 때)
  index  index.html index.htm;
  try_files $uri $uri/ /index.html;


 location /api {
    proxy_pass http://localhost:8080;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header Host $http_host;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";

    }
 location /openvidu {
    proxy_pass https://i7a809.p.ssafy.io:8443;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header Host $host;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "Upgrade";

}
   # https 설정
   listen 443 ssl; # managed by Certbot
   listen [::]:433 ssl;
   
   ssl_certificate /etc/letsencrypt/live/i7a809.p.ssafy.io/fullchain.pem; # managed by Certbot
   ssl_certificate_key /etc/letsencrypt/live/i7a809.p.ssafy.io/privkey.pem; # managed by Certbot
   include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
   ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot


}

server {
    if ($host = i7a809.p.ssafy.io) {
        return 301 https://$host$request_uri;
    } # ma
```



#### react build

```bash
# git clone 파일 받은 경로로 이동
# /home/ubuntu/pjt-dev/S07P12A809/frontend 

$ npm i --force # force 안 썼으면 했지만 버전 충돌 때문에 썼습니다.
$ npm run build # build 파일 생성

$ nginx -t # nginx 설정파일 문법 검사?
$ systemctl start nginx # nginx 서버 실행, nginx 설정 변경이 있으면 start 대신 restart
```



### spring 배포

#### java 설치

```bash
$ sudo apt update

$ sudo apt install openjdk-8-jdk # 8버전 설치

```



#### spring build ( jar파일)

```bash
# git clone 파일 받은 경로로 이동
# /home/ubuntu/pjt-dev/S07P12A809/backend

# gradle 파일 권한 설정
$ chmod 755 gradlew

# build
$ ./gradlew build

# jar파일 있는 곳으로 이동
$ cd build/libs

# jar파일 배포
$ java -jar jar파일이름.jar # 백그라운드 실행은 $ java -jar jar파일이름.jar &

```

