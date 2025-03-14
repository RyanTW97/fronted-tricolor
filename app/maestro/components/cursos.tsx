"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";

interface CursoProps {
  title: string;
  description: string;
  contents: string[];
  price: string;
}

const CursoCard: React.FC<CursoProps> = ({
  title,
  description,
  contents,
  price,
}) => {
  return (
    <div className="flex justify-center items-center">
      <Card className="w-80 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-blue-800">
            {title}
          </CardTitle>
          <CardDescription className="text-gray-600">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700">Este curso incluye:</p>
          <ul className="list-disc pl-6 text-gray-700 mt-2">
            {contents.map((content, index) => (
              <li key={index}>{content}</li>
            ))}
          </ul>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <span className="text-green-600 font-bold text-lg">{price}</span>
          <button className="px-4 py-2 bg-blue-800 text-white font-semibold rounded hover:bg-blue-700 transition duration-300">
            Inscribirme
          </button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CursoCard;
