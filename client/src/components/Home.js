import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Home({ setIsAuth }) {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    async function verification() {
      const response = await fetch('http://localhost:5000/api/auth/verification', {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
      });

      return await response.json();
    }

    if (token) {
      const data = verification();

      if (!data.error) {
        setIsAuth(true);
        navigate("/");
      } else {
        alert(data.error);
        setIsAuth(false);
      }
    }
  }, []);

  
  return (
    <div className="text-center">
      
    </div>
  );
}

export default Home;