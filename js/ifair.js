/**
 * preprocess the list of all companies
 * with data that is useful for filter function
 */
function getAllCompanies() {
    var companies = [...document.querySelectorAll("#company-list .card")];
    console.log(companies)
    return companies.map(x => ({
        comp: x,
        stipend: getCompanyStipend(x),
        duration: getCompanyDuration(x),
        remote: getCompanyRemote(x)
    }));
}

function getCompanyStipend(company) {
    let stipendContainer = company.querySelector(".stipend");

    if(!stipendContainer)
        return "";

    return stipendContainer.innerHTML;
}

function getCompanyDuration(company) {
    let durationContainer = company.querySelector(".duration");

    if(!durationContainer)
        return 0;

    return Number.parseInt(durationContainer.innerHTML, 10);
}

function getCompanyRemote(company) {
    let remoteContainer = company.querySelector(".type");

    if(!remoteContainer)
        return "";

    return remoteContainer.innerHTML;
}

// string, function
var filters = {};

function displayBasedOnFlag(companyObject, flag) {
    companyObject.style.display = flag ? "block" : "none";
}

function filterCompanies() {
    companyList.forEach(comp => {
        let shouldDisplay = true;
        for (let filter in filters) {
            let lambda = filters[filter];
            if (!filters.hasOwnProperty(filter)) continue;
            if (!lambda) continue;
            if (!lambda(comp)) shouldDisplay = false;
        }
        displayBasedOnFlag(comp.comp, shouldDisplay);
    });
}

function filterByStipend() {
    var min = +$minStipendInput.value || 0,
        max = +$maxStipendInput.value || 1e9;
    filters.stipend = x => {
        let s = x.stipend;
        if (!/\d+(-\d+)?/.test(s)) return true;
        if (s.indexOf("-") == -1) {
            return +x.stipend >= min && +x.stipend <= max;
        } else {
            let compData = s.split("-").map(Number.parseInt);
            return (compData[0] >= min && compData[0] <= max) || (compData[1] >= min && compData[1] <= max);
        }
    };
    filterCompanies();
}

function filterByDuration() {
    var min = +$minDurationInput.value || 0;

    filters.duration = x => x.duration >= min;
    filterCompanies();
}

function filterByRemote() {
    if ($remoteWorkInput.checked) {
        filters.remote = x => x.remote == "Work from Home" || x.remote == "Both are Suitable";
    } else filters.remote = () => true;
    filterCompanies();
}

var $minStipendInput, $maxStipendInput, $minDurationInput, $remoteWorkInput, companyList;

function onLoad() {
    if (document.readyState == "complete") clearInterval(documentReadyInterval);
    else return;

    $minStipendInput = document.getElementById("minstipend");
    $maxStipendInput = document.getElementById("maxstipend");
    $minDurationInput = document.getElementById("minduration");
    $remoteWorkInput = document.getElementById("remotework");

    companyList = getAllCompanies();

    $minStipendInput.addEventListener("change", filterByStipend);
    $maxStipendInput.addEventListener("change", filterByStipend);
    $minDurationInput.addEventListener("change", filterByDuration);
    $remoteWorkInput.addEventListener("change", filterByRemote);
}

var documentReadyInterval = setInterval(onLoad, 100);
