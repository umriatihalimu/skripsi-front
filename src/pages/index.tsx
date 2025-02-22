import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Index = () => {
  const router = useRouter();
  useEffect(() => {
    // redirect ke hal login
    router.replace("/login");
  }, [router]); //jalankan hanya jika routernya berubah
  // tdk kembalikan apa apa di hal index
  return null;
};

export default Index;
