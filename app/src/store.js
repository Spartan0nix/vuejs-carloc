export default {
  user: null,
  locations: [
    {
      name: "BMW m2",
      prix: 150,
      id: 1,
      image: "bmwM2.jpg",
      description: "Voiture sportive",
      details: [
        {
          puissance: 410,
          carburant: "essence",
          image: "bmwM2.jpg",
          marque: "BMW",
          couleur: "Blanc",
          boitevitesse: "sequentielle",
          modele: "M2",
          description:
            "Les BMW M2 incarnent le plaisir de la conduite sportive dans sa plus pure expression. La BMW M2 Competition se distingue par une sportivité accrue et impressionne par son mélange exceptionnel de performances, d’agilité et de précision."
        }
      ]
    },
    {
      name: "AMG C63",
      prix: 200,
      id: 2,
      image: "amgC63.jpg",
      description: "Voiture sportive",
      details: [
        {
          puissance: 510,
          carburant: "essence",
          image: "mercedesC63.jpg",
          marque: "Mercedes-Benz",
          couleur: "Noir",
          boitevitesse: "sequentielle",
          modele: "C63",
          description:
            "La Mercedes-Benz C 63 AMG est un modèle hautes performances de la classe C qui, lors de sa sortie, a surpassé en tous points les Audi RS4 et BMW M3."
        }
      ]
    },
    {
      name: "Suzuki swift",
      prix: 60,
      id: 3,
      image: "suzukiSwift.jpg",
      description: "Voiture citadine",
      details: [
        {
          puissance: 80,
          carburant: "hybrid",
          image: "suzukiswift.jpg",
          marque: "Suzuki",
          couleur: "Rouge",
          boitevitesse: "manuelle",
          modele: "Swift",
          description:
            "Un style unique, entre élégance et sportivité, la Suzuki Swift est reconnaissable au premier coup d’œil. A l’intérieur , une sellerie confortable et parfaitement dessinée, tout a été pensé pour enrichir votre expérience de conduite."
        }
      ]
    }
  ],
  options: [
    {
      name: "Protection Tous Risques",
      id: 1,
      description: "Une première description"
    },
    {
      name: "Protection au tiers ++",
      id: 2,
      description: "Une seconde description"
    },
    {
      name: "Extension 200km/jour",
      id: 3,
      description: "Une troisième description"
    }
  ]
};
