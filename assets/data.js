export const data = {
  user: {
    username: "frodo",
    steps: [
      { date: "August 18, 2025", steps: 10602 },
      { date: "August 19, 2025", steps: 8980 }
    ],
    activeJourney: 1,
    activeJourneySteps: 19000,
    currentMilestone: 2
  },
  journeys: [
    {
      id: 1,
      name: "Journey to Mount Doom",
      universe: "Middle Earth",
      description: "Walk from the Shire to Mount Doom",
      milestones: [
        {
          id: 1,
          name: "The High Hay",
          tag: "hedgewall",
          img: "highHay",
          distance: 15000,
          description: `Constantly tended, it was thick and tall, and ran for over twenty miles.
          At the north end the Hay ran down to the river-bank close to the Brandywine Bridge.
          Nearby was an opening in the barrier, the North Gate, where gate-guards were posted
          day and night. From there the Hay wound southwards to the confluence of the Brandywine
          River and the Withywindle. East of Crickhollow there was a private entrance that the
          Brandybucks used, which was a brick-lined tunnel under the Hay with a gate of thick-set
          iron bars on the forest side. At the south end there was either another gate or the hedge
           ended before the meeting of the two rivers because the town of Breredon was on the Old Forest
            side of the barrier.`
        },
        {
          id: 2,
          name: "The Old Forest",
          img: "oldForest",
          tag: "forest",
          distance: 30000,
          description: `The Old Forest, like Fangorn, was described to be dark and tangled, though
          both were less so than the Taur-im-Duinath of Beleriand. Aside from the trees, a valley
          lay at its center and the Withywindle river flowed through it. The Withywindle, as told
          in hobbit folklore, was the center of queerness in the vast queerness of the forest. At the
          south-eastern edge of the forest, on the bank of the river Withywindle, stood the house of
          Tom Bombadil - the only constructed dwelling in the forest. The home of Bombadil rested
          in a glade near the Withywindle—a sunny spot with green grass and bright trees. The pathway
          through the Old Forest known by the hobbits was near the bonfire grove, although when the company
          arrived there, it appeared to have shifted.`
        },
        {
          id: 3,
          name: "Bree",
          img: "bree",
          tag: "medieval_village",
          distance: 45000,
          description: `Bree was a town of Men and hobbits, located east of the Shire, north of the
          South Downs, west of Weathertop, and south of Fornost in Eriador. It was also the first of
          the Hobbit-settlements after the Wandering Days of the Hobbits were over. It was bordered
          on the north side by Bree-hill, from which stretched a dike and hedge in a great semicircle
          protecting the dwellings within. This barrier had three gates, through which the East-West
          Road passed.`
        }
      ]
    }
  ]
};
