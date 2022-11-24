## 외부 서비스 문서

### letsencrypt 발급 받기 (https 적용을 위한)

```
# certbot 설치 후
$ certbot --nginx

# 콘솔창에 뜨는 것 차례대로 입력

# /etc/letsencrypt/live/i7a809.p.ssafy.io/fullchain.pem
```



### openvidu

#### docker 설치

```bash
$ sudo apt-get update

$ sudo apt-get install \
	apt-transport-https \
	ca-certificates \
	curl \
	gnupg \
	lsb-release
	
$ sudo -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o
/usr/share/keyrings/docker-archive-keyring.gpg

$ echo \
	"deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg]
	https://download.docker.com/linux/ubuntu \
	$(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
	
$ sudo apt-get update

$ sudo apt-get install docker-ce docker-ce-cli containerd.io

$ sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

$ sudo chmod +x /usr/local/bin/docker-compose
```



#### openvidu 설치

```bash
$ cd /opt   # openvidu는 /opt 디렉토리에 설치되는게 권장

$ sudo curl https://s3-eu-west-1.amazonaws.com/aws.openvidu.io/install_openvidu_latest.sh | sudo bash

# openvidu 설정 파일 수정
$ sudo vi .env
```

```
DOMAIN_OR_PUBLIC_IP=i7a809.p.ssafy.io # 도메인 or 퍼블릭 IP
OPENVIDU_SECRET=MY_SECRET
CERTIFICATE_TYPE=letsencrypt # default 값은 selfsigned, https 적용하려면 letsencrypt

LETSENCRYPT_EMAIL=<이메일>
HTTP_PORT=8081
HTTPS_PORT=8443
# 키를 발급받고 난 후부터는 포트 변경해도 무방
```



```
$ sudo ./openvidu start # openvidu 서버 실행
```



#### letsencrypt

openvidu에 letscrypt 적용하는데 어려웠습니다. cannot load ~~/fullchain.pem 에러 때문에 며칠을 날렸습니다. 위에서 발급 받은 키가 있는`/etc/letsencrypt/live/i7a809.p.ssafy.io/fullchain.pem`를 /opt/openvidu/certificates로 파일을 복사해줬습니다.

```
cp /etc/letsencrypt /opt/openvidu/certificates
```



### Google API

```
클라이언트 ID (client-id)
367297667567-5m40hvbqlq98ckb545jacgqbk6uetern.apps.googleusercontent.com
클라이언트 보안 비밀 (client-secret)
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

인증코드 요청 url
https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile&response_type=code&client_id=367297667567-5m40hvbqlq98ckb545jacgqbk6uetern.apps.googleusercontent.com&redirect_uri=http://localhost:8080/api/OAuth/google/callback

구글 접속토큰 요청 url
https://oauth2.googleapis.com/token
{
	code : access_code
	client_id : 367297667567-5m40hvbqlq98ckb545jacgqbk6uetern.apps.googleusercontent.com
	client_secret : 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
	redirect_uri : http://localhost:8080/api/OAuth/google/callback
	grant_type : authorization_code
}

접속토큰을 이용하여 구글 프로필정보 요청 url
https://www.googleapis.com/oauth2/v1/userinfo
	헤더 추가
	headerName : "Authorization"
	headerValue : "Bearer"+접속토큰

```

