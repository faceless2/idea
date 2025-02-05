/**
 * Bump Categories up the tree and style them to be more prominent
 */
communityIdeas[communityIdeas.length] = (() => {
    const baseurl = document.currentScript.src.substring(0, document.currentScript.src.lastIndexOf("/"));
    let categories, categoriesNext, categoriesParent, main, mainNext, categoriesInner, categoriesHeader, link, categoryInnerChildren;
    let o = {
        name: "Promote Categories",
        load: () => {
            categories = document.querySelector(".category--links");
            categoriesInner = categories ? categories.querySelector("#Categories") : null;
            main = document.querySelector("#Biography");
            if (categories && main && categoriesInner) {
                main = main.parentNode;
                mainNext = main.querySelector("#profileAdLeft");
                if (!mainNext) {
                    mainNext = main.querySelector(".EDIT");
                }
                categoriesParent = categories.parentNode;
                categoriesNext = categories.nextSibling;
                categoryInnerChildren = Array.from(categoriesInner.childNodes);
                link = document.createElement("link");
                link.rel = "stylesheet";
                link.href = baseurl + "/style.css?" + Date.now();
                return true;
            }
            return false;
        },
        activate: () => {
            document.head.appendChild(link);
            main.insertBefore(categories, mainNext);
            if (!categoriesHeader) {
                categoriesHeader = document.createElement("h3");
                categoriesHeader.classList.add("mt-0");
                categoriesHeader.innerHTML = "Categories";
            }
            categoriesInner.parentNode.insertBefore(categoriesHeader, categoriesInner);
            for (let n of categoriesInner.childNodes) {
                if (n instanceof Text) {
                    categoriesInner.removeChild(n);
                }
            }
            categories.style.borderTopWidth = "0";
            categories.style.borderBottomWidth = "0";
            categories.classList.add("mb-3");
        },
        deactivate: () => {
            document.head.removeChild(link);
            categoriesParent.insertBefore(categories, categoriesNext);
            categoriesHeader.parentNode.removeChild(categoriesHeader);
            for (let n of categoryInnerChildren) {
                categoriesInner.appendChild(n);
            }
            categories.style.borderTopWidth = null;
            categories.style.borderBottomWidth = null;
            categories.classList.remove("mb-3");
        },
    };
    return o;
})();
