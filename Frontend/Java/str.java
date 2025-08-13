// Main.java  (기본 패키지: package 선언 없음)
import java.time.LocalDate;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class 0Main {

    static class Assignment {
        final String id;        // ex01
        final String topic;     // 학습주제
        final LocalDate date;   // 학습날짜
        final String className; // "Ex01" 등 (패키지 없음)

        Assignment(String id, String topic, LocalDate date, String className) {
            this.id = id;
            this.topic = topic;
            this.date = date;
            this.className = className;
        }
    }

    // ex01, ex02 ... 숫자 기준 정렬
    private static final Map<String, Assignment> assignments =
            new TreeMap<>(Comparator.comparingInt(Main::idNumber));

    private static int idNumber(String id) {
        return Integer.parseInt(id.substring(2)); // "ex01" -> 1
    }

    public static void main(String[] args) {
        initAssignments();
        printAssignments();

        Scanner sc = new Scanner(System.in);
        System.out.print("실행할 실습과제 번호를 입력하세요 (예: ex01 또는 01): ");
        String raw = sc.nextLine();
        String id = normalizeId(raw); // ex01 로 정규화
        runAssignment(id);
    }

    private static void initAssignments() {
        add("Ex01", "변수와 조건문", LocalDate.of(2025, 8, 11));
        add("Ex02", "1부터 N까지 홀수합과 짝수합",       LocalDate.of(2025, 8, 12));
        add("Ex03", "여러가지 숫자의 합과 평균",       LocalDate.of(2025, 8, 12));
        // 필요 시 계속 추가
    }

    private static void add(String id, String topic, LocalDate date) {
        String className = toClassName(id); // "ex01" -> "Ex01"
        assignments.put(id, new Assignment(id, topic, date, className));
    }

    private static void printAssignments() {
        System.out.println("\n=== 실습 과제 목록 ===");
        System.out.printf("%-6s %-18s %-12s %-10s%n", "ID", "학습주제", "학습날짜", "클래스");
        for (Assignment a : assignments.values()) {
            System.out.printf("%-6s %-18s %-12s %-10s%n",
                    a.id, a.topic, a.date, a.className);
        }
        System.out.println("======================\n");
    }

    // "ex1", "1", "01" 모두 허용 → "ex01"로 통일
    private static String normalizeId(String input) {
        String s = input.trim().toLowerCase(Locale.ROOT);
        if (s.matches("ex\\d{2}")) return s;

        Matcher m = Pattern.compile("(?:ex)?(\\d{1,2})").matcher(s);
        if (m.matches()) {
            int n = Integer.parseInt(m.group(1));
            if (n <= 0 || n > 99) throw new IllegalArgumentException("번호는 1~99 범위여야 합니다.");
            return String.format("ex%02d", n);
        }
        throw new IllegalArgumentException("형식 오류: ex01 처럼 입력하세요.");
    }

    // "ex01" -> "Ex01"
    private static String toClassName(String id) {
        if (!id.matches("ex\\d{2}")) throw new IllegalArgumentException("잘못된 ID: " + id);
        return "Ex" + id.substring(2);
    }

    private static void runAssignment(String id) {
        Assignment a = assignments.get(id);
        if (a == null) {
            System.out.println("해당 ID의 과제가 없습니다: " + id);
            return;
        }
        try {
            Class<?> cls = Class.forName(a.className); // 같은 폴더의 기본 패키지 클래스
            cls.getMethod("main", String[].class).invoke(null, (Object) new String[]{});
        } catch (ClassNotFoundException e) {
            System.out.println("클래스를 찾을 수 없습니다: " + a.className +
                    "\n※ 같은 폴더에 " + a.className + ".class 가 있고, 현재 폴더에서 실행 중인지 확인하세요.");
        } catch (NoSuchMethodException e) {
            System.out.println("main(String[]) 메서드를 찾을 수 없습니다: " + a.className);
        } catch (IllegalAccessException e) {
            System.out.println("main(String[]) 접근 불가: " + a.className);
        } catch (Exception e) {
            System.out.println("실행 중 오류: " + e.getMessage());
            e.printStackTrace();
        }
    }
}
