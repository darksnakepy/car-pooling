"use client"
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import { useRouter } from 'next/navigation';


interface UserMenuProps{
    username: string
    isDriver?: boolean
}

const UserMenu = ({username, isDriver}: UserMenuProps) =>{

    const router = useRouter()

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const open = Boolean(anchorEl)

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    }
    const handleClose = () => {
        setAnchorEl(null);
    }

    const handleClickProfile = () =>{
        router.push("/profile")
    }

    const handleLogOut = () =>{

    }

    return (
        <div>
            <button onClick={handleClick}>My profile</button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={handleClickProfile}>{username}</MenuItem>
                <MenuItem onClick={handleLogOut}>Log out</MenuItem>
            </Menu>
      </div>
    )
    
}

export default UserMenu