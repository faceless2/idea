/**
 * Make Tree Apps first-class citizens
 */
communityIdeas[communityIdeas.length] = (() => {
    const baseurl = document.currentScript.src.substring(0, document.currentScript.src.lastIndexOf("/"));
    let script1, newelements;
    let o = {
        name: "Integrated tree-apps",
        load: () => {
            script1 = document.createElement("script");
            script1.src = "https://apps.wikitree.com/apps/bremford24/test/views/slippyTree/script.js";
            return document.querySelector("#familyVitals") != null;
        },
        activate: () => {
            if (!window.View) {
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
            }
            document.head.appendChild(script1);
            script1.addEventListener("load", () => {
                const buttonParent = document.querySelector("#familyDescendants-tab").parentNode;
                const buttonNext = document.querySelector("#familyDescendants-tab").nextSibling;
                const tabParent = document.querySelector("#familyDescendants").parentNode;
                const tabNext = document.querySelector("#familyDescendants").nextSibling;
                if (!newelements) {
                    newelements = [];
                    let link = document.createElement("link");
                    link.rel = "stylesheet";
                    link.href = baseurl + "/style.css";
                    newelements.push(link);
                    link = document.createElement("link");
                    link.rel = "stylesheet";
                    link.href = "https://apps.wikitree.com/apps/bremford24/test/views/slippyTree/style.css";
                    newelements.push(link);
                    const props = [
                        {
                            "name":"slippyInline",
                            "title":"Slippy Tree (inline)",
                            "init": (tab, button) => {
                                tab.slippyTree = new SlippyTree();
                            },
                            "show": (tab, id) => {
                                tab.slippyTree.init(tab, id, {});
                            },
                            "hide": (tab) => {
                                tab.slippyTree.close();
                            }
                        },
                        {
                            "name":"slippyIframe",
                            "title":"Slippy Tree (iframe)",
                            "init": (tab, button) => {
                                tab.slippyTree = new SlippyTree();
                            },
                            "show": (tab, id) => {
                                let iframe = document.createElement("iframe");
                                iframe.style.display = "block";
                                iframe.style.width = "100%";
                                iframe.style.minHeight = iframe.style.height = "300px";
                                iframe.style.resizable = "height";
                                iframe.src = "https://apps.wikitree.com/apps/bremford24/test/views/slippyTree/?person="+id;
                                tab.appendChild(iframe);
                            },
                            "hide": (tab) => {
                                tab.innerHTML = "";
                            }
                        },
                        {
                            "name":"addApp",
                            "title":"+",
                            "init": (tab, button) => {
                                tab.innerHTML = "<p style=\"text-align:center\">Some sort of app selector here</p>"
                            },
                            "show": (tab,id) => {
                            },
                            "hide": (tab) => {
                            }
                        }
                    ];
                    for (const p of props) {
                        let button = document.createElement("button");
                        button.classList.add("nav-link");
                        button.id = p.name + "-tab";
                        button.setAttribute("data-bs-toggle", "tab");
                        button.setAttribute("data-bs-target", "#" + p.name);
                        button.setAttribute("role", "tab");
                        button.setAttribute("aria-controls", p.name);
                        button.appendChild(document.createTextNode(p.title));

                        let tab = document.createElement("div");
                        tab.id = p.name;
                        tab.classList.add("tab-pane");
                        tab.classList.add("fade");
                        tab.setAttribute("role", "tabpanel");
                        tab.setAttribute("tabindex", "0");

                        p.init(tab, button);
                        button.addEventListener("show.bs.tab", function (event) {
                            let id = document.querySelector("[data-mnamedb]").getAttribute("data-mnamedb");
                            p.show(tab, id);
                        })
                        button.addEventListener("hide.bs.tab", function (event) {
                            p.hide(tab);
                        })
                        newelements.push(button);
                        newelements.push(tab);
                        new bootstrap.Tab(tab);
                    }
                }
                for (let e of newelements) {
                    console.log("ADD " + e.getAttribute("role") +"="+e);
                    if (e.getAttribute("role") == "tab") {
                        buttonParent.insertBefore(e, buttonNext);
                    } else if (e.getAttribute("role") == "tabpanel") {
                        tabParent.insertBefore(e, tabNext);
                    } else {
                        document.head.appendChild(e);
                    }
                }
            });
            return true;
        },
        deactivate: () => {
            delete window.View;
            script1.remove();
            // leave View class, script loaded
            for (let of in newelements) {
                e.remove();
            }
            newelements = null;
        },
    };
    return o;
})();
