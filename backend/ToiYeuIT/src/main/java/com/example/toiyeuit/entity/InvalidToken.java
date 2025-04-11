package com.example.toiyeuit.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class InvalidToken {
    @Id
    private String id;

    @Column(name = "expiry_time", nullable = false)
    Date expiryTime;
}
