"use client";

import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
    <div className="flex w-full justify-center">
      <Card className="w-full max-w-3xl shadow-lg">
        {/* Imagen del curso */}

        <CardHeader>
          <CardTitle className="text-2xl font-bold  text-blue-800 mb-6">
            {title}
          </CardTitle>
          <div className="w-full h-96 relative">
            <Image
              src="/curso.webp"
              alt="Curso"
              fill
              className="object-cover"
            />
          </div>
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
          <a
            href="https://wa.link/f131w5"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="px-4 py-2 bg-blue-800 text-white font-semibold rounded hover:bg-blue-700 transition duration-300">
              Inscribirme
            </button>
          </a>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CursoCard;
