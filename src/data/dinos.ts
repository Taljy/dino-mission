// src/data/dinos.ts
// Erweitert um habitats und period für jeden Dino
// Datenquelle: Modell-Wissen, kalibriert für 6-jährige Andrin-Zielgruppe

export type Period = "Trias" | "Jura" | "Kreide";
export type Habitat = "Wald" | "Wüste" | "Sumpf" | "Ebene" | "Küste" | "Meer" | "Berg" | "Fluss";

export interface Dino {
  slug: string;
  name: string;
  fullName: string;
  image: string;
  facts: string[];
  diet: "Pflanzenfresser" | "Fleischfresser" | "Allesfresser";
  era: string;
  period: Period;
  periodStartMya: number;
  periodEndMya: number;
  habitats: Habitat[];
}

export const PERIOD_INFO: Record<Period, { 
  label: string; 
  startMya: number; 
  endMya: number; 
  color: string;
  icon: string;
}> = {
  Trias: { 
    label: "Trias", 
    startMya: 252, 
    endMya: 201,
    color: "#C9784A",
    icon: "🌋",
  },
  Jura: { 
    label: "Jura", 
    startMya: 201, 
    endMya: 145,
    color: "#5BA942",
    icon: "🌿",
  },
  Kreide: { 
    label: "Kreide", 
    startMya: 145, 
    endMya: 66,
    color: "#5A8FB8",
    icon: "🦴",
  },
};

export const HABITAT_INFO: Record<Habitat, { label: string; icon: string }> = {
  Wald:    { label: "Wald",    icon: "🌳" },
  Wüste:   { label: "Wüste",   icon: "🏜️" },
  Sumpf:   { label: "Sumpf",   icon: "🌾" },
  Ebene:   { label: "Ebene",   icon: "🌾" },
  Küste:   { label: "Küste",   icon: "🏖️" },
  Meer:    { label: "Meer",    icon: "🌊" },
  Berg:    { label: "Berg",    icon: "⛰️" },
  Fluss:   { label: "Fluss",   icon: "💧" },
};

export const DINOS: Dino[] = [
  {
    slug: "trex",
    name: "T-Rex",
    fullName: "Tyrannosaurus Rex",
    image: "/dinos/trex.png",
    facts: ["König der Dinos", "Riesige Zähne", "Winzige Arme", "Lief auf 2 Beinen"],
    diet: "Fleischfresser",
    era: "Vor 68 Millionen Jahren",
    period: "Kreide",
    periodStartMya: 68,
    periodEndMya: 66,
    habitats: ["Wald", "Küste", "Ebene"],
  },
  {
    slug: "brachiosaurus",
    name: "Brachiosaurus",
    fullName: "Brachiosaurus",
    image: "/dinos/brachiosaurus.png",
    facts: ["Sehr langer Hals", "Höher als ein Haus", "Sanftmütig", "Frass Blätter von Bäumen"],
    diet: "Pflanzenfresser",
    era: "Vor 154 Millionen Jahren",
    period: "Jura",
    periodStartMya: 154,
    periodEndMya: 150,
    habitats: ["Wald", "Ebene"],
  },
  {
    slug: "stegosaurus",
    name: "Stegosaurus",
    fullName: "Stegosaurus",
    image: "/dinos/stegosaurus.png",
    facts: ["Platten am Rücken", "Stachel am Schwanz", "Kleiner Kopf", "Lief auf 4 Beinen"],
    diet: "Pflanzenfresser",
    era: "Vor 150 Millionen Jahren",
    period: "Jura",
    periodStartMya: 155,
    periodEndMya: 150,
    habitats: ["Wald", "Ebene"],
  },
  {
    slug: "triceratops",
    name: "Triceratops",
    fullName: "Triceratops",
    image: "/dinos/triceratops.png",
    facts: ["Drei Hörner", "Grosser Nackenschild", "Vier dicke Beine", "So gross wie ein Elefant"],
    diet: "Pflanzenfresser",
    era: "Vor 68 Millionen Jahren",
    period: "Kreide",
    periodStartMya: 68,
    periodEndMya: 66,
    habitats: ["Wald", "Ebene"],
  },
  {
    slug: "velociraptor",
    name: "Velociraptor",
    fullName: "Velociraptor",
    image: "/dinos/velociraptor.png",
    facts: ["Schnell wie der Wind", "Scharfe Krallen", "Schlau und gerissen", "So gross wie ein Hund"],
    diet: "Fleischfresser",
    era: "Vor 75 Millionen Jahren",
    period: "Kreide",
    periodStartMya: 75,
    periodEndMya: 71,
    habitats: ["Wüste", "Ebene"],
  },
  {
    slug: "pterodactylus",
    name: "Pterodactylus",
    fullName: "Pterodactylus",
    image: "/dinos/pterodactylus.png",
    facts: ["Konnte fliegen", "Lange Flügel", "Spitzer Schnabel", "Kein echter Dino!"],
    diet: "Fleischfresser",
    era: "Vor 150 Millionen Jahren",
    period: "Jura",
    periodStartMya: 150,
    periodEndMya: 148,
    habitats: ["Küste", "Meer"],
  },
  {
    slug: "ankylosaurus",
    name: "Ankylosaurus",
    fullName: "Ankylosaurus",
    image: "/dinos/ankylosaurus.png",
    facts: ["Wie ein Panzer", "Keule am Schwanz", "Sehr stark", "Lief tief am Boden"],
    diet: "Pflanzenfresser",
    era: "Vor 68 Millionen Jahren",
    period: "Kreide",
    periodStartMya: 68,
    periodEndMya: 66,
    habitats: ["Wald", "Ebene"],
  },
  {
    slug: "diplodocus",
    name: "Diplodocus",
    fullName: "Diplodocus",
    image: "/dinos/diplodocus.png",
    facts: ["Langer Hals UND Schwanz", "So lang wie 3 Busse", "Kleiner Kopf", "Frass Pflanzen"],
    diet: "Pflanzenfresser",
    era: "Vor 152 Millionen Jahren",
    period: "Jura",
    periodStartMya: 154,
    periodEndMya: 150,
    habitats: ["Ebene", "Fluss"],
  },
  {
    slug: "parasaurolophus",
    name: "Parasaurolophus",
    fullName: "Parasaurolophus",
    image: "/dinos/parasaurolophus.png",
    facts: ["Kamm am Kopf", "Konnte trompeten", "Lief auf 2 Beinen", "Lebte in Herden"],
    diet: "Pflanzenfresser",
    era: "Vor 75 Millionen Jahren",
    period: "Kreide",
    periodStartMya: 76,
    periodEndMya: 73,
    habitats: ["Wald", "Sumpf"],
  },
  {
    slug: "spinosaurus",
    name: "Spinosaurus",
    fullName: "Spinosaurus",
    image: "/dinos/spinosaurus.png",
    facts: ["Grosses Segel am Rücken", "Konnte schwimmen", "Krokodil-Kopf", "Jagte Fische"],
    diet: "Fleischfresser",
    era: "Vor 95 Millionen Jahren",
    period: "Kreide",
    periodStartMya: 99,
    periodEndMya: 93,
    habitats: ["Fluss", "Sumpf", "Küste"],
  },
  {
    slug: "allosaurus",
    name: "Allosaurus",
    fullName: "Allosaurus",
    image: "/dinos/allosaurus.png",
    facts: ["Grosser Jäger", "Schärfere Zähne als T-Rex", "Schnell und stark", "Lief auf 2 Beinen"],
    diet: "Fleischfresser",
    era: "Vor 155 Millionen Jahren",
    period: "Jura",
    periodStartMya: 155,
    periodEndMya: 145,
    habitats: ["Wald", "Ebene"],
  },
  {
    slug: "pachycephalosaurus",
    name: "Pachycephalosaurus",
    fullName: "Pachycephalosaurus",
    image: "/dinos/pachycephalosaurus.png",
    facts: ["Kopf wie ein Helm", "Hat sich geboxt mit dem Kopf", "Knochenkuppel", "Lief auf 2 Beinen"],
    diet: "Pflanzenfresser",
    era: "Vor 70 Millionen Jahren",
    period: "Kreide",
    periodStartMya: 70,
    periodEndMya: 66,
    habitats: ["Wald", "Berg"],
  },
  {
    slug: "iguanodon",
    name: "Iguanodon",
    fullName: "Iguanodon",
    image: "/dinos/iguanodon.png",
    facts: ["Stachel am Daumen", "Lief auf 2 oder 4 Beinen", "Grosser Pflanzenfresser", "Sehr sanft"],
    diet: "Pflanzenfresser",
    era: "Vor 125 Millionen Jahren",
    period: "Kreide",
    periodStartMya: 130,
    periodEndMya: 120,
    habitats: ["Wald", "Sumpf", "Ebene"],
  },
  {
    slug: "compsognathus",
    name: "Compsognathus",
    fullName: "Compsognathus",
    image: "/dinos/compsognathus.png",
    facts: ["So klein wie ein Huhn", "Sehr schnell", "Jagte Eidechsen", "Hatte Federn"],
    diet: "Fleischfresser",
    era: "Vor 150 Millionen Jahren",
    period: "Jura",
    periodStartMya: 151,
    periodEndMya: 148,
    habitats: ["Küste", "Wald"],
  },
  {
    slug: "therizinosaurus",
    name: "Therizinosaurus",
    fullName: "Therizinosaurus",
    image: "/dinos/therizinosaurus.png",
    facts: ["Riesige Krallen", "Längste Krallen aller Tiere", "Lief auf 2 Beinen", "Frass Blätter"],
    diet: "Pflanzenfresser",
    era: "Vor 70 Millionen Jahren",
    period: "Kreide",
    periodStartMya: 72,
    periodEndMya: 68,
    habitats: ["Wald", "Wüste"],
  },
  {
    slug: "mosasaurus",
    name: "Mosasaurus",
    fullName: "Mosasaurus",
    image: "/dinos/mosasaurus.png",
    facts: ["Lebte im Meer", "Riesig wie ein Bus", "Kein echter Dino!", "Jagte Fische"],
    diet: "Fleischfresser",
    era: "Vor 70 Millionen Jahren",
    period: "Kreide",
    periodStartMya: 70,
    periodEndMya: 66,
    habitats: ["Meer"],
  },
];
