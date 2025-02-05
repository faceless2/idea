/**
 * Make the prefix/suffix field sizes matche the database, so they're not silently trimmed on save
 * When the date date/place is set to "still living", don't allow a value to be entered
 * Trim leading/trailing whitespace from fields
 */
communityIdeas[communityIdeas.length] = (() => {
    const baseurl = document.currentScript.src.substring(0, document.currentScript.src.lastIndexOf("/"));
    let trimmer, disableOnBlank;
    let o = {
        name: "Helpful edit fields",
        load: () => {
            trimmer = (e) => {
                e.target.value = e.target.value.trim();
            };
            disableOnBlank = (e) => {
                e = e.target;
                if (!e.form) {
                    return;
                }
                // We could link these two fields, of course - set "still living"
                // on one of them, and it adjusts the other one too. But we don't
                // want to make them too intrusive, so keep it simple
                let deathLocation = e.form.elements.namedItem("mDeathLocation");
                let deathDate = e.form.elements.namedItem("mDeathDate");
                let deathLocationQualifier = e.form.elements.namedItem("mStatus_DeathLocation");
                let deathDateQualifier = e.form.elements.namedItem("mStatus_DeathDate");
                if (e.name == "mStatus_DeathLocation") {
                    if (deathLocationQualifier.value == "blank") {
                        deathLocation.value = "";
                        deathLocation.disabled = true;
                    } else {
                        deathLocation.disabled = false;
                    }
                } else if (e.name == "mStatus_DeathDate") {
                    if (deathDateQualifier.value == "blank") {
                        deathDate.value = "";
                        deathDate.disabled = true;
                    } else {
                        deathDate.disabled = false;
                    }
                }
            };
            return document.querySelector("input#mSuffix") != null;
        },
        activate: () => {
            document.querySelectorAll("input#mSuffix").forEach((e) => {
                e.maxLength = 10;
            });
            document.querySelectorAll("input#mPrefix").forEach((e) => {
                e.maxLength = 10;
            });
            document.querySelectorAll("input:not([type]), input[type=\"text\"]").forEach((e) => {
                e.addEventListener("change", trimmer);
            });
            document.getElementsByName("mStatus_DeathDate").forEach((e) => {
                e.addEventListener("change", disableOnBlank);
            });
            document.getElementsByName("mStatus_DeathLocation").forEach((e) => {
                e.addEventListener("change", disableOnBlank);
            });
            return true;
        },
        deactivate: () => {
            document.querySelectorAll("input#mSuffix").forEach((e) => {
                e.maxLength = null;
            });
            document.querySelectorAll("input#mPrefix").forEach((e) => {
                e.maxLength = null;
            });
            document.querySelectorAll("input:not([type]), input[type=\"text\"]").forEach((e) => {
                e.removeEventListener("change", trimmer);
            });
            document.getElementsByName("mStatus_DeathDate").forEach((e) => {
                e.removeEventListener("change", disableOnBlank);
            });
            document.getElementsByName("mStatus_DeathLocation").forEach((e) => {
                e.removeEventListener("change", disableOnBlank);
            });
        },
    };
    return o;
})();
