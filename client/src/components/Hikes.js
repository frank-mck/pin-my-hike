import React from "react";

export const Hikes = () => {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/hikes/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);
  return (
    <div data-testid="hike">
      hello
      <h1>{data}</h1>
    </div>
  );
};
