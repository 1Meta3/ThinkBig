package practice;

import java.util.Scanner;

public class Ex02 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        long N = readNonNegativeLong(sc);  // 사용자 입력

        long evenSum = 0; // 짝수합
        long oddSum  = 0; // 홀수합

        // 1부터 N까지 훑으면서 합산
        for (long i = 1; i <= N; i++) {
            if (i % 2 == 0) {
                evenSum = evenSum + i;
            } else {
                oddSum = oddSum + i;
            }
        }

        System.out.println("N = " + N);
        System.out.println("짝수합 = " + evenSum);
        System.out.println("홀수합 = " + oddSum);
        System.out.println("검증(총합) = " + (evenSum + oddSum));

        sc.close(); // 단일 실행 프로그램이면 닫아도 OK
    }

    private static long readNonNegativeLong(Scanner sc) {
        while (true) {
            System.out.print("N을 입력하세요 (0 이상의 정수): ");
            if (sc.hasNextLong()) {
                long n = sc.nextLong();
                if (n >= 0) return n;
                System.out.println("0 이상의 정수만 가능합니다.");
            } else {
                System.out.println("숫자가 아닙니다. 다시 입력하세요.");
                sc.next(); // 잘못된 토큰 소비
            }
        }
    }
}
