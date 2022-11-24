package com.tt9ood.api.component;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.*;
import org.springframework.http.client.BufferingClientHttpRequestFactory;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.stereotype.Component;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.nio.charset.Charset;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class GoogleOauth {

    @Value("${spring.OAuth2.google.url")
    private String Google_SNS_LOGIN_URL;

    @Value("${spring.OAuth2.google.client-id")
    private String Google_SNS_CLIENT_ID;

    @Value("${spring.OAuth2.google.callback-url")
    private String Google_SNS_CALLBACK_URL;

    @Value("${spring.OAuth2.google.client-secret")
    private String Google_SNS_CLIENT_SECRET;

    @Value("${spring.OAuth2.google.scope")
    private String Google_DATA_ACCESS_SCOPE;

    private final ObjectMapper objectMapper;

    public String getOauthRedirectURL(){
        Map<String,Object> params=new HashMap<>();
        params.put("scope","https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile");
//        params.put("scope","https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/user.gender.read https://www.googleapis.com/auth/user.phonenumbers.read");
        params.put("response_type","code");
        params.put("client_id","367297667567-5m40hvbqlq98ckb545jacgqbk6uetern.apps.googleusercontent.com");
        params.put("redirect_uri","http://localhost:8080/api/OAuth/google/callback");

        String parameterString=params.entrySet().stream()
                .map(x->x.getKey()+"="+x.getValue())
                .collect(Collectors.joining("&"));
        String redirectURL="https://accounts.google.com/o/oauth2/v2/auth"+"?"+parameterString;
        System.out.println("redirectURL = "+redirectURL);

        return redirectURL;
    }

    public ResponseEntity<String> requestAccessToken(String code){
        String GOOGLE_TOKEN_REQUEST_URL="https://oauth2.googleapis.com/token";
        RestTemplate restTemplate=new RestTemplate();
        Map<String,Object> params=new HashMap<>();
        params.put("code",code);
        params.put("client_id","367297667567-5m40hvbqlq98ckb545jacgqbk6uetern.apps.googleusercontent.com");
        params.put("client_secret","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");
        params.put("redirect_uri","http://localhost:8080/api/OAuth/google/callback");
        params.put("grant_type","authorization_code");

        ResponseEntity<String> responseEntity=restTemplate.postForEntity(GOOGLE_TOKEN_REQUEST_URL,params,String.class);

        if(responseEntity.getStatusCode()== HttpStatus.OK){
            return responseEntity;
        }
        return null;

    }

    // RestTemplate를 매번 새로 생성하기보다 빈으로 만들어서 의존성을 주입받도록 한다
    @Configuration
    public class RestTemplateConfig{
        // HTTP get,post 요청을 날릴때 일정한 형식에 맞춰주는 template
        @Bean
        public RestTemplate restTemplate(RestTemplateBuilder restTemplateBuilder){
            return restTemplateBuilder
                    .requestFactory(() -> new BufferingClientHttpRequestFactory(new SimpleClientHttpRequestFactory()))
                    .additionalMessageConverters(new StringHttpMessageConverter(Charset.forName("UTF-8")))
                    .build();
        }
    }

    // responseEntity에 담긴 JSon String을 역직렬화해 자바 객체에 담는다
   public GoogleOAuthToken getAccessToken(ResponseEntity<String> response) throws JsonProcessingException{
       System.out.println("response.getBody() = "+response.getBody());
       GoogleOAuthToken googleOAuthToken=objectMapper.readValue(response.getBody(),GoogleOAuthToken.class);
        return googleOAuthToken;
    }

    // 앞에는 파라미터로 request 보냈으니, 이번엔 헤더에 access token을 담는방식으로 구현
    public ResponseEntity<String> requestUserInfo(GoogleOAuthToken oAuthToken){
        String GOOGLE_USERINFO_REQUEST_URL="https://www.googleapis.com/oauth2/v1/userinfo";
        RestTemplate restTemplate=new RestTemplate();

        // header에 accessToken을 담는다
        HttpHeaders headers=new HttpHeaders();
        headers.add("Authorization","Bearer "+oAuthToken.getAccess_token());

        // HttpEntity를 하나 생성해 헤더를 담아서 restTemplate으로 구글과 통신하게 한다
        HttpEntity<MultiValueMap<String,String>> request=new HttpEntity(headers);
        ResponseEntity<String> response=restTemplate.exchange(GOOGLE_USERINFO_REQUEST_URL, HttpMethod.GET,request,String.class);
        System.out.println("response.getBody() = "+response.getBody());
        return response;
    }

    // 구글 유저정보가 담긴 JSON 문자열을 파싱하여 GoogleUser객체에 담아준다
    public GoogleUser getUserInfo(ResponseEntity<String> userInfoRes) throws JsonProcessingException{
        GoogleUser googleUser=objectMapper.readValue(userInfoRes.getBody(),GoogleUser.class);
        return googleUser;
    }
}
