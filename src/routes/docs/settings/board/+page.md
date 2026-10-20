---
title: "Board Configuration"
description: "How the board configuration works"
---

Configuring your board is a pivotal step to tailor your portfolio maps to your project's specific needs. This guide will walk you through selecting a Jira board as the base for your map, which will influence the filters, sprints, releases, and issues displayed.

## Accessing Board Settings

To begin configuring your board, navigate to:

Settings -> Board

Here, you will find a search field where you can select your desired Jira board.

This board will serve as the foundational filter for your map, determining the data and issues that will be visible and how they are organized.

### Impact of Board Selection

The chosen Jira board has several key implications for your map:

- **Quick Filters:** All quick filters configured in your Jira board will be automatically imported into Denkplan Portfolio Maps, allowing you to swiftly adjust which issues are visible based on your existing Jira configurations.

- **Sprints and Releases:** The sprints and visible releases associated with the selected board will be integrated into your map, offering a cohesive view of your project's timeline and milestones.

- **Issue Display:** The issues displayed on your map will be directly pulled from the selected board. If your map is configured as a "dynamic" map, it will continuously update to reflect the current state of the board.

## Understanding Visibility and Permissions

For any individual viewing the portfolio map, these permissions play a significant role:

- **Filter Visibility:** Ensure that the filter associated with your Jira board is shared appropriately. If the filter is private or restricted, it may limit the data available for your map.

- **User Permissions:** A user's ability to view issues on the map is governed by their permissions in Jira. If a user does not have the necessary permissions to view the board, its filter, or specific issues, those elements will not be visible to them on the map.

### Best Practices

- **Review Board Settings:** Regularly check the settings of your Jira board to ensure it aligns with your current project needs and that the filters and permissions are correctly configured.

- **Monitor Permissions:** Keep user permissions in mind, especially when working with sensitive or restricted information. Ensure that all intended users have the appropriate access levels.

- **General Map Consideration:** Remember that changes in the Jira board, such as added or removed filters, sprints, and issues, will reflect on your map. Keep your board configuration up-to-date to maintain an accurate and useful map.

If necessary, create a dedicated board for the portfolio map. This will make accidental changes to the board configuration less likely.
