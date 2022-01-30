import React, { createRef, useEffect } from 'react';
import { CircularProgress,Grid,Typography,InputLabel,MenuItem,FormControl,Select } from '@material-ui/core';
import { useState } from 'react';

import useStyles from './style'
import Place from '../Place/Place'




export default function List({places,childClick,loading,type,setType,rating,setRating}) {
  const classes = useStyles();
  
  const [elRefs, setElRefs] = useState([]);

  console.log({childClick});
 
  useEffect(() => { 
    setElRefs((refs)=>Array(places?.length).fill().map((_,i)=> refs[i] || createRef()))
  }, [places]);
  

  return (<div className={classes.container}>
    <Typography variant='h5'>
      Restaurants, Hotels & Attractions around you
    </Typography>
    {loading ? (
      <div className={classes.loading}>
        <CircularProgress size="5rem"/>
      </div>

    ):(
      <>
    <FormControl className={classes.formControl}>
      <InputLabel>Type</InputLabel>
    <Select value={type} onChange={(e)=> setType(e.target.value)} >
      <MenuItem value="restaurants">Restaurants</MenuItem>
      <MenuItem value="hotels">Hotels</MenuItem>
      <MenuItem value="attractions">Attractions</MenuItem>
    </Select>
    </FormControl>
    <FormControl className={classes.formControl}>
      <InputLabel>Rating</InputLabel>
    <Select value={rating} onChange={(e)=> setRating(e.target.value)} >
      <MenuItem value={0}>All</MenuItem>
      <MenuItem value={3}>Above 3.0</MenuItem>
      <MenuItem value={4}>Above 4.0</MenuItem>
      <MenuItem value={4.5}>Above 4.5</MenuItem>
    </Select>
    </FormControl>
    <Grid container spacing={3} className={classes.list}>
      
    {places?.map((place,i)=>(
    <Grid ref={elRefs[i]} item key={i} xs={12}>

      <Place
        place={place} 
        selected={Number(childClick) === i}
        refProp = {elRefs[i]}
      />

    </Grid>
    ))}

     </Grid>
     </>
    )}

  </div>);
}
