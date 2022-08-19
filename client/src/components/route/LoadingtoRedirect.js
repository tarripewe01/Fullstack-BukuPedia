import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const LoadingtoRedirect = () => {
  const navigate = useNavigate();

  const [count, setCount] = useState(5);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 1000);

    count === 0 && navigate("/login");
    return () => clearInterval(interval);
  }, [count, navigate]);

  return (
    <div style={{marginTop: 200}}>
      <h5> Redirecting you in {count} seconds</h5>
    </div>
  );
};

export default LoadingtoRedirect;
