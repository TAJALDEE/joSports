// loadComponent.ts
import React, { LazyExoticComponent } from "react";

const LoadLibraryComponent = (
  combinedKey: string
): LazyExoticComponent<React.FC<{ sport: string; playerId: string }>> => {
  switch (combinedKey) {
    // Football components
    case "FootballTeams":
      return React.lazy(
        () => import("../app/sports/basketball/teams/basketballteam1")
      );
    case "FootballPlayers":
      return React.lazy(() => import("../app/sports/football/players/messie"));
    case "FootballRules":
      return React.lazy(
        () => import("../app/sports/football/rules/footballrules")
      );

    // Basketball components
    case "BasketballTeams":
      return React.lazy(
        () => import("../app/sports/basketball/teams/basketballteam1")
      );
    case "BasketballPlayers":
      return React.lazy(
        () => import("../app/sports/basketball/players/player")
      );
    case "BasketballRules":
      return React.lazy(
        () => import("../app/sports/basketball/rules/basketballrules")
      );

    // Tennis components
    case "TennisTeams":
      return React.lazy(() => import("../app/sports/tennis/teams/tennisteam"));
    case "TennisPlayers":
      return React.lazy(() => import("../app/sports/tennis/players/player"));
    case "TennisRules":
      return React.lazy(() => import("../app/sports/tennis/rules/tennisrules"));

    default:
      return React.lazy(() => import("../app/+not-found"));
  }
};

export default LoadLibraryComponent;
