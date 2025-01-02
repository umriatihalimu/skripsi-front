import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Index = () => {
  const router = useRouter();
  useEffect(() => {
    // redirect ke dashboard
    router.replace("/dashboard");
  }, [router]); //jalankan hanya jika routernya berubah
  // tdk kembalikan apa apa di hal index
  return null;
};

export default Index;
