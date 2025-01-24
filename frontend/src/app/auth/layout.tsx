import Grid from "@mui/material/Grid2";
import Image from "next/image";
 
export default function Layout({ children }: { children: React.ReactNode }) {
    const authImagePath = '/img/authImage.svg';
    const bookddyLogoPath = '/img/bookddyLogoName.svg';
  return (
    <Grid container spacing={0} className="h-screen bg-[#FCF8EE]">
      <Grid size={6} className="bg-[#09535E] justify-items-center content-center rounded-r-[44px]"> 
        <Image 
            src={authImagePath}
            alt="Hands holding a book"
            width={650}
            height={650}/>
      </Grid>
      <Grid size={6} container className="justify-items-center content-center">
        <Grid size={12} className="mb-4 justify-items-center">
            <Image 
            src={bookddyLogoPath}
            alt="Bookdy logo"
            width={200}
            height={200}/>
        </Grid>
        <Grid size={12} className="justify-items-center">
        {children}
        </Grid>
      </Grid>
    </Grid>
  );
}