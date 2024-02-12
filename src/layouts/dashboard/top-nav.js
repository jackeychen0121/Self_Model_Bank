import PropTypes from 'prop-types';

import {
  Avatar,
  Box,Popover,
  Stack,
  ToggleButton, ToggleButtonGroup,
  useMediaQuery
} from '@mui/material';
import { useContext, useState } from 'react';
import { alpha } from '@mui/material/styles';
import { usePopover } from 'src/hooks/use-popover';
import { AccountPopover } from './account-popover';
import { useRouter } from 'next/router'

const TOP_NAV_HEIGHT = 64;

export const TopNav = (props) => {
  const [alignment, setAlignment] = useState('');

  const router = useRouter();
  const accountPopover = usePopover();

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
    if(newAlignment=="overview"){
      router.push('/')
    }else{
      router.push('/transaction')
    }
  };

  return (
    <>
      <Box
        component="header"
        sx={{
          backdropFilter: 'blur(6px)',
          backgroundColor: (theme) => alpha(theme.palette.background.default, 0.5),
          position: 'fixed',
          width:"100%",
          top: 0,
          zIndex: (theme) => theme.zIndex.appBar
        }}
      >
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="space-between"
          spacing={2}
          px={2}
          sx={{
            minHeight: TOP_NAV_HEIGHT,
          }}
        >
            <ToggleButtonGroup
              value={alignment}
              exclusive
              onChange={handleAlignment}
              aria-label="text alignment"
            >
              <ToggleButton value="overview" aria-label="left aligned">
                Overview
              </ToggleButton>
              <ToggleButton value="transaction" aria-label="centered">
                Transactions
              </ToggleButton>
            </ToggleButtonGroup>
            <Avatar
              onClick={accountPopover.handleOpen}
              ref={accountPopover.anchorRef}
              sx={{
                cursor: 'pointer',
                height: 40,
                width: 40
              }}
              src="/assets/avatars/avatar-anika-visser.png"
            />
        </Stack>
      </Box>
      <AccountPopover
        anchorEl={accountPopover.anchorRef.current}
        open={accountPopover.open}
        onClose={accountPopover.handleClose}
      />
    </>
  );
};

TopNav.propTypes = {
  onNavOpen: PropTypes.func
};
