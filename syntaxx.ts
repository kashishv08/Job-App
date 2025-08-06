// "1 day ago".slice(2, 5); //day
// "1 day ago".slice(0, 1); // number

const stringArr: (string | number)[] = [1, 3, "kashish"];
let arr: number[] = [1, 2, 3];
let str: string[] = ["1", "2", "3"];

let tuple: [string, boolean, number] = ["kashish", true, 1];

type userobj = {
  name: string;
  phone: number;
  collg?: string;
};

const obj: userobj = {
  name: "tulsi",
  phone: 8786868,
};

type stud = {
  rollno: number;
};

type studUser = userobj & stud;
