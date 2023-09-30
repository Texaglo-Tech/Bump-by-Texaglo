import React from "react";
import Image from "next/image";
import dynamic from 'next/dynamic';

//INTERNAL IMPORT
import Style from "./NavProfile.module.css";
import images from "../../assets";

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import { useRouter } from "next/router";
import { logout } from "../../api";

const WalletMultiButtonDynamic = dynamic(
  async () => (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
  { ssr: false }
);

require('@solana/wallet-adapter-react-ui/styles.css');

const NavProfile = () => {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const router = useRouter();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <div className={Style.profile_section}>
        <WalletMultiButtonDynamic className={Style.profile_address_section} />

        <Button
          id="menu-button"
          aria-controls={open ? 'nav-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          >
          <Image
            className={Style.profile_img}
            src={images.profile_icon}
            alt="image"
          />
        </Button>
          <Menu
            id="nav-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'menu-button',
            }}
          >
            <MenuItem onClick={()=>{handleClose(); router.push("/profile")}}>Profile</MenuItem>
            <MenuItem onClick={()=>{handleClose(); router.push("/dashboard")}}>Dashboard</MenuItem>
            <MenuItem onClick={()=>{handleClose(); logout(router);}}>Logout</MenuItem>
          </Menu>
      </div>
    </>
  );
};

export default NavProfile;
