import java.lang.reflect.*;
import java.time.*;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.*;

public class Main {

    private static final String[][] EXERCISE_TRIPLES = {
            // {"주제", "YYYY-MM-DD", "번호"}
            {"문자열 비교하기", "2025-08-11", "1"},
            {"짝수 및 홀수 합 구하기", "2025-08-12", "2"},
            {"여러가지 숫자의 합과 평균", "2025-08-12", "3"},
    };

    // 메타 타입 (내부적으로만 사용; 사용자는 EXERCISE_TRIPLES만 수정)
    record ExerciseMeta(String topic, LocalDate date, int number) {}

    public static void main(String[] args) {
        List<ExerciseMeta> catalog = parseTriples(EXERCISE_TRIPLES);
        printCatalog(catalog);                   // 2) 실행 전 목록 출력
        int choice = askNumber(1, catalog.size());
        boolean ok = runExercise(choice);        // 1) 번호에 해당하는 실습 실행
        if (!ok) {
            System.out.println("[!] 실행 가능한 진입점(main(String[]) 또는 run())을 찾지 못했습니다.");
        }
    }

    /** (주제, 날짜, 번호) 트리플을 파싱해서 내부 메타 리스트로 변환 */
    static List<ExerciseMeta> parseTriples(String[][] triples) {
        List<ExerciseMeta> list = new ArrayList<>(triples.length);
        for (String[] t : triples) {
            if (t == null || t.length < 3) continue;
            String topic = t[0].trim();
            String dateStr = t[1].trim();
            int number = Integer.parseInt(t[2].trim());
            LocalDate date = parseDate(dateStr);
            list.add(new ExerciseMeta(topic, date, number));
        }
        // 혹시 번호가 섞여 있어도 번호 기준으로 정렬
        list.sort(Comparator.comparingInt(ExerciseMeta::number));
        return list;
    }

    /** 여러 날짜 포맷 허용 */
    static LocalDate parseDate(String s) {
        DateTimeFormatter[] fmts = {
                DateTimeFormatter.ISO_LOCAL_DATE,            // yyyy-MM-dd
                DateTimeFormatter.ofPattern("yyyy.M.d"),     // yyyy.M.d
                DateTimeFormatter.ofPattern("yyyy/MM/dd")    // yyyy/MM/dd
        };
        for (DateTimeFormatter f : fmts) {
            try { return LocalDate.parse(s, f); } catch (DateTimeParseException ignored) {}
        }
        return LocalDate.now(); // 파싱 실패 시 오늘 날짜로 대체
    }

    /** 실행 전 목록 출력 */
    static void printCatalog(List<ExerciseMeta> list) {
        System.out.println("=== 실습 목록 ===");
        for (ExerciseMeta e : list) {
            System.out.printf("[%02d] %s | %s%n", e.number(), e.date(), e.topic());
        }
        System.out.println();
    }

    /** 번호 입력 받기 (범위 검증 포함) */
    static int askNumber(int min, int max) {
        Scanner sc = new Scanner(System.in);
        while (true) {
            System.out.printf("실행할 번호를 입력하세요 (%d ~ %d): ", min, max);
            String line = sc.nextLine().trim();
            try {
                int n = Integer.parseInt(line);
                if (n >= min && n <= max) return n;
            } catch (NumberFormatException ignored) {}
            System.out.println("잘못된 입력입니다. 다시 시도하세요.");
        }
    }

    /** 번호에 대응하는 ExNN 클래스를 찾아 실행
     *  - 우선순위: main(String[]) → static run() → new 인스턴스의 run()/start()
     *  - 클래스 이름 후보: Ex%02d, Ex%03d, Ex%d (Ex01, Ex001, Ex1 모두 시도)
     */
    static boolean runExercise(int number) {
        String pkg = Main.class.getPackageName(); // 기본 패키지면 빈 문자열
        String[] candidates = {
                String.format("Ex%02d", number),
                String.format("Ex%03d", number),
                String.format("Ex%d", number)
        };

        for (String simple : candidates) {
            String fqcn = pkg.isEmpty() ? simple : pkg + "." + simple;
            try {
                Class<?> clazz = Class.forName(fqcn);

                // 1) static main(String[])
                try {
                    Method main = clazz.getMethod("main", String[].class);
                    main.invoke(null, (Object) new String[0]);
                    return true;
                } catch (NoSuchMethodException ignored) {}

                // 2) static run()
                try {
                    Method run = clazz.getMethod("run");
                    if (Modifier.isStatic(run.getModifiers())) {
                        run.invoke(null);
                        return true;
                    }
                } catch (NoSuchMethodException ignored) {}

                // 3) 인스턴스 생성 후 run() 또는 start()
                Object instance = clazz.getDeclaredConstructor().newInstance();
                for (String m : new String[]{"run", "start"}) {
                    try {
                        Method mm = clazz.getMethod(m);
                        mm.invoke(instance);
                        return true;
                    } catch (NoSuchMethodException ignored) {}
                }
            } catch (ClassNotFoundException e) {
                // 다음 후보 시도
            } catch (ReflectiveOperationException e) {
                e.printStackTrace();
                return false;
            }
        }
        System.out.printf("[!] 클래스를 찾을 수 없습니다: Ex%02d / Ex%03d / Ex%d%n", number, number, number);
        return false;
    }
}
