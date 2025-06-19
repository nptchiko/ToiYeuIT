package com.example.toiyeuit.service;


import com.example.toiyeuit.entity.VerificationToken;
import com.example.toiyeuit.exception.AppException;
import com.example.toiyeuit.exception.ErrorCode;
import com.example.toiyeuit.repository.UserRepository;
import com.example.toiyeuit.repository.VerificationRepository;
import com.example.toiyeuit.utils.SecurityUtils;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicBoolean;

@Service
@AllArgsConstructor
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
public class VerificationService {

    EmailService emailService;
    UserService userService;
    VerificationRepository verifyingRepo;
    private final UserRepository userRepository;

    public String createNewPassword(String email) {

        var user = userRepository.findByEmail(email)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));

        String token = UUID.randomUUID().toString();

        verifyingRepo.save(VerificationToken.builder()
                .token(token)
                .user(user)
                .build());

        emailService.sendEmail(email, buildEmail(user.getUsername(), token), "Confirm your email to reset new password");

        return token;
    }

    @Transactional
    public Boolean confirmToken(String token){

        var email = SecurityUtils.getCurrentUserLogin();

        var confirmToken = verifyingRepo.findByToken(token).orElseThrow(
                () -> {
                    throw new AppException(ErrorCode.VERIFYING_TOKEN_NOT_FOUND);
                });

        if(!confirmToken.getUser().getEmail().equalsIgnoreCase(email))
            throw new AppException(ErrorCode.INVALID_TOKEN);

        if (confirmToken.getConfirmAt() != null)
            throw new RuntimeException("Email is already confirmed");

        LocalDateTime expiredAt = confirmToken.getExpiryDate();

        if (expiredAt.isBefore(LocalDateTime.now()))
                throw new AppException(ErrorCode.EXPIRED_TOKEN);

        setConfirmedAt(token);

        return true;

    }
    public VerificationToken saveToken(VerificationToken token){
        return verifyingRepo.save(token);
    }
    public int setConfirmedAt(String token){
        return verifyingRepo.updateConfirmAt(token, LocalDateTime.now());
    }

    private String buildEmail(String name, String link) {
        return "<div style=\"font-family:'Segoe UI',Helvetica,Arial,sans-serif;max-width:600px;margin:0 auto;background-color:#ffffff;padding:0;color:#333333;line-height:1.6\">\n" +
                "\n" +
                "  <!-- Header -->\n" +
                "  <table role=\"presentation\" width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse\">\n" +
                "    <tr>\n" +
                "      <td style=\"padding:30px 40px;background-color:#4f46e5;text-align:center\">\n" +
                "        <h1 style=\"color:#ffffff;margin:0;font-weight:600;font-size:24px;letter-spacing:0.5px\">Password Reset</h1>\n" +
                "      </td>\n" +
                "    </tr>\n" +
                "  </table>\n" +
                "  \n" +
                "  <!-- Main Content -->\n" +
                "  <table role=\"presentation\" width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse\">\n" +
                "    <tr>\n" +
                "      <td style=\"padding:40px 40px 20px\">\n" +
                "        <p style=\"margin:0 0 20px;font-size:18px;color:#333333\">Hi " + name + ",</p>\n" +
                "        <p style=\"margin:0 0 25px;font-size:16px;color:#555555\">We received a request to reset your password. To create a new password and regain access to your account, here is your confirmation code:</p>\n" +
                "      </td>\n" +
                "    </tr>\n" +
                "    \n" +
                "    <!-- Call To Action Button -->\n" +
                "    <tr>\n" +
                "      <td style=\"padding:0 40px 30px;text-align:center\">\n" +
                "        <a style=\"background-color:#4f46e5;color:#ffffff;display:inline-block;padding:14px 30px;text-decoration:none;border-radius:6px;font-weight:500;font-size:24px;margin:0 0 25px;box-shadow:0 4px 6px rgba(79,70,229,0.2)\">" + link +  "</a>\n" +
                "        <p style=\"margin:0;font-size:14px;color:#888888;font-style:italic\">This link will expire in 15 minutes for security reasons</p>\n" +
                "      </td>\n" +
                "    </tr>\n" +
                "    \n" +
                "    <!-- Security Notice -->\n" +
                "    <tr>\n" +
                "      <td style=\"padding:0 40px 40px\">\n" +
                "        <p style=\"margin:0 0 20px;font-size:16px;color:#555555\">If you didn't request a password reset, please ignore this email or contact our support team if you have concerns about your account security.</p>\n" +
                "        <p style=\"margin:0;font-size:16px;color:#555555\">Thanks,<br>The EngHub Security Team</p>\n" +
                "      </td>\n" +
                "    </tr>\n" +
                "  </table>\n" +
                "  \n" +
                "  <!-- Footer -->\n" +
                "  <table role=\"presentation\" width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse\">\n" +
                "    <tr>\n" +
                "      <td style=\"padding:25px 40px;background-color:#f3f4f6;text-align:center\">\n" +
                "        <p style=\"margin:0;font-size:14px;color:#666666\">© 2025 Your Company. All rights reserved.</p>\n" +
                "        <p style=\"margin:10px 0 0;font-size:13px;color:#888888\">\n" +
                "          <a href=\"#\" style=\"color:#4f46e5;text-decoration:none\">Privacy Policy</a> • \n" +
                "          <a href=\"#\" style=\"color:#4f46e5;text-decoration:none\">Terms of Service</a> • \n" +
                "          <a href=\"#\" style=\"color:#4f46e5;text-decoration:none\">Help Center</a>\n" +
                "        </p>\n" +
                "      </td>\n" +
                "    </tr>\n" +
                "  </table>\n" +
                "</div>";
    }
}
