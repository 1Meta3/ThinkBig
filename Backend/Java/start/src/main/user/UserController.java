package start.src.main.user;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
public class UserController {
    private final UserAccountService service;
    public UserController(UserAccountService service) { this.service = service; }

    // 회원가입: POST /user
    @PostMapping(value = "/user", produces = "text/plain; charset=UTF-8")
    public ResponseEntity<String> signup(
            @RequestParam String username,
            @RequestParam String password,
            @RequestParam String email
    ) {
        if (service.register(username, password, email)) {
            return ResponseEntity.status(HttpStatus.CREATED).body("회원가입 완료: " + username);
        }
        return ResponseEntity.status(HttpStatus.CONFLICT).body("가입 실패(중복/파라미터 오류)");
    }

    // 로그인: GET /user?username=...&password=...
    @GetMapping("/user")
    public ResponseEntity<?> login(@RequestParam String username, @RequestParam String password) {
        if (service.authenticate(username, password)) {
            String email = service.emailOf(username).orElse("");
            return ResponseEntity.ok(Map.of(
                    "message", "로그인 성공",
                    "user", Map.of("username", username, "email", email)
            ));
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body("인증 실패: username 또는 password가 올바르지 않습니다.");
    }
}
