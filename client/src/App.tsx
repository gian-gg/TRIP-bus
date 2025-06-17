import { useState } from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

function App() {
  const [count, setCount] = useState(0);
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
          </CardContent>
          <CardFooter className="text-sm">
            <p>© 2025, TIPR. All Rights Reserved.</p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default App;
