---
title: "Map Types"
description: "Portfolio Maps for Jira offers two different types of a portfolio map"
---

## Introduction

Portfolio Maps for Jira offers two different types of a map.
Dynamic maps load all issues from an agile board, and you can arrange them using their rank and issue links. Static maps work more like documents, letting you add issues freely from anywhere in Jira, even without an agile board.

## Dynamic maps

Select "Add Portfolio Map" from the overview screen to create a dynamic map.
Select the dynamic map type in the next screen and specify which board to use.
This is all that is needed to set up the map. You can configure levels and issue link configurations while working with the app.

### How does the dynamic map load issues?

If you do not have top-level elements set up, the map will load the Epic issues from your board (default) or the issue type you configured in the hierarchy settings.
If you set up top-level elements, the map will look for all connected issues with the specified issue link and load epics or the configured issue type for the second level.

## Static maps

To add a static map, select the static map type from the creation screen - step 2 of the setup will open, and you can enter the name of the map, select the backbone issue type, and optionally the agile board for sprint assignment and act as a backlog for your map.

### How does the static map load issues?

The static map maintains the order of the columns (backbone) in a static document saved in your Jira instance. It will then load all related issues to these elements, either through the link type (if one is specified) or through the internal issue attribute that the map maintains.

Using only the internal issue attribute to connect issues on the portfolio map (which means - not selecting a link type or not using the epic issue type) enables creating and maintaining a portfolio map without affecting existing issue relationships or agile board data.
