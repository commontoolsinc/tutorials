---
title: Working with State
short_title: State
description: How state is handled in the Common Tools runtime
subject: Tutorial
authors:
  - name: Ellyse Cedeno
    email: ellyse@common.tools
keywords: commontools, state, Cell, database
abstract: |
  In this section, we discover how state is handled in the runtime, how persistence is related, and discuss common patterns to use.
---
## Handling State

In this chapter, we'll build out lunch voting charm.
It's multi-user, meaning you can hand out the URL to multiple people and each user will be able to interact with the charm. This will be a good example to see how state is handled and what parts are stored in the database.

Let's spend a little time discussing what this charm should do and how it relates to statefullness.

### List of Destinations
Users can create a list of lunch destinations. Destinations will be a simple string for now.
Users can add, edit, and remove destinations at any time.
This list will be stateful and persisted, meaning that all users will see the same list and changes happen in real-time on all users viewing the screen.
Returning to the charm later will show the same list (assuming no one has changed in it in the meantime!)

### Vote
Users can cast a yes, maybe, or no vote for each destination.
A vote is in the form of a tuple {date, destination, user, yes|no|maybe}

The current user voting is a just a text input field. This tells the system who is voting. For version 1, this means that the current user is the same for everyone interacting with the charm at the same time, since it's stored in a single state variable. We'll learn about other patterns that let us work around this in the future chapters. 

A User can have up to one vote per destination. The system checks the current date to see if the
day has changed and the user can revote.

Votes are persisted just like destinations.

### Summary
The system summarizes the current state for today.
It looks at all the destinations, and for each one it shows the list of users and their corresponding vote.
The list is sorted by descending Score (`Yes - No + 0.5 * Maybe`).
The summary is stateful, meaning that any changes in votes automatically updates everyone's Summary display.

:::{table} Table caption
:label: table
:align: center
| Destination  | Score | Yes | Maybe | No |
| :--- | :--- | :--- | :--- | :--- |
| Cheeseboard  | 3 | 3 - Alex, Gideon, Jake | 2 - Ben, Tony | 1 - Robin |
| Fava         | 2.5 | 1 - Berni | 4 - Alex, Gideon, Jake, Ellyse, Ben | 1 - Robin |
| Saul's       | 2 | 2 - Alex, Ben | 2 Berni, Gideon | 1 - Robin |
:::

With this, we should have enough information to start writing the charm.

## Skeleton Recipe

We often start with a very basic, and I mean *basic* recipe.
We saw this already in {ref}`skeleton_recipe` section of a previous chapter.
We'll shameless copy the same recipe. If you are following along, enter the code
from {ref}`state_recipe1`.

```{code-block} typescript
:label: state_recipe1
:linenos: true
:caption: Skeleton Recipe
/// <cts-enable />
import {
  BuiltInLLMContent,
  Cell,
  cell,
  Default,
  derive,
  h,
  handler,
  ifElse,
  llm,
  NAME,
  recipe,
  UI,
} from "commontools";

export default recipe("Basic Recipe", () => {
  return {
    [NAME]: "Basic Recipe",
    [UI]: (
      <div>
        <h2>Hello, World!</h2>
      </div>
    ),
  };
});
```

You can now deploy the code. See the section {ref}`deploy_charms` for how to do this.

## Types!
Type Driven Development, let's figure out what types we'll need.
* Destinations is an array of strings.
* Users is an array of strings.
* Vote is an object with date, destination, user, yes|no|maybe
* Current user is just a string (an element in the Users array)

The typescript implementation is in {ref}`state_types`.

```{code-block} typescript
:label: state_types
:linenos: true
:caption: Lunch Voting Types
type Destinations = string[];
type Users = string[];
type VoteChoice = "yes" | "no" | "maybe";
interface Vote {
  date: string;
  destination: string;
  user: string;
  choice: VoteChoice;
}
```

## Destinations

We'll now create the list of destinations. First, let's set up a `Cell`. A `Cell` stores state. It has get() and set() functions. We'll create our `Cell` using the `cell()` function. This is already in our import list. We'll also add this to the [UI] section of the recipe too, so we can see the contents.

```{code-block} typescript
:label: state_destinations
:linenos: true
:caption: Destinations List
const destinations = cell<Destinations>([]);

  /// code

    [UI]: (
      <div>
        <h2>Hello, World!</h2>
        <div>
          {destinations.map((d) => (
            <li>destinations: {destinations}</li>
          ))}
        </div>
      </div>
    ),
```


