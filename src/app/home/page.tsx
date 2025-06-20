import { useState, useEffect } from 'react';

import { Fetch } from '@/lib/api';

import {
  CardContainer,
  CardHeader,
  CardBody,
  CardFooter,
} from '@/components/Card';

interface Name {
  id: number;
  name: string;
}

const Home = () => {
  const [names, setNames] = useState<Name[]>([]);

  useEffect(() => {
    const fetchNames = async () => {
      const response = await Fetch.get('/test.php');
      return response.data.reports;
    };

    fetchNames().then((reports) => setNames(reports));
  }, []);
  return (
    <div className="font-base bg-base flex h-screen flex-col items-center justify-center">
      <CardContainer className="h-96">
        <CardHeader>
          <h1 className="text-xl font-semibold">TRIP</h1>
          <p>Transit Routing & Integrated Payments</p>
        </CardHeader>
        <CardBody>
          <h2 className="text-center font-semibold">
            Backend Connection Test:
          </h2>
          <table className="border-outline mt-2 min-w-full border text-sm">
            <thead>
              <tr>
                <th className="border-outline border px-2 py-1 text-left">
                  ID
                </th>
                <th className="border-outline border px-2 py-1 text-left">
                  Name
                </th>
              </tr>
            </thead>
            <tbody>
              {names.length > 0 ? (
                names.map((name) => (
                  <tr key={name.id} className="border-outline border">
                    <td className="border-outline border px-2 py-1">
                      {name.id}
                    </td>
                    <td className="px-2 py-1">{name.name}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={2} className="px-2 py-1 text-center">
                    Connection unsuccessful.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </CardBody>
        <CardFooter>© 2025, TRIP. All Rights Reserved.</CardFooter>
      </CardContainer>
    </div>
  );
};

export default Home;
