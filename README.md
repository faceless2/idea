# Some ideas for an unnamed website
This repository is a means of testing some ideas on an unnamed website.
The ideas are all about restyling elements or moving them around in the DOM.

The website is not named anywhere in this repository.

## Why?
* To be able to test some layout ideas out without bothering the primary devs,
* To provide a way for them and others to test the ideas while navigating a live site
* To do this without requiring any permanent changes to the site.


## How it works
Running the `loader.js` script on the page will do the following:
* add a red "lightbulb" icon pinned to the bottom-left of the page (id `communityidea-activator`)
* add a panel pinned to the left of the page which can be toggled open/close by clicking the lightbulb (id `communityidea-container`)
* add a stylesheet loading `style.css`
* create a single global function `communityIdeaLoader` and a single global property `communityIdeas`

The loader will then run `communityIdeaLoader()` to load the "ideas",
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


# How to load the loader manually, as a one off
To load the ideas manually, open the website and paste this into the console
```
(()=>{let s = document.createElement("script"); s.src = "https://unlikelyproducts.com/idea/loader.js"; document.head.appendChild(s); })()
```
Obviously this will have to be done each time the page is loaded

# How to load the loader always
To load the ideas automatically, add this to the document head
```
<script src="https://unlikelyproducts.com/idea/loader.js"></script>
```
