# Some ideas for an unnamed website
This repository is a means of testing some ideas on an unnamed website. It injects some code into
the website which allows these ideas to be tested: each
individual idea patches the website in a particular way (moving
elements around in the DOM, adding stylesheets etc).

It does this in the browser - all the changes are temporary.

The website is not named anywhere in this repository.

## How to use it
Load the loader (see below), then click on the red "lightbulb" icon pinned to the bottom left
of the page. This will open a panel with a list of patches that can be made to the current page, each
of which changes the layout in a particular way. A patch can always be unapplied to return the DOM to the
original state. If a patch determined it cannot be applied to the current page, it is disabled.

The loader should *always*  be safe to run. None of the ideas are applied by default, and all of them
should check if they can be cleanly applied to the DOM before they load.

### Run the loader manually, as a one off
To load the ideas manually, load the website, open the JavaScript console, paste in the below text and hit enter. If you reload the page or navigate to a new page, this will need to be done again.

```
(()=>{let s = document.createElement("script"); s.src = "https://unlikelyproducts.com/idea/loader.js"; document.head.appendChild(s); })()
```

### Run the loader manually using a bookmark (recommended)
Bookmark the above Javascript to run it with a single click. Go to https://unlikelyproducts.com/idea and follow the instructions.

### Run the loader permanently
To load the ideas automatically, this would need to be added to the to the source code for any page.
```
<script src="https://unlikelyproducts.com/idea/loader.js"></script>
```

## How it works under the hood
Running the `loader.js` script on the page will do the following:
* add a red "lightbulb" icon pinned to the bottom-left of the page (id `communityidea-activator`)
* add a panel pinned to the left of the page which can be toggled open/close by clicking the lightbulb (id `communityidea-container`)
* add a stylesheet loading `style.css`
* create a single global function `communityIdeaLoader` and a single global property `communityIdeas`

The loader will check it hasn't been loaded before, then run `communityIdeaLoader()` to load the "ideas",
starting with `000/script.js`, then `001/script.js`
and so on until it hits a 404. Each idea is simply an object which has
* a `load()` function to add it to the `communityIdeas` array, or return false if its preconditions aren't met
* an `activate()` function to apply
* a `deactivate()` function to restore any changes made in `activate()`

Activating an idea changes the DOM - maybe moving stuff around, maybe just adding a stylesheet - and
a list of the currently active ideas are stored in local storage, so they're maintained over page
loads and navigation around the site.

The "?" button next to each idea's name will give more detail on the idea.

The ideas are maintained in github at https://github.com/faceless2/idea, and any checkins to that
repository are immediately mirrored to https://unlikelyproducts.com/idea, where the content is served from.


## Useful?
If you want to contribute any just make a PR or ask for commit rights. Or you can clone
this and run under your own domain if you want, all internal links are relative to the URL for `loader.js`.
