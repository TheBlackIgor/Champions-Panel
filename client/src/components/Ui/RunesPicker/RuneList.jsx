import React, { useState, useEffect } from "react";

import "./RunesList.css";
import Miniature from "../Miniature";

const DUMMY_RUNES = {
  Domination: {
    1: ["DarkHarvest", "Electrocute", "HailOfBlades", "Predator"],
    2: ["CheapShot", "TasteOfBlood", "SuddenImpact"],
    3: ["ZombieWard", "GhostPoro", "EyeballCollection"],
    4: [
      "IngeniousHunter",
      "RelentressHunter",
      "TreasureHunter",
      "UltimateHunter",
    ],
  },
  Inspiration: {
    1: ["GlacialAugment", "FirstStrike", "UnsealedSpellbook"],
    2: ["HextechFlashtraption", "MagicalFootwear", "PerfectTiming"],
    3: ["BiscuitDelivery", "FutureMarket", "MinionDematerializer"],
    4: ["CosmicInsight", "ApproachVelocity", "TimeWarpTonic"],
  },
  Precision: {
    1: ["PressTheAttack", "FleetFootwork", "LethalTempo", "Conqueror"],
    2: ["Triumph", "Overheal", "PresenceOfMind"],
    3: ["LegendAlacrity", "LegendBloodline", "LegendTenacity"],
    4: ["CoupDeGrace", "CutDown", "LastStand"],
  },
  Resolve: {
    1: ["GraspOfTheUndying", "Guardian", "VeteranAftershock"],
    2: ["Demolish", "FontOfLife", "MirrorShell"],
    3: ["Conditioning", "SecondWind", "BonePlating"],
    4: ["Overgrowth", "Revitalize", "Unfinching"],
  },
  Sorcery: {
    1: ["ArcaneComet", "SummonAery", "PhaseRush"],
    2: ["Pokeshield", "ManaflowBand", "NimbusCloak"],
    3: ["AbsoluteFocus", "CelerityTemp", "Transcendence"],
    4: ["GatheringStorm", "Scorch", "Waterwalking"],
  },
};

export default function RuneList(props) {
  const [runes, setRunes] = useState([]);
  const [loading, setLoading] = useState(true);
  // const trees = Object.keys(DUMMY_RUNES)

  useEffect(() => {
    setRunes(DUMMY_RUNES[props.category]);
    setLoading(false);
  }, [props.category]);

  const handlePick = (pickedRune) => {
    props.close();
    props.pick(pickedRune);
  };

  if (!loading) {
    let itemList = [];
    if (props.tree === "second") {
      [2, 3, 4].forEach((i) => {
        runes[i].forEach((rune) => {
          itemList.push(
            <Miniature
              key={rune}
              name={rune}
              type={"rune"}
              image={props.category + "/" + i + "/" + rune + ".png"}
              click={handlePick}
            />
          );
        });
      });
    } else
      itemList = runes[props.idx].map((rune) => {
        return (
          <Miniature
            key={rune}
            name={rune}
            type={"rune"}
            image={props.category + "/" + props.idx + "/" + rune + ".png"}
            click={handlePick}
          />
        );
      });

    return (
      <div className="list-container">
        <div className="items">
          <div className="button-container">
            <button onClick={props.close}>Close</button>
          </div>
          {itemList}
        </div>
      </div>
    );
  } else
    return (
      <div className="list-container">
        <div className="items">
          <div className="button-container">
            <button onClick={props.close}>Close</button>
          </div>
          Loading...
        </div>
      </div>
    );
}
