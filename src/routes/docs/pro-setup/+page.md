---
title: "Getting Started"
description: "Get started with Denkplan Portfolio Maps for Jira."
---

After installation, the app will be available in all projects.
See the [Administrators Guide](/docs/admin-guide) for how to enable the app on specific projects.
The app will first redirect you to the [overview screen](/docs/overview) of a project, where you can add and manage portfolio maps. 
Story maps "live" in projects - however, this does not mean that they are
limited in this way. You can add issues from any project and configure boards with
multiple projects as backlogs for the story map.

### Adding a new story map


You can create a new story map by clicking the button in the top right-hand corner.

You can select between a dynamic and a static map. Read more about the [differences between these two map types here](/docs/map-types). In most cases, we now recommend going with dynamic maps.

After choosing the dynamic map type, you can select your Jira agile board, and you are good to go. If you choose a static map, the welcome assistant will open - where you can specify a name for the story map. 

![Setup Step 1](/docs/setup1.png)

You can then define which issue you want to use for the backbone of the story map. See our best practice guide that describes the structure of a user story map. If you leave this field empty, the map will either (a) pick the standard epic issue type or (b) ask again when opening the map if the standard epic type is not available in your project.
Lastly, you can select an agile board to use as a backlog. This step is **optional**. You can either pick a board later or add the issues manually to the story map if you do not want to use Jira Software features or only have a Jira Core license.

### Importing Issues

The welcome assistant for static maps automatically lets you import issues with the selected issue type from the current project or - if you have chosen one - from the agile board.
For example, the app will import existing epics and all issues within those epics into the story map. Please beware that managing the same issues from multiple story maps is discouraged because it can confuse your teammates if they observe changes to their story maps without their actions.
