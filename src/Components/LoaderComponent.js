import { React, useState, useEffect } from "react";
import { SpinnerDotted } from "spinners-react";

function LoaderComponent(timer) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(
      () => {
        setLoading(false);
      },
      { timer }
    );
  }, [timer]);

  return (
    <div>
      <SpinnerDotted
        className="loader"
        size="5rem"
        color="rgb(220,20,60)"
        enabled={loading}
      />
    </div>
  );
}

export default LoaderComponent;
