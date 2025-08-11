public class Main {
    public static void main(String[] args) {
        String ID = "Javalove";
        String ID_upper = "JAVAlove";
        if(ID.equalsIgnoreCase(ID_upper)){
            System.out.println("로그인 성공");
        } else {
            System.out.println("아이디가 일치하지 않습니다.");
        }
    }
}