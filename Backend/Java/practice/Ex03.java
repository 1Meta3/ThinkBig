package practice;

public class Ex03 {

    /** int... 합계 (오버플로우 줄이려고 long 누적/반환) */
    public static long sum(int... nums) {
        if (nums == null || nums.length == 0) return 0L;
        long s = 0L;
        for (int n : nums) s += n;
        return s;
    }

    /** double... 합계 */
    public static double sum(double... nums) {
        if (nums == null || nums.length == 0) return 0.0;
        double s = 0.0;
        for (double n : nums) s += n;
        return s;
    }

    /** int... 평균 (빈 입력이면 NaN) */
    public static double average(int... nums) {
        if (nums == null || nums.length == 0) return Double.NaN;
        // long으로 누적 후 double로 나눔 (정밀도/범위 안전)
        return (double) sum(nums) / nums.length;
    }

    /** double... 평균 (빈 입력이면 NaN) */
    public static double average(double... nums) {
        if (nums == null || nums.length == 0) return Double.NaN;
        return sum(nums) / nums.length;
    }

    public static void main(String[] args) {
        System.out.println("sum(1, 2, 3, 4) = " + sum(1, 2, 3, 4));      // 10
        System.out.println("sum(1.5, 2.5, 3) = " + sum(1.5, 2.5, 3));    // 7.0
        System.out.println("avg(1, 2, 3, 4) = " + average(1, 2, 3, 4));  // 2.5
        // 주의: 빈 인자는 오버로드 모호성 생길 수 있으니 명시적으로 타입 지정
        System.out.println("avg([]) (int)    = " + average(new int[]{1,2,3,4}));     // NaN
        System.out.println("avg([]) (double) = " + average(new double[]{1.23, 1.552, 2.352}));  // NaN
    }
}
