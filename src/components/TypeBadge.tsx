import React from "react";
import { Badge } from "./ui/badge";

function TypeBadge({ children }: { children: string }) {
  let bgColorClass = "";

  switch (children.toLowerCase()) {
    case "normal":
      bgColorClass = "bg-gray-300";
      break;
    case "fire":
      bgColorClass = "bg-red-500";
      break;
    case "water":
      bgColorClass = "bg-blue-500";
      break;
    case "electric":
      bgColorClass = "bg-yellow-400";
      break;
    case "grass":
      bgColorClass = "bg-green-500";
      break;
    case "ice":
      bgColorClass = "bg-blue-200";
      break;
    case "fighting":
      bgColorClass = "bg-red-700";
      break;
    case "poison":
      bgColorClass = "bg-purple-600";
      break;
    case "ground":
      bgColorClass = "bg-yellow-800";
      break;
    case "flying":
      bgColorClass = "bg-blue-300";
      break;
    case "psychic":
      bgColorClass = "bg-purple-500";
      break;
    case "bug":
      bgColorClass = "bg-green-600";
      break;
    case "rock":
      bgColorClass = "bg-gray-600";
      break;
    case "ghost":
      bgColorClass = "bg-indigo-500";
      break;
    case "dragon":
      bgColorClass = "bg-purple-800";
      break;
    case "dark":
      bgColorClass = "bg-gray-800";
      break;
    case "steel":
      bgColorClass = "bg-gray-400";
      break;
    case "fairy":
      bgColorClass = "bg-pink-400";
      break;
    default:
      bgColorClass = "bg-gray-500";
      break;
  }

  return (
    <Badge className={`min-w-fit   uppercase  ${bgColorClass}`}>
      {children}
    </Badge>
  );
}

export default TypeBadge;
