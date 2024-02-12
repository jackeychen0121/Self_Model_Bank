import Head from 'next/head';
import { Box, Typography, Container, InputBase, Unstable_Grid2 as Grid, Button, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from "axios";
import RefreshIcon from '@mui/icons-material/Refresh';
import { SvgIcon } from '@mui/material';
import { TopNav } from '../layouts/dashboard/top-nav';
import Alert from "./../components/alert";
import { useRouter } from 'next/navigation';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

const Page = () => {
  const router = useRouter();
  const [alert, setAlert] = useState({ message: '', successful: true, open: false });
  const [transactionList, setTransactionList] = useState([]);
  const [bankNumber, setBankNumber] = useState('');

  const getTransactionData = async () => {
    try {
      const userStr = localStorage.getItem("user");
      const user = JSON.parse(userStr);
      setBankNumber(user.bankNumber);
      const response = await axios.get('/api/transaction?userID=' + user.id);
      const data = response.data;
      setTransactionList(data.data)
    } catch (error) {
      console.error('Error fetching file list:', error);
    }
  }

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (!userStr) router.push('/auth/login');
    getTransactionData();
  }, []);

  return (
    <>
      <Head>
        <title>
          Model Bank
        </title>
      </Head>
      <Alert message={alert.message} successful={alert.successful} open={alert.open} handleClose={() => { setAlert({ ...alert, open: false }); }} />
      <Box
        component="main"
      >
        <TopNav />
        <Container maxWidth="xl">
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            height="100vh"
            sx={{
              '@media (max-width:900px)': {
                height: "100%",
              }
            }}
          >
            <Grid
              container
              spacing={3}
            >
              <Grid
                xs={12}
                md={6}
              >
                <Typography align='center'
                  variant='h3'
                  mb="30px">
                  Transactions
                  <Button
                    sx={{ color: 'black' }}
                    onClick={() => getTransactionData}>
                    <SvgIcon fontSize="large">
                      <RefreshIcon />
                    </SvgIcon>
                  </Button>
                </Typography>
                {transactionList?.map((each, key) =>
                  <Box
                    sx={{ my: 2, mx: 2 }}
                    key={key}
                  >
                    <Grid container
                      alignItems="center"
                      item
                      xs>
                      <Stack direction="row"
                        justifyContent="space-around" 
                        color={each.sender == bankNumber ?'red':'green'}
                        width="100%">
                        {each.sender == bankNumber ? <ArrowRightAltIcon/> : <KeyboardBackspaceIcon />}
                        <Typography>{each.sender == bankNumber ? each.receiver : each.sender}</Typography>
                        <Typography>{each.amount}</Typography>
                        <Typography>{each.currency}</Typography>
                      </Stack>
                    </Grid>
                  </Box>
                )}

              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <img
                  alt="Go to pro"
                  src={`/assets/overview-normal.jpg`}
                  width="100%"
                />
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </>
  )
};

export default Page;
