import { useState, useEffect } from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Name {
  id: string;
  name: string;
}

function App() {
  const [count, setCount] = useState(0);
  const [names, setNames] = useState<Name[]>([]);

  useEffect(() => {
    const fetchNames = async () => {
      const response = await fetch(
        'https://tipr-backend.dcism.org/api/test.php',
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: import.meta.env.VITE_API_KEY as string,
          },
        }
      );
      const data = await response.json();

      return data.reports;
    };

    fetchNames().then((reports) => setNames(reports));
  }, []);

  return (
    <div className="dark font-secondary bg-background antialiased">
      <div className="flex h-screen w-full items-center justify-center p-8">
        <Card className="h-auto w-full max-w-sm">
          <CardHeader>
            <CardTitle className="font-primary font-extrabold">TIPR</CardTitle>
            <CardDescription>
              Transit Integrated Payment & Routing
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <Button
              className="w-full hover:cursor-pointer"
              onClick={() => setCount((prev) => prev + 1)}
            >
              {count}
            </Button>

            <ul>
              {names.length > 0 &&
                names.map((name, index) => (
                  <li key={index} className="text-sm">
                    {name.id} - {name.name}
                  </li>
                ))}
            </ul>
          </CardContent>
          <CardFooter className="text-sm">
            <p>testing testing testing</p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default App;
