package com.tt9ood.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {
    /**
     * 클라이언트에서 접속하는 엔드포인트
     * sockJs 클라이언트가 Websocket 핸드셰이크를 하기 위해 연결할 endpoint를 지정할 수 있다
     * 클라이언트가 연결되고 http://localhost:8080/endpoint/info?t=12312312으로 웹소켓 통신이 가능한지 확인한 후,
     * 응답이 websocket:true 이면 웹소켓 연결된다.
     * 참고 사이트 : https://rmcodestar.github.io/websocket/2019/02/11/spring-websocket/
     * .setAllowedOrigins("http://localhost:3000")이 메서드가 있어야 cors 에러가 사라짐
     * @param registry
     */
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/api/signal/webSocket")
                .setAllowedOrigins("http://localhost:3000")
                .withSockJS();
    }

    /**
     * 한 클라이언트에서 다른 클라이언트로 메시지를 라우팅 할 때 사용하는 브로커를 구성한다.
     * 첫번째 라인에서 정의된 /app로 시작하는 메시지만 메시지 헨들러로 라우팅한다고 정의한다.
     * 두번째 라인에서 정의된 /topic로 시작하는 주제를 가진 메시지를 핸들러로 라우팅하여 해당 주제에 가입한 모든 클라이언트에게 메시지를 방송한다.
     * 출처: https://lahuman.jabsiri.co.kr/202
     * @param registry
     */
    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        registry.setApplicationDestinationPrefixes("/ttrpg"); // 이 url 뒤부터 controller에서 작성하는 url
        registry.enableSimpleBroker("/topic"); // 모든 클라에게 전송
    }
}
