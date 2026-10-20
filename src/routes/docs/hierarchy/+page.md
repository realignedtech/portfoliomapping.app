---
title: "Hierarchy & Top-level Elements"
description: "Using the different levels of the portfolio map hierarchy"
---

### Basics

You can optionally add top-level elements to the portfolio map. These can be toggled on and off like the previously available "Goal" feature, which this new functionality replaces.
Previously added goals stay in place, and can you can edit and use them just like before.

### Activating the top-level row

In the top right-hand corner, you will find the hierarchy button. Clicking it will open the drawer to configure the top-level row and change the second-level hierarchy issue and link types.

![Hierarchy Configuration](/docs/Hierarchy.png)

Select an issue type for the top-level row - the link type is required for dynamic maps and optional for static maps.
The app does not load elements already associated with this issue link type on a static map. 

On a dynamic map, changing the link type will reload the map that is currently displayed with the new configuration.

### Using the new top-level elements

After configuring the top-level row as described above, you can add issues via the add button in the top right-hand corner of the map.

![Add Button](/docs/AddButton.svg)

Create the issue by typing in the issue summary and hitting enter. You can now drag this issue to the top left-hand corner, where the new top-level element will appear.

![Adding an issue](/docs/AddFeature.png)

After creation, you can drag elements from the backbone row to under the new top-level issue. The app will do the rest: associate the column with the top-level element and maintain the issue link between them.

![Portfolio Map Visualization](/docs/Vis1.svg)

### Using the Jira build-in parent link

Jira offers custom hierarchy settings with Premium plans. You can learn more [here](https://support.atlassian.com/jira-software-cloud/docs/configure-custom-hierarchy-levels-in-advanced-roadmaps/).
In order to use them with Portfolio Maps, please follow these setup instructions.

#### Setup instructions

All nested issue types should be available in the project where you manage your portfolio maps.
The reason is that the app checks the available issue types from the project settings and offers these types to create issues from the map.

Once you have added the issue types to the issue type scheme, there is one more step.

You need to add the field "parent" to all issue screens (view, edit and create screen) for the automatic linking to work.
If the field is not on the right screen, then linking will silently fail, and you will not see the hierarchy correctly in a dynamic map when you reload the page. The issue will be "hidden" to you on a static map since the linking feature is optional.

#### Activating the feature

Please go to the admin configuration of Portfolio Maps and check the "Premium features" toggle. You can now select the
"parent (built-in)" link type in hierarchy settings and the app will maintain the issue connections for you.
