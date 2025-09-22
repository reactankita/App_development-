import 'dart:io';

void main() {
  // Taking input from user
  print("Enter your name: ");
  String? name = stdin.readLineSync();

  print("Enter a number: ");
  int number = int.parse(stdin.readLineSync()!);

  // Output
  print("Hello, $name!");
  print("You entered: $number");

  // Using a for loop
  print("\nUsing for loop:");
  for (int i = 1; i <= number; i++) {
    print("Count: $i");
  }

  // Using a while loop
  print("\nUsing while loop:");
  int j = 1;
  while (j <= number) {
    print("Step: $j");
    j++;
  }

  // Using a do-while loop
  print("\nUsing do-while loop:");
  int k = 1;
  do {
    print("Round: $k");
    k++;
  } while (k <= number);
}