const data = {
  user: {
    username: "frodo",
    steps: [
      { date: "August 18, 2025", steps: 10602 },
      { date: "August 19, 2025", steps: 8980 }
    ]
  },
  journeys: [
    {
      name: "Journey to Mount Doom",
      universe: "Middle Earth",
      description: "Walk from the Shire to Mount Doom",
      milestones: [
        {
          name: "The High Hay",
          distance: 40000,
          description: "The hedge at the edge of the Shire"
        },
        {
          name: "The Old Forest",
          distance: 80000,
          description: "Mysterious forest"
        },
        { name: "Bree", distance: 150000, description: "The Town of Bree" }
      ]
    }
  ]
};

export { data };
