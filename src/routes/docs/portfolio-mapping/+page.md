---
title: "Using the App"
description: "Overview on how to use Denkplan Portfolio Maps for Jira"
---

### Introduction

After installation, you will find the app on the left side of your projects'
navigation.

If you use the app for the first time, the app will prompt you to create your first portfolio map. After clicking "Create Portfolio Map" you will have two options, a dynamic or a static map. You can find out more about these options here.

In this tutorial, we recommend you use the dynamic map type. For this, you need an existing Kanban board used for portfolio mapping.
The app will not alter the board or any issues on it when creating the app, so feel free to use any existing board.

![Getting Started](/docs/gettingstarted1.png)

The app is default looking for the built-in epic issue type in Jira. If the app can't find it, it will prompt you to specify which issue type you want to use for organizing issues into columns.

Existing issues will be loaded from the board and their relationship depends on the link-type configured to connect elements. See [hierarchy configuration](/docs/hierarchy) for details.

![Portfolio Map Overview](/docs/example-portfolio-overview.png)


### Organizing issues on the map

Using drag and drop, steps can be rearranged from left to right or from right to left. You can reorder them horizontally without changing the issues associated with these epics.
Jira issues in the user stories layer can also be reordered or associated with another step via drag and drop anywhere on the map.

![Dragging issues](/docs/dragging.png)

Dragging issues between the different layers is not supported and discouraged - you can not convert an issue to a column - please use distinct issue types for clarity.

You can add colors to each step to visually separate them. If you want to, you can also go to Settings -> Display and enable all issues in the column to inherit this color, helping to separate them visually.

![Adding colors](/docs/colors.png)

### Assigning issues to releases

If you want to plan releases, you can select the "Swimlanes" dropdown in the top left corner.

You will see existing sprints or releases from the underlying agile board.

You can add releases by clicking the "Add" button in the top right-hand corner.

![Adding a release](/docs/adding-release.png)


When dragging an issue from either the unassigned swimlane or another release swimlane, the app will associate the issue in the background with this release.
The change happens instantly in the UI, so you can quickly rearrange many issues at once.

![Dragging an issue to a release](/docs/dragging-to-release.png)

If you do not see the release options, the board or project
associated to your portfolio map, may not support this feature. See [troubleshooting](/docs/troubleshooting) for details.

### Custom swimlanes

Sometimes, managing story maps with sprints or releases is not enough. Custom swimlanes help you plan more long-term or deal with "fuzziness" - for example if you don't exactly know when a change can occur.

Custom swimlanes work with free form text, so you call them "Iteration 1" or "Iteration 2".
Or you could use "Near term" or "Medium-term" and create a more rough outline of your product roadmap.

Custom swimlane assignment is done internally via an issue property, that is largely invisible elsewhere in Jira. If
you want to see the value of custom swimlanes directly in your issue view, we recommend Custom Field Swimlanes.

### Custom field swimlanes

For organizations that organize their Jira-wide releases in custom fields - you can select the swimlanes to display values of single-select custom fields via the settings.
Learn more about [Custom Field Swimlanes](/docs/custom-field-swimlanes).

### Top Level Elements

Portfolio Mapping app supports a level above the backbone/step row representing high-level goals or strategy items.
Read more in the guide to [Hierarchy and Top-level Elements](/docs/hierarchy).

### Filters / Quick Filters

If you have an agile board associated with the portfolio map, you can find all quick filters from this board when clicking
the filter symbol next to the swimlane drop down in the top right-hand corner. You can activate the filters by clicking on them.
You can also add custom filters by using the filter manager, which you can open when clicking the "Manage Filters" button.
Filtering will limit the issues that will be visible but will not affect the columns displayed.
We suggest adding different static portfolio maps when you want to have a different column layouts.
