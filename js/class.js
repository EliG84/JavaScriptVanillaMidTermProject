class Person
{
    constructor (_idParent,_person,_state,_city,_source,_industries,_country,_position,_gender,_birthDate,_lastName,_financialAssets,_estWorthPrev,_thumbnail,_squareImage,_bios,_abouts)
    {
        this.parent = _idParent;
        this.person = _person;
        this.state = _state;
        this.city = _city;
        this.source = _source;
        this.industries = _industries;
        this.country = _country;
        this.position = _position;
        this.gender = _gender;
        this.birthDate = Math.floor((new Date()).getFullYear() - (new Date(_birthDate)).getFullYear());
        this.lastName = _lastName;
        this.financialAssets = _financialAssets;
        this.netWorth = Math.round(Number(_estWorthPrev/1000)*100)/100;
        this.thumbnail = _thumbnail;
        this.squareImage = _squareImage;
        this.bios = _bios;
        this.abouts = _abouts;
    }

    renderHtml = () => {
        let newDiv = document.createElement('div');
        newDiv.className = 'card shadow col-12 col-md-3 m-2 bg-dark text-light rounded-2 pt-1';
        let img = document.createElement('img');
        img.className = 'card-img-top rounded mt-2'
        img.alt = `${this.person.name}`
        if(this.squareImage) {
            img.src = `https:${this.squareImage}`;
        }else if (!this.squareImage && this.gender === 'M'){
            img.src = './man.png';
        }else {
            img.src = './woman.png';
        }
        newDiv.appendChild(img);
        let innerDiv = document.createElement('div');
        innerDiv.className = 'card-body';
        const innerhtml1 =
        `<h5 class="card-title">${this.person.name}</h5>
        <h6 class="card-title">Rank: ${this.position}</h6>
        <h6 class="card-title">NetWorth: ${this.netWorth} B</h6>
        <h6 class="card-title">Age: ${this.birthDate}</h6>
        <h6 class="card-title">Gender: ${this.gender}</h6>
        <h6 class="card-title">Residence: ${this.country}</h6>
        <h6 class="card-title">Source: ${this.source}</h6>
        <hr style="height:1px; border:none; color:#000; background-color:#000;">
        <h6 class="card-title">Click for More</h6>`;
        innerDiv.innerHTML = innerhtml1;
        newDiv.appendChild(innerDiv);
        document.querySelector(this.parent).appendChild(newDiv);

        img.addEventListener('click', () => {
            let darkDiv = document.querySelector('#id_dark');
            let darkDivInside = document.querySelector('#id_darkInside');
            if(this.squareImage) {
                darkDivInside.innerHTML = `<img class="img-responsive" src="https:${this.squareImage}"/>`
            }else if (!this.squareImage && this.gender === 'M'){
                darkDivInside.innerHTML = '<img class="img-responsive" src="./man.png"/>';
            }else {
                darkDivInside.innerHTML = '<img class="img-responsive" src="./woman.png"/>';
            }
            darkDiv.classList.remove('d-none');
        })

        innerDiv.addEventListener('mouseover', () => {
            try {
                this.financialAssets.forEach(item => {
                    if (item.companyName.indexOf(this.source) !== -1) {
                        innerDiv.innerHTML = 
                        `<h5 class="card-title">${item.companyName}</h5>
                        <h6 class="card-title">Exchange: ${item.exchange}</h6>
                        <h6 class="card-title">Num of Shares: ${item.numberOfShares}</h6>
                        <h6 class="card-title">Share Price: ${item.sharePrice}</h6>
                        <h6 class="card-title">Currency: ${item.currencyCode}</h6>
                        <h6 class="card-title">Ticker: ${item.ticker}</h6>
                        <h6 class="card-title">Current Price: ${item.currentPrice}</h6>
                        <hr style="height:1px; border:none; color:#000; background-color:#000;">
                        <h6 class="card-title">Click for More</h6>`;
                        
                    }
                })

            }catch (err) {
                
            }
        });
        innerDiv.addEventListener('mouseout', () => {
            innerDiv.innerHTML = innerhtml1;
        });

        innerDiv.addEventListener('click', () => {
            try {
                let firstInnerDiv = document.createElement('div');
                firstInnerDiv.className = 'row no-gutters';
                let secondInnerDiv = document.createElement('div');
                secondInnerDiv.className = 'col-md-4';
                let thirdInnerDiv = document.createElement('div');
                thirdInnerDiv.className = 'col-md-8';
                let forthInnerDiv = document.createElement('div');
                forthInnerDiv.className = 'card-body';
                let fifthInnerDiv = document.createElement('div');
                fifthInnerDiv.className = 'card-text text-left pl-3';
                let innerImg = document.createElement('img');
                innerImg.className = 'card-img';
                if(this.thumbnail) {
                    innerImg.src = `${this.thumbnail}`;
                }else if (!this.thumbnail && this.gender === 'M'){
                    innerImg.src = './man.png';
                }else {
                    innerImg.src = './woman.png';
                }
                let firstH = document.createElement('h4');
                firstH.className = 'card-title'
                firstH.innerHTML = `${this.person.name}`;
                let secondH = document.createElement('h4');
                secondH.innerHTML = 'Bios'
                let thirdH = document.createElement('h4');
                thirdH.innerHTML = 'Interesting Facts';
                let firstUl = document.createElement('ul');
                this.bios.forEach(item => {
                    let li = document.createElement('li');
                    li.innerHTML = `${item}`;
                    firstUl.appendChild(li);
                })
                let secondUl = document.createElement('ul');
                if(typeof(this.abouts) !== 'undefined'){
                    this.abouts.forEach(item => {
                        let li = document.createElement('li');
                        li.innerHTML = `${item}`;
                        secondUl.appendChild(li);
                    })
                }else {
                    secondUl.innerHTML = `<p>No interesting facts on record</p>`
                }
                let innerButton = document.createElement('button');
                innerButton.className = 'btn btn-light';
                innerButton.innerHTML = '<small class="text-dark">Close</small>';
    
    
                firstInnerDiv.appendChild(secondInnerDiv);  // 1
                firstInnerDiv.appendChild(thirdInnerDiv);  // 2
                thirdInnerDiv.appendChild(forthInnerDiv);  // 3
                secondInnerDiv.appendChild(innerImg);
                forthInnerDiv.appendChild(firstH);  // 4
                forthInnerDiv.appendChild(fifthInnerDiv); // 5
                fifthInnerDiv.appendChild(secondH);  // 6
                fifthInnerDiv.appendChild(firstUl);  // 7
                fifthInnerDiv.appendChild(thirdH); // 8
                fifthInnerDiv.appendChild(secondUl);  // 9
                forthInnerDiv.appendChild(innerButton); // 10
    
                newDiv.className = 'card shadow col-12 bg-dark text-light rounded-2 pt-1';
                newDiv.innerHTML = '';
                newDiv.appendChild(firstInnerDiv);
                newDiv.scrollIntoView();
    
                innerButton.addEventListener('click', () => {
                    newDiv.innerHTML = '';
                    newDiv.className = 'card shadow col-12 col-md-3 m-2 bg-dark text-light rounded-2 pt-1';
                    newDiv.appendChild(img);
                    newDiv.appendChild(innerDiv);
                    newDiv.scrollIntoView();
                })
            }catch (err) {
                console.log(err);
                console.error(err);
            }

        })
    }
}