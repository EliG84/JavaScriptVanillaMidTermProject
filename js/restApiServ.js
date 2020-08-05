const getRestApi = async () => {
    let forceGet = true;
    try {
        let response = await fetch('https://forbes400.herokuapp.com/api/forbes400/getAllBillionaires');
        let data = await response.json();
        fullData = data;
        currentData = data;
        searched = data;
        renderAllData(fullData);
        enableFilter.disabled = false;
    }catch(e) {
        location.reload(forceGet);
    }
}