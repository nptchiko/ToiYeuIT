package com.example.toiyeuit.repository.http_client;

import com.example.toiyeuit.dto.response.Oauth2UserInfoResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "outBoundUserInfo", url = "https://www.googleapis.com")
public interface Oauth2UserInfoClient {
    @GetMapping(value = "/oauth2/v1/userinfo")
    Oauth2UserInfoResponse getUserInfo(
            @RequestParam("alt") String alt,
            @RequestParam("access_token") String accessToken
    );
}

