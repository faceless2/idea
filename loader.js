/**
 * The loader for "communityIdeas". Loads each idea (000, 001 etc) in sequence
 * and stores them in the "communityIdeas" array. That array and the function
 * are the only global properties created.
 *
 * Note the final idea (eg https://blah.org/idea/004/script.js) will return a 404,
 * at which point loading stops.
 */
if (typeof globalThis.communityIdeas === "undefined") {
    globalThis.communityIdeas = [];

    function communityIdeaLoader() {
        const baseurl = document.currentScript.src.substring(0, document.currentScript.src.lastIndexOf("/"));

        let style = document.createElement("link");
        style.rel = "stylesheet";
        style.href = baseurl + "/style.css";
        let container = document.createElement("div");
        let elt = document.createElement("div");
        elt.id = "communityidea-activator";
        container.id = "communityidea-container";
        container.classList.add("communityidea-hidden");
        elt.innerHTML = "💡";
        elt.addEventListener("click", () => {
            container.classList.toggle("communityidea-hidden");
        });
        let storage = null;
        try {
            storage = JSON.parse(window.localStorage.getItem("communityIdeas"));
        } catch (e) { }
        if (!Array.isArray(storage)) {
            window.localStorage.setItem("communityIdeas", JSON.stringify(storage = []));
        }

        function loader(index) {
            const script = document.createElement("script");
            const id = String(index).padStart(3, "0");
            script.src = baseurl + "/" + id + "/script.js?" + Date.now();
            script.addEventListener("load", () => {
                const idea = communityIdeas[index];
                const name = idea.name;
                const label = document.createElement("label");
                const input = document.createElement("input");
                const box = document.createElement("div");
                const help = document.createElement("a");
                input.type = "checkbox";
                input.addEventListener("change", () => {
                    if (input.checked) {
                        console.log("CommunityIdea: activating " + id + " \"" + name + "\"");
                        if (!idea.activate()) {
                            input.checked = false;
                            input.disabled = true;
                        } else {
                            storage[index] = true;
                        }
                    } else {
                        console.log("CommunityIdea: deactivating " + id + " \"" + name + "\"");
                        storage[index] = false;
                        idea.active = false;
                        idea.deactivate();
                    }
                    window.localStorage.setItem("communityIdeas", JSON.stringify(storage));
                });
                help.target = "_new";
                help.href = baseurl + "/" + id + "/about.html";
                help.appendChild(document.createTextNode("?"));
                label.appendChild(input);
                label.appendChild(document.createTextNode(name));
                box.appendChild(label);
                box.appendChild(help);
                container.appendChild(box);
                try {
                    if (!idea.load()) {
                        console.log("CommunityIdea: disabling " + id + " \"" + name + "\", preconditions not met");
                        input.disabled = true;
                    } else if (storage[index]) {
                        console.log("CommunityIdea: activating " + id + " \"" + name + "\"");
                        input.checked = true;
                        idea.activate();
                    }
                } catch (e) {
                    console.log("CommunityIdea: disabling " + id + " \"" + name + "\", load failed");
                    console.log(e);
                    input.disabled = true;
                }
                loader(index + 1);
            });
            document.head.appendChild(script);
        }

        document.head.appendChild(style);
        document.body.appendChild(elt);
        document.body.appendChild(container);
        loader(0);
    }

    // If the document already has a footer, we're being added manually after the page
    // has loaded: run the loader immediately. Otherwise, run the loader on completion
    if (document.getElementById("footer") != null) {
        communityIdeaLoader();
    } else {
        document.addEventListener("DOMContentLoaded", communityIdeaLoader);
    }
}
