import Link from "next/link";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

type ProductCardProps = {
  id: number;
  title: string;
  description: string;
  price: number;
};

export default function ProductCard({
  id,
  title,
  description,
  price,
}: ProductCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>

      <CardContent>
        <p className="text-muted-foreground">{description}</p>
        <p className="mt-4 text-lg font-semibold">${price}</p>
      </CardContent>

      <CardFooter>
        <Link href={`/products/${id}`}>
          <Button>View Product</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
