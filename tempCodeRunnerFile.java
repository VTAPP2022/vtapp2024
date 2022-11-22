import java.util.Scanner;
public class Main {
   // calculate hotel tarrif. room rent is 20% high during peak seasons(april-june, november-december)
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.println("Enter the month");
        String month = sc.next();
        System.out.println("Enter the number of days");
        int days = sc.nextInt();
        int roomRent = 0;
        if (month.equals("april") || month.equals("may") || month.equals("june") || month.equals("november") || month.equals("december")) {
            roomRent = 1200 * days;
        } else {
            roomRent = 1000 * days;
        }
        System.out.println("Room rent is " + roomRent);
    }
    
}
