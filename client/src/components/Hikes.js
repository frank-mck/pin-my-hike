import React from 'react'

export const Hikes = () => {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/hikes/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);
  return (
    <div>
      <h1 className ='hikes'>{data}</h1>
    </div>
  )
}

