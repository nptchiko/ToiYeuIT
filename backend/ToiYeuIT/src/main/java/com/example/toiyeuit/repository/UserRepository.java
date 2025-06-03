package com.example.toiyeuit.repository;

import com.example.toiyeuit.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);
    Optional<User> findByUsername(String username);
    Boolean existsByEmail(String email);
    Boolean existsByUsername(String username);

    boolean existsUserByPhone(String phone);

    // ko xafi dc
    @Query(
            nativeQuery = true,
            value = "UPDATE ToiYeuIT.user u " +
                    "SET u.role_id = :roleId " +
                    "WHERE u.user_id = :userId"
    )
    int updateRole(long userId, int roleId);

    Object getUserByEmail(String email);
}
