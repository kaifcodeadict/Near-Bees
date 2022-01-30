import './Footer.css'
import * as React from 'react';
import {BottomNavigation} from '@material-ui/core';
import {BottomNavigationAction} from '@material-ui/core';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import InstagramIcon from '@material-ui/icons/Instagram';
import Favorite from '@material-ui/icons/Favorite';

export default function LabelBottomNavigation() {
  const [value, setValue] = React.useState('recents');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <BottomNavigation sx={{ width: 100}}  onChange={handleChange}>
      <BottomNavigationAction
        label="Github"
        value="github"
        icon={<GitHubIcon/>}
        href="https://github.com/kaifcodeadict"
        target="_blank"
      
      />
      <BottomNavigationAction
        label="Linkedin"
        value="linkedin"
        href="https://www.linkedin.com/in/shaikh-kaif-604182214/"
        target="_blank"
        
        icon={<LinkedInIcon/>}
      />
      <BottomNavigationAction
        label="Instagram"
        value="instagram"
        href="https://www.instagram.com/kaif.studio_/"
        target="_blank"
        icon={<InstagramIcon/>}
      />
     <h2 style={{marginTop:"8px"}}> Made With {<Favorite />} By Kaif.Studio</h2>
    </BottomNavigation>
  );
}

