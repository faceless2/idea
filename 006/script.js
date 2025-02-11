/**
 * Field qualifiers from radios to select
 */
communityIdeas[communityIdeas.length] = (() => {
    const baseurl = document.currentScript.src.substring(0, document.currentScript.src.lastIndexOf("/"));
    let link;
    let restore = [];
    let o = {
        name: "Field Qualifiers to Selects",
        load: () => {
            if (!document.getElementById("editform")) {
                return false;
            }
            link = document.createElement("link");
            link.rel = "stylesheet";
            link.href = baseurl + "/style.css?" + Date.now();
            return true;
        },
        activate: () => {
            document.head.appendChild(link);
            document.querySelectorAll("#editform .page--content .form-check-inline").forEach((e) => {
                const restoredata = {
                    group: e,
                    children: []
                };
                restore.push(restoredata);
                let map = {};
                let formGroup = e.previousElementSibling;
                if (!formGroup.classList.contains("input-group")) {
                    console.log("WARNING: can't apply, previous is not input-group");
                    return false;
                }
                let select = document.createElement("select");
                select.classList.add("form-select");
                select.addEventListener("change", () => {
                    // Obviously this would be integrated with the code in edit_person.js
                    let origValue = originalFormState[select.name];   // Defined in edit_person.js
                    select.classList.toggle("changed", typeof origValue != "undefined" && e.value != origValue);
                });
                restoredata.select = select;
                formGroup.insertBefore(select, formGroup.querySelector(".input-group-text"));
                select.appendChild(document.createElement("option"));
                for (let n=e.firstChild;n;) {
                    const n2 = n.nextSibling;
                    if (n.tagName == "INPUT") {
                        if (!select.name) {
                            select.name = n.name;
                        } else if (select.name != n.name) {
                            console.log("WARNING: can't apply, mismatched names in radio group, \"" + select.name + "\" and \"" + n.name + "\"");
                            this.deactivate();
                            return false;
                        }
                        let opt = document.createElement("option");
                        opt.id = n.id;
                        opt.value = n.value;
                        if (map[n.value]) {
                            opt.appendChild(document.createTextNode(map[m.value]));
                        }
                        select.appendChild(opt);
                        if (n.checked) {
                            let value = opt.value;
                            if (value == "intentionally blank because still living") {
                                value = "still living";
                            }
                            select.value = value;
                        }
                    } else if (n.tagName == "LABEL") {
                        let target = n.htmlFor;
                        if (target == "mStatus_MiddleName3") {
                            target = "mStatus_MiddleName_blank";
                        }
                        if (!target) {
                            try {
                                target = n.querySelector("input").value;
                            } catch (e) { }
                            if (!target) {
                                // This is a current bug, missing "for" attributes. Applies to previous input
                                target = select.lastChild.id;
                            }
                        }
                        if (target) {
                            let value = n.textContent.trim();
                            if (value == "intentionally blank because still living") {
                                value = "still living";
                            }
                            let opt = select.querySelector("option#" + target);
                            if (opt) {
                                opt.appendChild(document.createTextNode(value));
                            } else {
                                map[target] = value;
                            }
                        }
                    } else if (n.tagName) {
                        console.log("WARNING: can't apply, unknown child " + n);
                        this.deactivate();
                        return false;
                    }
                    restoredata.children.push(n);
                    e.removeChild(n);
                    n = n2;
                }
                if (!select.name) {
                    console.log("WARNING: can't apply, no name");
                    this.deactivate();
                    return false;
                }
            });
            return true;
        },
        deactivate: () => {
            document.head.removeChild(link);
            for (let d of restore) {
                d.select.parentNode.removeChild(d.select);
                while (d.group.firstChild) {
                    d.group.removeChild(d.group.firstChild);
                }
                for (let n of d.children) {
                    d.group.appendChild(n);
                }
            }
            restore = [];
        },
    };
    return o;
})();
