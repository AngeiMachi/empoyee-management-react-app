export enum EmployeeStatus{
    Working = 'Working',
    OnVacationser = 'On Vacation',
    LunchTime = 'Lunch Time',
    BusinessTrip = 'Business Trip', 
}

export const EmployeeStatusColors = {
    [EmployeeStatus.Working]: '#4caf50',
    [EmployeeStatus.OnVacationser]: '#f44336',
    [EmployeeStatus.LunchTime]: '#ff9800',
    [EmployeeStatus.BusinessTrip]: 'purple',
};
