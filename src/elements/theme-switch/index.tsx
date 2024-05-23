import { Switch, SwitchProps, styled } from '@mui/material';

const ThemeSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))<SwitchProps>(({ theme }) => ({
  width: 68,
  height: 36,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(32px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: theme.palette.main.gray80,
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
      '.MuiSwitch-thumb': {
        backgroundColor: theme.palette.main.black,
      },
    },

    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 32,
    height: 32,
    backgroundColor: theme.palette.main.white,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
  },
  '& .MuiSwitch-track': {
    borderRadius: 68 / 2,
    backgroundColor: theme.palette.main.gray10,
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
    '&:before, &:after': {
      content: '""',
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      width: 16,
      height: 16,
    },
    '&:before': {
      backgroundImage: `url('/icons/sun.svg')`,
      left: 38,
    },
    '&:after': {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="moon-star"><path id="Icon" d="M13.4 8.83367C12.6134 10.2135 11.1287 11.1438 9.42677 11.1438C6.90265 11.1438 4.85645 9.0976 4.85645 6.57349C4.85645 4.87142 5.78689 3.38666 7.1669 2.6001C4.26788 2.87497 2 5.31625 2 8.28722C2 11.4424 4.55775 14.0001 7.7129 14.0001C10.6837 14.0001 13.1249 11.7325 13.4 8.83367Z" fill="${encodeURIComponent(
        '#9F9EA4'
      )}"/><path id="Icon_2" d="M11.6002 2L11.9709 2.74135C12.1302 3.05994 12.2098 3.21923 12.3162 3.35727C12.4106 3.47976 12.5204 3.58956 12.6429 3.68398C12.781 3.79038 12.9403 3.87003 13.2588 4.02932L14.0002 4.4L13.2588 4.77067C12.9403 4.92997 12.781 5.00962 12.6429 5.11602C12.5204 5.21043 12.4106 5.32024 12.3162 5.44273C12.2098 5.58077 12.1302 5.74006 11.9709 6.05865L11.6002 6.8L11.2295 6.05865C11.0702 5.74006 10.9906 5.58077 10.8842 5.44273C10.7898 5.32024 10.68 5.21043 10.5575 5.11602C10.4194 5.00962 10.2601 4.92997 9.94155 4.77067L9.2002 4.4L9.94154 4.02933C10.2601 3.87003 10.4194 3.79038 10.5575 3.68398C10.68 3.58956 10.7898 3.47976 10.8842 3.35727C10.9906 3.21923 11.0702 3.05994 11.2295 2.74135L11.6002 2Z" fill="${encodeURIComponent(
        '#9F9EA4'
      )}"/></g></svg>')`,
      right: 38,
    },
  },
}));
export default ThemeSwitch;
