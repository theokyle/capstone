const data = {
  user: {
    username: "frodo",
    steps: [
      { date: "August 18, 2025", steps: 10602 },
      { date: "August 19, 2025", steps: 8980 }
    ],
    activeJourney: "Journey to Mount Doom",
    activeJourneySteps: 19582,
    activeJourneyMilestones: [
      { id: 1, completed: true },
      { id: 2, completed: false },
      { id: 3, completed: false }
    ]
  },
  journeys: [
    {
      name: "Journey to Mount Doom",
      universe: "Middle Earth",
      description: "Walk from the Shire to Mount Doom",
      milestones: [
        {
          id: 1,
          name: "The High Hay",
          distance: 15000,
          description: "The hedge at the edge of the Shire"
        },
        {
          id: 2,
          name: "The Old Forest",
          distance: 30000,
          description: "Mysterious forest"
        },
        {
          id: 3,
          name: "Bree",
          distance: 45000,
          description: "The Town of Bree"
        }
      ]
    }
  ]
};

export { data };
