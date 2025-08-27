package start.src.main.user;

import org.springframework.stereotype.Service;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class UserAccountService {
    private final Map<String, String> pwByUsername = new ConcurrentHashMap<>();
    private final Map<String, String> emailByUsername = new ConcurrentHashMap<>();

    public boolean register(String username, String password, String email) {
        if (isBlank(username) || isBlank(password) || isBlank(email)) return false;
        String prev = pwByUsername.putIfAbsent(username, password);
        if (prev != null) return false; // 중복
        emailByUsername.put(username, email);
        return true;
    }

    public boolean authenticate(String username, String password) {
        String saved = pwByUsername.get(username);
        return saved != null && saved.equals(password);
    }

    public Optional<String> emailOf(String username) {
        return Optional.ofNullable(emailByUsername.get(username));
    }

    private static boolean isBlank(String s) { return s == null || s.trim().isEmpty(); }
}
