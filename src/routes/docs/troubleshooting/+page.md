---
title: "Troubleshooting"
description: "Common issues and questions"
---

### The Release button is not visible

You might be using a project where the Release feature is not enabled.
Please go to the Project Administration -> Features and enable Releases.

### The Sprint button is not visible

In team managed projects, it is possible that the Sprint feature is disabled. See above for the same problem
with the Release feature.
If you are using a Classic Project (or using Server or Data Center), the selected agile board might not support
Sprints or you do not have Manage Sprints permission.

### Sprint creation fails even though I have "Manage Sprints" permission

The selected agile board contains more than one project. You need to have Manage Sprints permission
in all included projects.

### Can not add issue to sprint, customfield_xxxxx can not be set

Make sure the sprint field is visible on the edit issue screen.
If you created your project from a template that is not the scrum template, you need
to add this field manually.

### Issue appears in the story map but not in any Sprint swim lane in Sprint view

You might have had this issue in a previous sprint and that sprint was completed.
Unfortunately, Jira does not clear the sprint field even when the issue is moved back to the backlog
and / or is still in an open or in progress state.
You need to manually reopen the old sprint and clear the field. [See here for more info](https://support.atlassian.com/jira-software-cloud/docs/reopen-a-sprint/?_ga=2.89584147.901247001.1583153067-2088401750.1574865265).

### Can not add issue to release

If you have more than 1 project in your story map, you will see
the release versions of all projects. But you can only assign the
issues from one project to fixVersions of the same project. There is
unfortunately nothing we can do about this.

If you want to plan cross-project releases, we recommend you use
the custom swim lane or custom field mapping feature, available in Denkplan Portfolio Maps for Jira.

### Could not update estimate

There are unfortunately several reasons for this:

1. The configured board is a scrum board but the context for the story points field does not include the current issue type.
See this [community thread](https://community.atlassian.com/t5/Jira-questions/Story-points-not-visible-for-Issues/qaq-p/1315572) for further info.
2. The configured board is a Kanban board or no board is configured and you have enabled
the estimation feature via the settings - you need to make sure the story point field is
available on the edit screen of the issue type.
3. You entered an invalid value for the field. The portfolio mapping app will try to cast any value
to a number and this operation can fail.

### I can't find the app in the project sidebar (Free Edition)

Currently only Software Projects are supported in the free edition (Denkplan Portfolio Maps for Jira supports all project types).
You won't find the Sidebar item in Business or Jira Service Management projects.

Additionally, you need "Edit Issues" permission in the project in order to use the story mapping features.

### How do I change the epic issue type (Free version)

You can rename the epic issue type in Jira.

If you do, the portfolio mapping app will ask you for the epic type once. In the free version, there is no
feature to change this later. But if you absolutely need to, you can look at the Projects Entity Properties (you can install the [Entity Property Tool](https://marketplace.atlassian.com/apps/1214509/entity-property-tool-for-jira?hosting=cloud&tab=overview) to do this) - then
change the "tech.realigned.project.stmEpicId" property to the new value.

Note that a feature to use arbitrary issue types as epics is part of Denkplan Portfolio Maps for Jira.
The free edition only works with the default epic issue type.
