const eventsManager = () => {
    const parentDiv = document.querySelector('#idParent');
    var wait = document.querySelector('#wait');
    var toTop = document.querySelector('#toTop');
    const searchFor = document.querySelector('#searchFor');
    const searchBy = document.querySelector('#searchBy');
    const searchBtn = document.querySelector('#searchBtn');
    var enableFilter = document.querySelector('#enableFilter');
    const filterDiv = document.querySelector('#filterDiv');
    const filterYoung = document.querySelector('#filterYoung');
    const filterOld = document.querySelector('#filterOld');
    const filterFemale = document.querySelector('#filterFemale');
    const filterMale = document.querySelector('#filterMale');
    var numOfResults = document.querySelector('#numOfResults');
    const filterForm = document.querySelector('.form');
    const orderBy = document.querySelector('#orderBy');
    const suggestions = document.querySelector('#suggestions');
    const inputs = Array.from(document.getElementsByTagName('input'));

    enableFilter.disabled = true;

    searchFor.addEventListener('input', () => {
        if (searchBy.value === 'none') {
            searchBy.classList.add('is-invalid');
        }
    })

    enableFilter.addEventListener('change', () => {
        filterDiv.classList.toggle('invisible');
    })

    searchBtn.addEventListener('click', () => {
        event.preventDefault();
        if (searchFor.value === ''){
            parentDiv.innerHTML = '';
            currentData = fullData;
            searched = fullData;
            indexLimitPrev = 0;
            indexLimit = 20;
            resetfields(inputs, orderBy,filterDiv);
            renderAllData(fullData);
        } else if (searchBy.value === 'none') {
            searchBy.classList.add('is-invalid');
        } else {
            search(searchFor.value,searchBy.value, parentDiv);
            resetfields(inputs, orderBy,filterDiv);
        }
    })

    searchBy.addEventListener('change', () => {
        if (searchBy.value != 'none') {
            searchBy.classList.remove('is-invalid');
        }
        if (searchBy.value === 'name'){
            suggestions.innerHTML = '';
            fullData.forEach(item => {
                let option = document.createElement('option');
                option.value = `${item.person.name}`;
                suggestions.appendChild(option);
            });
        }else if (searchBy.value === 'country'){
            suggestions.innerHTML = '';
            let temp = [];
            fullData.forEach(item => {
                if (temp.includes(item.countryOfCitizenship)){
                    return;
                } else {
                    temp.push(item.countryOfCitizenship);
                    let option = document.createElement('option');
                    option.value = `${item.countryOfCitizenship}`;
                    suggestions.appendChild(option);
                }
            });
        }else if (searchBy.value === 'industries') {
            suggestions.innerHTML = '';
            let temp = [];
            fullData.forEach(item => {
                if(typeof(item.industries) !== 'undefined'){
                    item.industries.forEach(item => {
                        if (temp.includes(item)){
                            return;
                        } else {
                            temp.push(item);
                            let option = document.createElement('option');
                            option.value = `${item}`;
                            suggestions.appendChild(option);
                        }
                    })
                }
            });
        }else if (searchBy.value === 'company') {
            suggestions.innerHTML = '';
            let temp = [];
            fullData.forEach(item => {
                if (temp.includes(item.source)){
                    return;
                } else {
                    temp.push(item.source);
                    let option = document.createElement('option');
                    option.value = `${item.source}`;
                    suggestions.appendChild(option);
                }
            });
        }
    })

    orderBy.addEventListener('change', () => {
        if (orderBy.value === 'default'){
            return;
        } else if (orderBy.value === 'name') {
            parentDiv.innerHTML = '';
            indexLimitPrev = 0;
            indexLimit = 20;
            currentData = _.sortBy(currentData, (obj) => obj.person.name);
            renderAllData(currentData);
        } else if (orderBy.value === 'nameDown') {
            parentDiv.innerHTML = '';
            indexLimitPrev = 0;
            indexLimit = 20;
            currentData = _.sortBy(currentData, (obj) => obj.person.name).reverse();
            renderAllData(currentData);
        } else if (orderBy.value === 'countryOfCitizenshipDown') {
            parentDiv.innerHTML = '';
            indexLimitPrev = 0;
            indexLimit = 20;
            currentData = _.sortBy(currentData, 'countryOfCitizenship').reverse();
            renderAllData(currentData);
        } else if (orderBy.value === 'estWorthPrevDown') {
            parentDiv.innerHTML = '';
            indexLimitPrev = 0;
            indexLimit = 20;
            currentData = _.sortBy(currentData, 'estWorthPrev').reverse();
            renderAllData(currentData);
        } else {
            parentDiv.innerHTML = '';
            indexLimitPrev = 0;
            indexLimit = 20;
            currentData = _.sortBy(currentData, `${orderBy.value}`);
            renderAllData(currentData);
        }
    })

    filterYoung.addEventListener('click', () => {
            parentDiv.innerHTML = '';
            indexLimitPrev = 0;
            indexLimit = 20;
            if (filterYoung.checked) {
                checkedFlag++;
                currentData = searched.filter(obj => Math.floor((new Date()).getFullYear() - (new Date(obj.birthDate)).getFullYear()) <= 30);
                renderAllData(currentData);
                filterOld.disabled = true;
                filterMale.disabled = true;
                filterFemale.disabled = true;
            } else {
                checkedFlag--;
                currentData = searched;
                renderAllData(currentData);
                filterOld.disabled = false;
                filterMale.disabled = false;
                filterFemale.disabled = false;
            }
    })


    filterOld.addEventListener('click', () => {
            parentDiv.innerHTML = '';
            indexLimitPrev = 0;
            indexLimit = 20;
            if (filterOld.checked) {
                checkedFlag++;
                currentData = searched.filter(obj => Math.floor((new Date()).getFullYear() - (new Date(obj.birthDate)).getFullYear()) >= 80);
                renderAllData(currentData);
                filterYoung.disabled = true;
                filterMale.disabled = true;
                filterFemale.disabled = true;
            } else {
                checkedFlag--;
                currentData = searched;
                renderAllData(currentData);
                filterYoung.disabled = false;
                filterMale.disabled = false;
                filterFemale.disabled = false;
            }
    })

    filterMale.addEventListener('click', () => {
        parentDiv.innerHTML = '';
        indexLimitPrev = 0;
        indexLimit = 20;
        if (filterMale.checked) {
            checkedFlag++;
            currentData = searched.filter(obj => obj.gender !== 'F')
            renderAllData(currentData);
            filterYoung.disabled = true;
            filterOld.disabled = true;
            filterFemale.disabled = true;
        } else {
            checkedFlag--;
            currentData = searched;
            renderAllData(currentData);
            filterYoung.disabled = false;
            filterOld.disabled = false;
            filterFemale.disabled = false;
        }
    })

    filterFemale.addEventListener('click', () => {
        parentDiv.innerHTML = '';
        indexLimitPrev = 0;
        indexLimit = 20;
        if (filterFemale.checked) {
            checkedFlag++;
            currentData = searched.filter(obj => obj.gender !== 'M')
            renderAllData(currentData);
            filterYoung.disabled = true;
            filterOld.disabled = true;
            filterMale.disabled = true;
        } else {
            checkedFlag--;
            currentData = searched;
            renderAllData(currentData);
            filterYoung.disabled = false;
            filterOld.disabled = false;
            filterMale.disabled = false;
        }
    })

    toTop.addEventListener('click', () => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    })

    resetfields(inputs, orderBy, filterDiv);
    
}


// additional funcions


window.onscroll = () => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight && currentData.length > 20) {
        indexLimitPrev = indexLimit;
        indexLimit+=10;
        renderAllData(currentData);
    }
    
    if (document.body.scrollTop > 800 || document.documentElement.scrollTop > 800) {
        toTop.style.display = "block";
    } else {
        toTop.style.display = "none";
    }

}

const displayNumOfSearchResults = (_arr, element) => {
    element.innerHTML = `<p class="m-0">Displaying ${_arr.length} Results</p>`;
}

const resetfields = (_arr, element, filter) => {

    element.value = 'default';
    _arr.map(element => {
        if(element.type === 'text') {
            element.value = '';
        }else if (element.type === 'checkbox'){
            element.checked = false;
            if(filter.classList.contains('invisible')){
                return;
            } else {
                filter.classList.add('invisible');
            }
        }
    })
    filterYoung.disabled = false;
    filterOld.disabled = false;
    filterMale.disabled = false;
    filterFemale.disabled = false;
    searchBy.value = 'none';
}

const search = (value, option, div) => {
    div.innerHTML = '';
    indexLimitPrev = 0;
    indexLimit = 20;
    if (option === 'name') {
      searched = fullData.filter(item => {
          if (item.person.name.toLowerCase().indexOf(value.toLowerCase()) !== -1){
                return true;
          }
      }) 
    } else if (option === 'country') {
        searched = fullData.filter(item => {
            if (item.countryOfCitizenship.toLowerCase().indexOf(value.toLowerCase()) !== -1){
                return true;
            }
        })
    } else if (option === 'industries') {
        searched = fullData.filter(item => {
            let answare;
            if(typeof(item.industries) !== 'undefined'){
                item.industries.forEach(item => {
                   if (item.toLowerCase().indexOf(value.toLowerCase()) !== -1){
                        answare = true;
                    }
                })
            }
            return answare;
        })
    } else if (option === 'company') {
        searched = fullData.filter(item => {
            if (item.source.toLowerCase().indexOf(value.toLowerCase()) !== -1) {
                return true;
            }
        })
    }
    if (!searched.length) {
        div.innerHTML = '<h2>Found Nothing, Try again.</h2>'
        displayNumOfSearchResults(searched, numOfResults);
    } else {
        currentData = searched;

        renderAllData(currentData);
    }
}

const closeDark = () => {
    document.querySelector("#id_dark").classList.add('d-none');
}