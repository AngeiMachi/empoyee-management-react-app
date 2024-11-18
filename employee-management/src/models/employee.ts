import { EmployeeStatus } from "./employee-status";

export interface Employee {
    id: number;
    name: string;
    status: EmployeeStatus;
    img: string;
}