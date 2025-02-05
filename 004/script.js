/**
 * Count comments and sources and put the count in the links
 */
communityIdeas[communityIdeas.length] = (() => {
    const baseurl = document.currentScript.src.substring(0, document.currentScript.src.lastIndexOf("/"));
    let commentCount = 0, sourceCount = 0, categoryCount = 0, dnaCount = 0;
    let o = {
        name: "Count sources and comments",
        load: () => {
            let elt = document.querySelector("#Sources");
            if (elt) {
                elt = elt.nextElementSibling;
                while (elt && !elt.classList.contains("EDIT")) {
                    if (elt.tagName == "OL" || elt.tagName == "UL") {
                        elt.querySelectorAll(":scope > li").forEach((e) => {
                            sourceCount++;
                        });
                    }
                    elt = elt.nextElementSibling;
                }
                document.querySelectorAll("#comments.container .comment").forEach((e) => {
                    commentCount++ 
                });
                document.querySelectorAll("#Categories > span").forEach((e) => {
                    categoryCount++ 
                });
                document.querySelectorAll(".dna > li").forEach((e) => {
                    dnaCount++ 
                });
                return true;
            }
            return false;
        },
        activate: () => {
            if (commentCount > 0 && document.querySelector("a[href=\"#Comments\"]")) {
                document.querySelector("a[href=\"#Comments\"]").innerHTML = "Comments (" + commentCount + ")";
            }
            if (sourceCount > 0 && document.querySelector("a[href=\"#Sources\"]")) {
                document.querySelector("a[href=\"#Sources\"]").innerHTML = "Sources (" + sourceCount + ")";
            }
            if (categoryCount > 0 && document.querySelector("a[href=\"#Categories\"]")) {
                document.querySelector("a[href=\"#Categories\"]").innerHTML = "Categories (" + categoryCount + ")";
            }
            if (dnaCount > 0 && document.querySelector("a[href=\"#DNA\"]")) {
                document.querySelector("a[href=\"#DNA\"]").innerHTML = "DNA (" + dnaCount + ")";
            }
            return true;
        },
        deactivate: () => {
            if (commentCount > 0 && document.querySelector("a[href=\"#Comments\"]")) {
                document.querySelector("a[href=\"#Comments\"]").innerHTML = "Comments";
            }
            if (sourceCount > 0 && document.querySelector("a[href=\"#Sources\"]")) {
                document.querySelector("a[href=\"#Sources\"]").innerHTML = "Sources";
            }
            if (categoryCount > 0 && document.querySelector("a[href=\"#Categories\"]")) {
                document.querySelector("a[href=\"#Categories\"]").innerHTML = "Categories";
            }
            if (dnaCount > 0 && document.querySelector("a[href=\"#DNA\"]")) {
                document.querySelector("a[href=\"#DNA\"]").innerHTML = "DNA";
            }
        },
    };
    return o;
})();
