import React, {useState, useEffect} from 'react'
import AppBar from '@mui/material/AppBar';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { createMuiTheme } from '@material-ui/core/styles';



//axios
import url from './services/url';


function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">      
      <Link color="inherit" href="https://mui.com/">
        Dados Abertos
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#00bcd4',
    },
  },
});




export default function App() {  
  
  const [data, setData] = useState([]);  
  const [currentPage, setCurrentPage] = useState(1);
  const [searchPage, setSearchPage] = useState('');
  

  useEffect(() => {
    const fetchData = async () => {
      setData([])
      const result = await url.get(`dadosabertos?page=${currentPage}&search=${searchPage}`);
      setData(result.data.data);
      
    };
    fetchData();
  }, [currentPage, searchPage]);

  const handlePageClick = (data) => {    
    const selectedPage = data.selected;    
    setCurrentPage(selectedPage);
  };

  


  return (
    <ThemeProvider theme={theme}> 
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          
          <Typography variant="h6" color="inherit" noWrap>
            Dados Abertos
          </Typography>
        </Toolbar>
      </AppBar>

      
      <main>
      
        <Container sx={{ py: 8 }} maxWidth="md">
          
        <TextField onChange={(e) => setSearchPage(e.target.value)} sx={{ width: '100%'}} value={searchPage} id="outlined-basic" label="Buscar:" variant="outlined" />

        
        <br />
        <br />
        <br />
        <br />
       
        
          {/* End hero unit */}
          <Grid container spacing={4}>    
               
          {data.length > 0 ? data.map((item) => (
              <Grid item key={item.id} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      // 16:9
                      pt: '56.25%',
                    }}
                    image="https://midias.jornalcruzeiro.com.br/wp-content/uploads/2019/03/ubs_980.jpg"
                    alt="random"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {item.nome}
                    </Typography>
                    <Typography>
                      {item.cidade} - {item.uf}
                    </Typography>
                  </CardContent>
                  <CardActions>
                  
                  </CardActions>
                </Card>
              </Grid>     
              
              
            )) : 


            <Grid xs={12} sm={12} md={12}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                 
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                    <Alert severity="error">
                    <AlertTitle>Aguarde</AlertTitle>
                    Carregando — <strong>aguarde um momento...</strong>
                  </Alert>
                    </Typography>
                    <Typography>
                      
                    </Typography>
                  </CardContent>
                  <CardActions>
                  
                  </CardActions>
                </Card>
              </Grid>           
         
            } 
          </Grid>
          <Button onClick={() => setCurrentPage(currentPage - 1)}
              type="button"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Pagina Anterior
            </Button>
            <Button onClick={() => setCurrentPage(currentPage + 1)}
              type="button"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Próxima Pagina
            </Button>
       
            
        </Container>
        
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Portal
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Portal brasileiro de dados abertos
        </Typography>
        
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}