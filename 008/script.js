/**
 * Move the "expand ancestor tree" buttons"
 */
communityIdeas[communityIdeas.length] = (() => {
    const baseurl = document.currentScript.src.substring(0, document.currentScript.src.lastIndexOf("/"));
    let link, h1, h1Text, prefixBox, suffixBox, akaBox, nicknameBox, nameBox, prefixValue, suffixValue, nicknameValue, akaValue;
    let o = {
        name: "Compact: deduplicate name",
        load: () => {
            link = document.createElement("link");
            link.rel = "stylesheet";
            link.href = baseurl + "/style.css";
            document.querySelectorAll("p.VITALS").forEach((e) => {
                if (!nameBox) {
                    nameBox = e;
                    for (let n=e.firstChild;n;n=n.nextSibling) {
                        let itemprop = n.firstElementChild ? n.firstElementChild.getAttribute("itemprop") : null;
                        let value = n.textContent.replace(/\n */, " ").trim();
                        if (itemprop == "honorificPrefix") {
                            prefixValue = value;
                        } else if (itemprop == "honorificSuffix") {
                            suffixValue = value;
                        } else if (value.startsWith("(") && value.endsWith(")")) {
                            nicknameValue = value.substring(1, value.length - 1);
                        } else if (value == "aka") {
                            akaValue = n.nextElementSibling.textContent.trim();
                        }
                    }
                }
            });
            h1 = document.querySelector("#person h1[itemprop=\"name\"]");
            h1Text = h1 ? h1.firstChild : null;
            return h1 && nameBox;
        },
        activate: () => {
            document.head.appendChild(link);
            if (!prefixBox) {
                prefixBox = document.createElement("small");
                nicknameBox = document.createElement("span");
                suffixBox = document.createElement("small");
                akaBox = document.createElement("small");
                akaBox.style.fontStyle = "italic";      // Obviously would be done with a class not a style attr!
                nicknameBox.style.fontStyle = "italic";      // Obviously would be done with a class not a style attr!
                if (prefixValue) {
                    prefixBox.innerHTML = prefixValue + " ";
                }
                if (suffixValue) {
                    suffixBox.innerHTML = " " + suffixValue;
                }
                if (nicknameValue) {
                    nicknameBox.innerHTML = "<q>" + nicknameValue + "</q>";
                }
                if (akaValue) {
                    akaBox.innerHTML = " aka " + akaValue;
                }
            }
            if (suffixValue) {
                h1Text.nodeValue = h1Text.nodeValue.substring(0, h1Text.nodeValue.length - suffixValue.length);
            }
            h1.insertBefore(akaBox, h1Text.nextSibling);
            h1.insertBefore(suffixBox, akaBox);
            h1.insertBefore(nicknameBox, h1Text);
            h1.insertBefore(prefixBox, nicknameBox);
            nameBox.style.display = "none";
            document.querySelectorAll(":is(#familyAncestors, #familyDescendants) h2").forEach((e) => {
                e.style.display = "none";
            });
            return true;
        },
        deactivate: () => {
            document.head.removeChild(link);
            h1.removeChild(akaBox);
            h1.removeChild(prefixBox);
            h1.removeChild(suffixBox);
            h1.removeChild(nicknameBox);
            if (suffixValue) {
                h1Text.nodeValue += suffixValue;
            }
            nameBox.style.display = null;
            document.querySelectorAll(":is(#familyAncestors, #familyDescendants) h2").forEach((e) => {
                e.style.display = null;
            });
        },
    };
    return o;
})();
