import React from 'react';
import EmployeeCard from './employee-card';
import styles from './EmployeeList.module.scss';
import { Employee, EmployeeStatus } from '../../models';

interface EmployeeListProps {
    employees: Employee[];
    onStatusChange: (id: number, status: EmployeeStatus) => void;   
  }
  
const EmployeeList: React.FC<EmployeeListProps> = ({ employees, onStatusChange }) => {
  
  return (
    <>
      <div className={styles.employeeListGrid}>
        {employees?.map((employee, index) => (
          <div key={index}>
            <EmployeeCard employee={employee} onStatusChange={onStatusChange} />
          </div>
        ))}
      </div>
    </>
  );
};

export default React.memo(EmployeeList);
