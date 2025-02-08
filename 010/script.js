/**
 * Make Tree Apps first-class citizens
 */
communityIdeas[communityIdeas.length] = (() => {
    const baseurl = document.currentScript.src.substring(0, document.currentScript.src.lastIndexOf("/"));
    let link1, link2, script1, button, tab;
    let o = {
        name: "Integrated tree-apps",
        load: () => {
            link1 = document.createElement("link");
            link1.rel = "stylesheet";
            link1.href = baseurl + "/style.css";
            link2 = document.createElement("link");
            link2.rel = "stylesheet";
            link2.href = "https://apps.wikitree.com/apps/bremford24/test/views/slippyTree/style.css";
            script1 = document.createElement("script");
            script1.src = "https://apps.wikitree.com/apps/bremford24/test/views/slippyTree/script.js";
            return document.querySelector("#familyVitals") != null;
        },
        activate: () => {
            window.View = class View {
                constructor() {
                    this.id = null;
                    Object.assign(this, this?.meta()); // this will spread object into object fields for easier access
                }
                meta() {
                    return {
                        title: "Template view",
                        description: "Showcase of the views and their registration.",
                        docs: "https://example.com",
                    };
                }
                init(container_selector, person_id) {
                    document.querySelector(container_selector).innerHTML = `Template View for person with ID: ${person_id}`;
                }
                close() { }
            };
            document.head.appendChild(link1);
            document.head.appendChild(link2);
            document.head.appendChild(script1);
            script1.addEventListener("load", () => {
                if (!button) {
                    button = document.createElement("button");
                    button.classList.add("nav-link");
                    button.id = "familyTreeApps-tab";
                    button.setAttribute("data-bs-toggle", "tab");
                    button.setAttribute("data-bs-toggle", "tab");
                    button.setAttribute("data-bs-target", "#familyTreeApps");
                    button.setAttribute("role", "tab");
                    button.setAttribute("aria-controls", "familyTreeApps");
                    button.appendChild(document.createTextNode("Tree Apps"));

                    tab = document.createElement("div");
                    tab.id="familyTreeApps";
                    tab.classList.add("tab-pane");
                    tab.classList.add("fade");
                    tab.setAttribute("role", "tabpanel");
                    tab.setAttribute("tabindex", "0");
                    // Argh. Surely a "selectTab" method is required?
                    // Going to rely on CSS
                    button.slippyTree = new SlippyTree();
                    let properties = {};
                    button.addEventListener("show.bs.tab", function (event) {
                        button.slippyTree.init(tab, document.querySelector("button[data-bs-title=\"Copy ID\"]").getAttribute("data-copy-text"), properties);
                    })
                    button.addEventListener("hide.bs.tab", function (event) {
                        button.slippyTree.close();
                    })
                }

                new bootstrap.Tab(tab);
                let e = document.querySelector("#familyDescendants");
                e.parentNode.insertBefore(tab, e.nextSiblingElement);
                e = document.querySelector("#familyDescendants-tab");
                e.parentNode.insertBefore(button, e.nextSiblingElement);
            });
            return true;

        },
        deactivate: () => {
            delete window.View;
            document.head.removeChild(link1);
            document.head.removeChild(link2);
            document.head.removeChild(script1);
            button.parentNode.removeChild(button);
            tab.parentNode.removeChild(tab);
        },
    };
    return o;
})();
