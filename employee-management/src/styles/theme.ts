import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'white',
       
        },
      },
    },
  },
});

export default theme;
