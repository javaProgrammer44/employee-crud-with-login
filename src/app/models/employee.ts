export class Employee {
  id: number;
  employeeName: string;
  department: string;


  constructor(i: number, en: string, d: string) {
    this.id = i;
    this.employeeName = en;
    this.department = d;
  }
}
