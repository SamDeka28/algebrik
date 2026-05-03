import type { Metadata } from "next";
import Solr26Landing from "@/components/solr26/Solr26Landing";

export const metadata: Metadata = {
  title: "Solr26 | Algebrik",
  description:
    "Credit union lending trends, efficiency, and growth—four quarters, one story. Explore the data and what it means for your institution.",
};

export default function Solr26Page() {
  return <Solr26Landing />;
}
