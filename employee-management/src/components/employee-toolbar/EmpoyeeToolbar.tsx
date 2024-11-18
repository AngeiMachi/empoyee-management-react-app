import React, { useCallback, useState } from 'react';
import { Button, TextField, MenuItem, InputAdornment, Box } from '@mui/material';
import { EmployeeStatus } from '../../models';
import styles from './EmployeeToolbar.module.scss';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';

const defaultStatus = 'Filter By Status';

interface EmployeeToolbarProps {
  onFilterChange: (status: EmployeeStatus ,searchText:string) => void;
}

const EmployeeToolbar: React.FC<EmployeeToolbarProps> = ({ onFilterChange }) => {
  const [filterStatus, setFilterStatus] = useState<EmployeeStatus | string>(defaultStatus);
  const [filterSearchText, setFilterSearchText] = useState<string>('');

  const handleFilterChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    let selectedStatus = e.target.value;
    setFilterStatus(selectedStatus);
    onFilterChange( (selectedStatus ===defaultStatus ? '':selectedStatus) as EmployeeStatus ,filterSearchText);
  },[filterSearchText,onFilterChange]);
  
  const handleSearchChange =useCallback( (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    setFilterSearchText(searchValue);
    onFilterChange( (defaultStatus ===filterStatus ? '':filterStatus) as EmployeeStatus ,searchValue);
  },[filterStatus,onFilterChange]);


  return (
    <div className={styles.toolbarContainer}>
      <Button variant="contained" 
              size="large"
              color="primary"
              className={styles.button}
              endIcon={<AddIcon />}>
        Create 
      </Button>
      <TextField
        variant="outlined"
        label="Type to search"
        className={styles.searchField}
        slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon /> 
                </InputAdornment>
              ),
              endAdornment: (
                <>
                  <InputAdornment position="end">
                    <Box sx={{ height: '24px', width: '1px', bgcolor: 'grey.500', mx: 1 }} />
                  </InputAdornment>
                  <TextField
                    select
                    variant="standard"
                    value={filterStatus}
                    onChange={handleFilterChange}
                    className={styles.filterSelect}
                    sx={{ minWidth: 120 }}
                  >
                    <MenuItem value={defaultStatus}>{defaultStatus}</MenuItem>
                    {Object.values(EmployeeStatus).map((status, index) => (
                      <MenuItem key={index} value={status}>
                        {status}
                      </MenuItem>
                    ))}
                  </TextField>
                </>
              ),
            },
          }}

        value={filterSearchText}
        onChange={handleSearchChange}
      />
     
    </div>
  );
};

export default React.memo(EmployeeToolbar);
