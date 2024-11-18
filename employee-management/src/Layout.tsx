import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import styles from './Layout.module.scss';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <AppBar position="static" className={styles.appBar}>
        <Toolbar className={styles.toolbar}>
          <Typography variant="h6" component="div" className={styles.title}>
            Employees
          </Typography>
          <Button className={styles.logoutButton} variant="outlined">
            Log Out
          </Button>
        </Toolbar>
      </AppBar>
      <Container className={styles.container}>
        {children}
      </Container>
    </>
  );
};

export default React.memo(Layout);
