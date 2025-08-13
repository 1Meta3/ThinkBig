// package 가 있으면 여기에 작성: package your.package.name;

import java.lang.reflect.Method;
import java.lang.reflect.Modifier;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.IntStream;
import java.util.Locale;

public class Main {

    /* ░░░ 당신이 수정할 유일한 곳 ░░░
       형식: {"주제", "날짜", "번호"}
       - 날짜 입력: 2025-08-13 / 2025.8.13 / 2025/8/13 허용
     */
    private static final String[][] EXERCISE_TRIPLES = {
            {"문자열 비교하기",          "2025-08-10", "1"},
            {"짝수 및 홀수 합 구하기",     "2025-08-11", "2"},
            {"여러가지 숫자의 합과 평균",  "2025-08-12", "3"},
    };

    // 출력용 날짜 포맷(요일 포함)
    private static final DateTimeFormatter OUT_FMT =
            DateTimeFormatter.ofPattern("yyyy년 M월 d일(E)", Locale.KOREA);

    // 입력 허용 포맷들
    private static final DateTimeFormatter[] IN_FMTS = new DateTimeFormatter[] {
            DateTimeFormatter.ISO_LOCAL_DATE,            // 2025-08-13
            DateTimeFormatter.ofPattern("yyyy.M.d"),     // 2025.8.13
            DateTimeFormatter.ofPattern("yyyy/M/d")      // 2025/8/13
    };

    // 내부 메타
    record ExerciseMeta(String topic, LocalDate date, int number) {}

    public static void main(String[] args) {
        List<ExerciseMeta> catalog = parseTriples(EXERCISE_TRIPLES);
        validateNumbers(catalog);
        printCatalog(catalog);                 // 목록(정렬+말줄임표) 출력
        int choice = askNumber(1, catalog.size());
        boolean ok = runExercise(choice);      // 번호 실행
        if (!ok) {
            System.out.println("[!] 실행 가능한 진입점(main(String[]) 또는 run()/start())을 찾지 못했습니다.");
        }
    }

    /** (주제, 날짜, 번호) → 내부 메타로 변환 + 번호 기준 정렬 */
    static List<ExerciseMeta> parseTriples(String[][] triples) {
        List<ExerciseMeta> list = new ArrayList<>();
        for (int i = 0; i < triples.length; i++) {
            String[] t = triples[i];
            if (t == null || t.length < 3) {
                System.err.println("[경고] EXERCISE_TRIPLES[" + i + "] 형식 오류(3개 항목 필요). 건너뜀.");
                continue;
            }
            String topic = safeTrim(t[0]);
            String dateStr = safeTrim(t[1]);
            String numStr  = safeTrim(t[2]);

            LocalDate date = parseDateOrWarn(dateStr, i);
            int number = parseIntOrWarn(numStr, i);
            if (number <= 0) {
                System.err.println("[경고] 번호는 1 이상의 정수여야 합니다. index=" + i + ", 값=" + number);
            }
            list.add(new ExerciseMeta(topic, date, number));
        }
        list.sort(Comparator.comparingInt(ExerciseMeta::number));
        return list;
    }

    static String safeTrim(String s) { return s == null ? "" : s.trim(); }

    static LocalDate parseDateOrWarn(String s, int idx) {
        for (DateTimeFormatter f : IN_FMTS) {
            try { return LocalDate.parse(s, f); } catch (Exception ignored) {}
        }
        System.err.println("[경고] 날짜 파싱 실패: EXERCISE_TRIPLES[" + idx + "] = \"" + s + "\" → 화면에는 '—'로 표기됩니다.");
        return null; // 출력에서 '—'로 표시
    }

    static int parseIntOrWarn(String s, int idx) {
        try { return Integer.parseInt(s); }
        catch (Exception e) {
            System.err.println("[경고] 번호 파싱 실패: EXERCISE_TRIPLES[" + idx + "] = \"" + s + "\" → 0으로 처리");
            return 0;
        }
    }

    /** 번호 중복/누락 검증(중복은 에러) */
    static void validateNumbers(List<ExerciseMeta> list) {
        Set<Integer> seen = new HashSet<>();
        for (ExerciseMeta e : list) {
            if (e.number() <= 0) continue;
            if (!seen.add(e.number())) {
                throw new IllegalArgumentException("[오류] 실습 번호가 중복되었습니다: " + e.number());
            }
        }
        if (!list.isEmpty()) {
            int max = list.stream().mapToInt(ExerciseMeta::number).max().orElse(0);
            Set<Integer> all = IntStream.rangeClosed(1, max).boxed().collect(Collectors.toSet());
            all.removeAll(list.stream().map(ExerciseMeta::number).collect(Collectors.toSet()));
            if (!all.isEmpty()) {
                System.err.println("[알림] 다음 번호가 목록에 없습니다(건너뛴 번호): " + all);
            }
        }
    }

    /** 목록 출력
     *  - 주제 칼럼: CJK 너비(2칸) 고려한 고정 폭 + 말줄임표(...)
     *  - 날짜/클래스/상태: 고정 폭
     */
    static void printCatalog(List<ExerciseMeta> list) {
        // 1) 주제 폭: 최대 표시폭 + 여유 2칸, [20, 40] 범위
        int maxTopicCols = list.stream().mapToInt(e -> displayWidth(e.topic())).max().orElse(6);
        int topicCols = Math.min(Math.max(20, maxTopicCols + 2), 40);

        // 2) 날짜 문자열 목록 & 폭 계산 (CJK 포함)
        List<String> dates = new ArrayList<>(list.size());
        for (ExerciseMeta e : list) {
            dates.add(e.date() == null ? "—" : e.date().format(OUT_FMT));
        }
        int maxDateCols = dates.stream().mapToInt(Main::displayWidth).max().orElse(16);
        int dateCols = Math.min(Math.max(18, maxDateCols), 26); // 너무 넓지 않게 상한

        // 3) 고정폭(ASCII 포함해도 CJK 헤더 대비) — 전부 padOrEllipsize로 처리
        int noCols = 4;      // "[01]"
        int classCols = 8;   // "Ex01" + 여유
        int statusCols = 6;  // "없음"/"OK" 둘 다 여유

        // 4) 헤더(모두 CJK 폭 기준 패딩)
        String hNo     = padOrEllipsize("No",     noCols);
        String hTopic  = padOrEllipsize("주제",    topicCols);
        String hDate   = padOrEllipsize("날짜",    dateCols);
        String hClass  = padOrEllipsize("클래스",  classCols);
        String hStatus = padOrEllipsize("상태",    statusCols);

        System.out.println(hNo + " " + hTopic + " " + hDate + " " + hClass + " " + hStatus);

        // 5) 로우
        for (int i = 0; i < list.size(); i++) {
            ExerciseMeta e = list.get(i);
            String noCell    = padOrEllipsize(String.format("[%02d]", e.number()), noCols);
            String topicCell = padOrEllipsize(e.topic(), topicCols);
            String dateCell  = padOrEllipsize(dates.get(i), dateCols);
            String clsCell   = padOrEllipsize(String.format("Ex%02d", e.number()), classCols);
            String status    = hasEntryPointCandidates(e.number()) ? "OK" : "없음";
            String statCell  = padOrEllipsize(status, statusCols);

            System.out.println(noCell + " " + topicCell + " " + dateCell + " " + clsCell + " " + statCell);
        }
        System.out.println();
    }


    /** 번호 입력 받기 */
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

    /** 해당 번호의 ExNN 클래스를 찾아 실행
     *  우선순위: main(String[]) → static run() → new 후 run()/start()
     *  후보 클래스명: Ex%02d, Ex%03d, Ex%d (Ex01, Ex001, Ex1)
     */
    static boolean runExercise(int number) {
        String[] candidates = classNameCandidates(number);
        String pkg = Main.class.getPackageName();

        for (String simple : candidates) {
            String fqcn = pkg.isEmpty() ? simple : pkg + "." + simple;
            try {
                Class<?> clazz = Class.forName(fqcn);

                // 1) static main(String[])
                try {
                    Method main = clazz.getMethod("main", String[].class);
                    if (Modifier.isStatic(main.getModifiers())) {
                        main.invoke(null, (Object) new String[0]);
                        return true;
                    }
                } catch (NoSuchMethodException ignored) {}

                // 2) static run()
                try {
                    Method run = clazz.getMethod("run");
                    if (Modifier.isStatic(run.getModifiers())) {
                        run.invoke(null);
                        return true;
                    }
                } catch (NoSuchMethodException ignored) {}

                // 3) 인스턴스 run()/start()
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
        System.out.printf("[!] 클래스를 찾을 수 없습니다: %s%n", Arrays.toString(candidates));
        return false;
    }

    /** 엔트리포인트(실행 가능 여부) 사전 점검 */
    static boolean hasEntryPointCandidates(int number) {
        String[] candidates = classNameCandidates(number);
        String pkg = Main.class.getPackageName();

        for (String simple : candidates) {
            String fqcn = pkg.isEmpty() ? simple : pkg + "." + simple;
            try {
                Class<?> c = Class.forName(fqcn);
                // main(String[])
                try {
                    Method main = c.getMethod("main", String[].class);
                    if (Modifier.isStatic(main.getModifiers())) return true;
                } catch (NoSuchMethodException ignored) {}
                // static run()
                try {
                    Method run = c.getMethod("run");
                    if (Modifier.isStatic(run.getModifiers())) return true;
                } catch (NoSuchMethodException ignored) {}
                // instance run()/start()
                for (String m : new String[]{"run", "start"}) {
                    try { c.getMethod(m); return true; }
                    catch (NoSuchMethodException ignored) {}
                }
            } catch (ClassNotFoundException ignored) {}
        }
        return false;
    }

    static String[] classNameCandidates(int number) {
        return new String[] {
                String.format("Ex%02d", number),
                String.format("Ex%03d", number),
                String.format("Ex%d", number)
        };
    }

    /* =========================
       ■ 정렬용 유틸 (CJK 폭 지원)
       ========================= */

    /** 문자열의 표시 폭(ASCII=1, 한글/한자/풀와이드=2) */
    static int displayWidth(String s) {
        int w = 0;
        for (int i = 0; i < s.length();) {
            int cp = s.codePointAt(i);
            w += isWide(cp) ? 2 : 1;
            i += Character.charCount(cp);
        }
        return w;
    }

    /** 주어진 폭으로 패드하거나, 넘칠 경우 ...으로 줄임 */
    static String padOrEllipsize(String s, int widthCols) {
        int w = displayWidth(s);
        if (w <= widthCols) {
            StringBuilder out = new StringBuilder(s);
            while (w < widthCols) { out.append(' '); w++; }
            return out.toString();
        }
        // 줄임: "..."(3칸)을 위해 예약
        int limit = Math.max(0, widthCols - 3);
        StringBuilder out = new StringBuilder();
        int used = 0;
        for (int i = 0; i < s.length();) {
            int cp = s.codePointAt(i);
            int cw = isWide(cp) ? 2 : 1;
            if (used + cw > limit) break;
            out.appendCodePoint(cp);
            used += cw;
            i += Character.charCount(cp);
        }
        out.append("...");
        used += 3;
        while (used < widthCols) { out.append(' '); used++; }
        return out.toString();
    }

    /** 동아시아 너비가 2칸인 코드포인트 판정(간단 범위 기반) */
    static boolean isWide(int cp) {
        return (cp >= 0x1100 && cp <= 0x11FF)   // Hangul Jamo
                || (cp >= 0x3130 && cp <= 0x318F)   // Hangul Compat Jamo
                || (cp >= 0xAC00 && cp <= 0xD7A3)   // Hangul Syllables
                || (cp >= 0x3000 && cp <= 0x303F)   // CJK Symbols & Punct
                || (cp >= 0x3040 && cp <= 0x309F)   // Hiragana
                || (cp >= 0x30A0 && cp <= 0x30FF)   // Katakana
                || (cp >= 0x4E00 && cp <= 0x9FFF)   // CJK Unified Ideographs
                || (cp >= 0x3400 && cp <= 0x4DBF)   // CJK Ext-A
                || (cp >= 0xF900 && cp <= 0xFAFF)   // CJK Compatibility Ideographs
                || (cp >= 0xFF01 && cp <= 0xFF60)   // Fullwidth Forms
                || (cp >= 0xFFE0 && cp <= 0xFFE6);  // Fullwidth symbol variants
    }
}
