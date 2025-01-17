import { AppBar, Box, Toolbar, IconButton, Typography, Button } from "@mui/material";
import Grid from "@mui/material/Grid2"
 
export default function Layout({ children }: { children: React.ReactNode }) {
    const authImagePath = process.env.BASE_URL + '/img/authImage.png';
    const bookddyLogoPath = process.env.BASE_URL + '/img/bookddyLogoName.png';
  return (
    <Grid container spacing={0} className="h-screen bg-[#FCF8EE]">
      <Grid size={6} className="bg-[#09535E] justify-items-center content-center rounded-r-[44px]"> 
        <img src={authImagePath} alt="Hands holding a book"/>
      </Grid>
      <Grid size={6} container className="justify-items-center content-center">
        <Grid size={12} className="mb-4 justify-items-center">
            <img src={bookddyLogoPath} alt="Bookddy Logo"/>
        </Grid>
        <Grid size={12} className="justify-items-center">
        {children}
        </Grid>
      </Grid>
    </Grid>
  );
}