import TripOriginIcon from '@mui/icons-material/TripOrigin';
import React, { useCallback, useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  MenuItem,
  Select,
  FormControl,
  SelectChangeEvent,
  Box
} from '@mui/material';
import styles from './EmployeeCard.module.scss';
import { Employee, EmployeeStatus, EmployeeStatusColors } from '../../../models';

interface EmployeeCardProps {
  employee: Employee;
  onStatusChange: (id: number, status: EmployeeStatus) => void;
}

const EmployeeCard: React.FC<EmployeeCardProps> = ({ employee ,onStatusChange }) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus =useCallback( () => setIsFocused(true),[setIsFocused]);
  const handleBlur =useCallback(() => setIsFocused(false),[setIsFocused]);

  const handleChange = useCallback((event: SelectChangeEvent<EmployeeStatus>) => {
    onStatusChange(employee.id,event.target.value as EmployeeStatus);
  }, [employee.id, onStatusChange]);

  return (
    <Card className={`${styles.card} ${isFocused ? styles.focused : ''}`}
      onMouseLeave={handleBlur} // Remove glow when use leaves card
      >
      <Avatar
        src={employee.img}
        className={styles.avatar}
        sx={{ width: 156, height: 156 }}
      />
      <CardContent className={styles.info}>
        <Typography variant="h6" className={styles.name}>
          {employee.name}
        </Typography>
        
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <Select
            labelId="selet-status-label"
            id="select-status"
            value={employee.status || EmployeeStatus.Working}
            onChange={handleChange}
            label="Status"
            onOpen={handleFocus}  // Keep glow when dropdown is open
          >
            {Object.values(EmployeeStatus).map((status, index) => (
              <MenuItem key={index} value={status} sx={{
               
              }}>
              <Box display="flex" alignItems="center">
                  <TripOriginIcon
                    sx={{
                      color: EmployeeStatusColors[status],
                      width: 14,
                      height: 14
                    }}
                  />
                  <Typography variant="body2" fontWeight="bold" sx={{ marginLeft: '8px' }}>
                    {status}
                  </Typography>
                </Box>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </CardContent>
    </Card>
  );
};

export default React.memo(EmployeeCard);
