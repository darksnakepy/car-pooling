"use client"
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import signOut from '~/signout/signout';

interface UserMenuProps {
    username?: string
}

const UserMenu = ({ username }: UserMenuProps) => {

    const router = useRouter()
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl)

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget)
    };

    const handleClose = () => {
        setAnchorEl(null)
    };

    const handleSignUp = () => {
        router.push("/register")
    };

    const handleClickProfile = () => {
        if (username) {
            router.push("/profile")
        } else {
            router.push("/login")
        }
    };

    return (
        <div>
            <button onClick={handleClick} className="text-white hover:text-gray-300 focus:outline-none">My profile</button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                {!username && <MenuItem onClick={handleSignUp}>Create an account</MenuItem>}
                <MenuItem onClick={handleClickProfile} >{username ? username : "Login"}</MenuItem>
                {username && <MenuItem onClick={async () => await signOut()}>Log out</MenuItem>}
            </Menu>
        </div>
    );
};

export default UserMenu;
