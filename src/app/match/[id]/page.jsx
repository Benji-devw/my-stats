'use client';
import { useParams } from "next/navigation";

const Test = () => {
  const { id } = useParams();
  return <div>Match {id}</div>;
};

export default Test;