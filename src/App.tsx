import { useState, useEffect } from 'react';

interface Name {
  id: string;
  name: string;
}

function App() {
  const [names, setNames] = useState<Name[]>([]);

  useEffect(() => {
    const fetchNames = async () => {
      const response = await fetch('https://trip-api.dcism.org/api/test.php', {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: import.meta.env.VITE_API_KEY as string,
        },
      });
      const data = await response.json();

      return data.reports;
    };

    fetchNames().then((reports) => setNames(reports));
  }, []);

  return (
    <div className="dark font-secondary bg-background antialiased">
      <div className="flex h-screen w-full items-center justify-center p-8">
        <div>
          <h1 className="font-black">TRIP</h1>
          <p>Transit Routing & Integrated Payments</p>
          <ul className="my-4 list-disc pl-5">
            {names.length > 0 &&
              names.map((name, index) => (
                <li key={index} className="text-sm">
                  {name.id} - {name.name}
                </li>
              ))}
          </ul>
          <p>This is a test.</p>
        </div>
      </div>
    </div>
  );
}

export default App;
