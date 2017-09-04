# Readme Kanban Board

Write a markdown based kanban board in your **README.md** and have it converted to an image and injected in.

## Example

In your **README.md**, simply have a commented section like this, in the format:

    <!---KANBAN
    # To Do
    - Eat healthy food
    - Exercise regularly
    - Learn sign language

    # In Progress
    - Drink too much

    # Done
    - Regret my decisions
    - Age too quickly
    KANBAN--->

Which generates:

![created by readme-kanban-board](http://i.imgur.com/OXBxPqB.png)
<!---KANBAN
# To Do
- Eat healthy food
- Exercise regularly
- Learn sign language

# In Progress
- Drink too much

# Done
- Regret my decisions
- Age too quickly
KANBAN--->

## Install

    npm i readme-kanban-board

## Usage

Add it to package.json scripts, similar to:

    "scripts": {
      "readme-kanban-board": "readme-kanban-board"
    }

Then fire it up by running:

    npm run readme-kanban-board

## Yes that's all well and good, but what does it actually _do_?

- Finds kanban code in your README.md file
- Parses it up
- Generates a kanban board of it with HTML/CSS
- Creates a screenshot of said HTML
- Saves the image to repo / uploads to imgur (optional)
- Injects/updates an image link in your README.md

## Extra options

Add an `imgur` flag if you wish for the generated kanban image to be hosted externally, on imgur:

    "scripts": {
      "readme-kanban-board": "readme-kanban-board imgur"
    }
