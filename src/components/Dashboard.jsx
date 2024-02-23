import React from "react";
import { AppBar, Button, Container, Grid, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <>
      <AppBar position="static">
        <Container>
          <Toolbar>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={4} lg={4}>
                <Link to='/' style={{ textDecoration: 'none', color: 'white' }}>
                    <Typography variant="h2">POKEAPP</Typography>
                </Link>
              </Grid>
              <Grid item xs={12} md={4} lg={4}>
                <Link to='/pokedex'>
                    <Button variant="contained" color="secondary">
                        <Typography variant="h4"  style={{ textDecoration: 'none', color: '#FF3939' }}>POKÉDEX</Typography>
                    </Button>
                </Link>
              </Grid>
              <Grid item xs={12} md={4} lg={4}>
                <Link to='/favoritos'>
                    <Button variant="contained" color="secondary">
                        <Typography variant="h4"  style={{ textDecoration: 'none', color: '#FF3939' }}>FAVORITOS</Typography>
                    </Button>
                </Link>
              </Grid>
            </Grid>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}

export default Dashboard;