import theme from './styles/theme';
import  { useCallback, useEffect, useMemo, useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import Layout from './Layout';
import EmployeeList from './components/employee-list';
import { Employee, EmployeeStatus } from './models';
import EmployeeToolbar from './components/employee-toolbar';

const API = 'http://localhost:3001/users';

interface EmployeeFilter {
  status: EmployeeStatus | '';
  searchText: string;
}
function App() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [employeeFilter, setEmployeeFilter] = useState<EmployeeFilter>({ status: '', searchText: '' });

  const filteredEmployees = useMemo(() => {
    return employees.filter((employee) => {
      const isStatusMatch = employeeFilter.status === '' || employee.status === employeeFilter.status;
      const isSearchTextMatch = employee.name.toLowerCase().includes(employeeFilter.searchText.toLowerCase());
      return isStatusMatch && isSearchTextMatch;
    });
  }, [employees, employeeFilter]);
  
  useEffect(() => {
    const fetchEmployees = async () => {
      const response = await fetch(API);
      const data = await response.json();
      setEmployees(data);
    }
    fetchEmployees();
  }, []);

 const handleStatusChange =useCallback( async (id: number, status: EmployeeStatus) => {
    try {
        const response =await fetch(`${API}/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });
      if (response.ok) {
        const updatedEmployees = await response.json();
        setEmployees(updatedEmployees);
      }  
    } catch (error) {
      setEmployees(prev=>prev);
      alert('Failed to update employee status');
    }
  },[setEmployees]);

  const handleFilterChange = useCallback( async (status: EmployeeStatus | '' ,searchText:string) => {
    setEmployeeFilter({ status, searchText });
  },[setEmployeeFilter]);

  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <EmployeeToolbar onFilterChange={handleFilterChange} />
        <EmployeeList employees={filteredEmployees} onStatusChange={handleStatusChange}/>
      </Layout>
    </ThemeProvider>
  );
}

export default App;
