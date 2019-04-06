/**
 * preprocess the list of all companies
 * with data that is useful for filter function
 */
function getAllCompanies() {
    var companies = [...document.querySelectorAll("#company-list .card")];
    return companies.map(x => ({
        comp: x,
        stipend: getCompanyStipend(x),
        duration: getCompanyDuration(x),
        remote: true
    }));
}

function getCompanyStipend(company) {
    return Number.parseInt(company.querySelector(".stipend").innerHTML, 10);
}

function getCompanyDuration(company) {
    return Number.parseInt(company.querySelector(".duration").innerHTML, 10);
}

function getCompanyRemote(company) {
    return true;
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
        console.log(comp.comp, shouldDisplay);
        displayBasedOnFlag(comp.comp, shouldDisplay);
    });
}

function filterByStipend() {
    var min = $minStipendInput.value || 0,
        max = $minStipendInput.value || 1e9;
    filters.stipend = function(x) {
        return x.stipend >= min && x.stipend <= max;
    };
    filterCompanies();
}

function filterByDuration() {
    var min = $minDurationInput.value || 0;

    filters.duration = x => x.duration >= min;
    filterCompanies();
}

function filterByRemote() {
    filters.remote = x => x.remote;
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
