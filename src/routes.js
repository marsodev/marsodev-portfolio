import SettingsApp from "./components/apps/SettingsApp/SettingsApp";
import ContactApp from "./components/apps/ContactApp/ContactApp";
import ProjectsApp from "./components/apps/ProjectsApp/ProjectsApp";
import GitHubApp from "./components/apps/GitHubApp/GitHubApp";
import SkillsApp from "./components/apps/SkillsApp/SkillsApp";
import SpotifyApp from "./components/apps/SpotifyApp/SpotifyApp";
import Calendev from "./components/apps/Calendev/Calendev";

export const appRoutes = {
  settings: SettingsApp,
  contact: ContactApp,
  projects: ProjectsApp,
  github: GitHubApp,
  skills: SkillsApp,
  calendev: Calendev,
  spotify: SpotifyApp,
};
