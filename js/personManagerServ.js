const renderAllData = (_arr) => {
    wait.innerHTML = '';
    wait.className = 'abs';
    _arr.map(item => {
        if (_arr.indexOf(item) >= indexLimitPrev && _arr.indexOf(item) < indexLimit ) {
            let person = new Person ('#idParent',item.person,item.state,item.city,item.source,item.industries,item.countryOfCitizenship,item.position,item.gender,item.birthDate,item.lastName,item.financialAssets,item.estWorthPrev,item.thumbnail,item.squareImage,item.bios,item.abouts);
            person.renderHtml();
        }
    })
    displayNumOfSearchResults(_arr, numOfResults);
}